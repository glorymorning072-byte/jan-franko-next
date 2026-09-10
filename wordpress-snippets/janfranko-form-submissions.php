<?php
/**
 * Snippet Name: Jan Franko Next.js Form Submissions Storage & WP Admin Handler
 * Description: Custom database table, REST API POST endpoint, unread badge counter, dynamic form tabs, and email alerts for Next.js forms.
 * Version: 1.1.0
 * Author: Jan Franko Traditional Archery Academy
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class JF_Form_Submissions_Handler {
    private static $instance = null;
    private $table_name;
    private $option_secret_key = 'jf_form_secret_key';
    private $option_emails = 'jf_form_notification_emails';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'jf_form_submissions';

        // Hooks
        add_action('init', array($this, 'maybe_create_table'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'register_admin_menu'));
        add_action('admin_head', array($this, 'inject_admin_styles'));
        add_action('admin_post_jf_toggle_submission_status', array($this, 'handle_status_toggle'));
        add_action('admin_post_jf_delete_submission', array($this, 'handle_delete_submission'));
        add_action('admin_post_jf_export_submissions_csv', array($this, 'handle_csv_export'));
        add_action('admin_post_jf_save_settings', array($this, 'handle_save_settings'));
    }

    /**
     * Create Custom DB Table if not exists
     */
    public function maybe_create_table() {
        if (get_option('jf_form_db_version') === '1.1.0') {
            return;
        }

        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$this->table_name} (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            form_name varchar(100) NOT NULL DEFAULT 'General Inquiry',
            fields longtext NOT NULL,
            page_url text DEFAULT NULL,
            ip_address varchar(45) DEFAULT NULL,
            device_info text DEFAULT NULL,
            status varchar(20) NOT NULL DEFAULT 'unread',
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id),
            KEY form_name (form_name),
            KEY status (status)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        update_option('jf_form_db_version', '1.1.0');

        if (!get_option($this->option_secret_key)) {
            update_option($this->option_secret_key, 'janfranko_form_sec_2026_x89a');
        }

        if (!get_option($this->option_emails)) {
            update_option($this->option_emails, 'janfranko@tutanota.com');
        }
    }

    /**
     * Register REST API POST Endpoint
     */
    public function register_rest_routes() {
        register_rest_route('janfranko/v1', '/submit-form', array(
            'methods'  => 'POST',
            'callback' => array($this, 'handle_rest_submission'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Handle incoming REST submission
     */
    public function handle_rest_submission(WP_REST_Request $request) {
        $secret_header = $request->get_header('X-JF-Form-Secret');
        $stored_secret = get_option($this->option_secret_key, 'janfranko_form_sec_2026_x89a');

        if (empty($secret_header) || $secret_header !== $stored_secret) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'Unauthorized submission key.'
            ), 401);
        }

        $params = $request->get_json_params();
        if (empty($params)) {
            $params = $request->get_body_params();
        }

        $form_name   = !empty($params['form_name']) ? sanitize_text_field($params['form_name']) : 'General Inquiry';
        $fields      = !empty($params['fields']) ? $params['fields'] : array();
        $page_url    = !empty($params['page_url']) ? esc_url_raw($params['page_url']) : '';
        $ip_address  = !empty($params['ip_address']) ? sanitize_text_field($params['ip_address']) : $_SERVER['REMOTE_ADDR'];
        $device_info = !empty($params['device_info']) ? sanitize_text_field($params['device_info']) : $_SERVER['HTTP_USER_AGENT'];

        if (is_array($fields) || is_object($fields)) {
            $fields_json = wp_json_encode($fields);
        } else {
            $fields_json = sanitize_textarea_field($fields);
        }

        global $wpdb;
        $inserted = $wpdb->insert(
            $this->table_name,
            array(
                'form_name'   => $form_name,
                'fields'      => $fields_json,
                'page_url'    => $page_url,
                'ip_address'  => $ip_address,
                'device_info' => $device_info,
                'status'      => 'unread',
                'created_at'  => current_time('mysql')
            ),
            array('%s', '%s', '%s', '%s', '%s', '%s', '%s')
        );

        if (!$inserted) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'Failed to save submission to database.'
            ), 500);
        }

        $this->send_email_notification($wpdb->insert_id, $form_name, $fields, $page_url, $ip_address);

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Form submission recorded successfully.',
            'entry_id' => $wpdb->insert_id
        ), 200);
    }

    /**
     * Send Email Alert to Configured Recipients
     */
    private function send_email_notification($entry_id, $form_name, $fields, $page_url, $ip_address) {
        $raw_emails = get_option($this->option_emails, 'janfranko@tutanota.com');
        if (empty($raw_emails)) return;

        $recipients = array_map('trim', explode(',', $raw_emails));
        $valid_emails = array_filter($recipients, 'is_email');
        if (empty($valid_emails)) return;

        $subject = sprintf('[%s] New Form Submission (#%d)', $form_name, $entry_id);

        $body = "<div style='font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#333;'>";
        $body .= "<h2 style='color:#0e3b2e;'>New Academy Form Submission</h2>";
        $body .= "<p><strong>Form Name:</strong> " . esc_html($form_name) . "</p>";
        $body .= "<p><strong>Page URL:</strong> <a href='" . esc_url($page_url) . "'>" . esc_html($page_url) . "</a></p>";
        $body .= "<p><strong>IP Address:</strong> " . esc_html($ip_address) . "</p>";
        $body .= "<p><strong>Submitted At:</strong> " . esc_html(current_time('Y-m-d H:i:s')) . "</p>";

        $body .= "<h3 style='color:#7d603a;'>Submitted Fields:</h3><ul>";
        if (is_array($fields) || is_object($fields)) {
            foreach ($fields as $key => $val) {
                $formatted_key = esc_html(ucwords(str_replace('_', ' ', $key)));
                $formatted_val = is_array($val) ? esc_html(implode(', ', $val)) : esc_html($val);
                $body .= "<li><strong>{$formatted_key}:</strong> {$formatted_val}</li>";
            }
        }
        $body .= "</ul>";

        $admin_url = admin_url('admin.php?page=jf-form-submissions');
        $body .= "<p style='margin-top:20px;'><a href='" . esc_url($admin_url) . "' style='display:inline-block;padding:12px 22px;background:#0e3b2e;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;'>View Submission in WP Admin</a></p>";
        $body .= "</div>";

        $headers = array('Content-Type: text/html; charset=UTF-8');

        wp_mail($valid_emails, $subject, $body, $headers);
    }

    /**
     * Get Unread Count
     */
    private function get_unread_count() {
        global $wpdb;
        return (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name} WHERE status = 'unread'");
    }

    /**
     * Register WP Admin Menu with Dynamic Unread Counter Badge
     */
    public function register_admin_menu() {
        $unread_count = $this->get_unread_count();
        $menu_title = 'Form Submissions';

        if ($unread_count > 0) {
            $menu_title .= sprintf(
                ' <span class="awaiting-mod count-%1$d" style="background:#d63638;color:#fff;border-radius:10px;padding:2px 7px;font-size:11px;font-weight:bold;margin-left:4px;"><span class="pending-count">%1$d</span></span>',
                $unread_count
            );
        }

        add_menu_page(
            'Form Submissions',
            $menu_title,
            'manage_options',
            'jf-form-submissions',
            array($this, 'render_admin_submissions_page'),
            'dashicons-feedback',
            30
        );
    }

    /**
     * Inject Custom CSS Styles into WP Admin
     */
    public function inject_admin_styles() {
        $screen = get_current_screen();
        if (!$screen || $screen->id !== 'toplevel_page_jf-form-submissions') return;
        ?>
        <style type="text/css">
            .jf-wrap {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                margin-top: 20px;
                margin-right: 20px;
            }
            .jf-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #0e3b2e;
                color: #ffffff;
                padding: 24px 30px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                margin-bottom: 24px;
            }
            .jf-header h1 {
                font-family: Georgia, "Times New Roman", serif;
                font-size: 26px;
                font-weight: 700;
                color: #ffffff !important;
                margin: 0 0 6px 0;
                padding: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .jf-header p {
                margin: 0;
                font-size: 13px;
                color: rgba(255,255,255,0.75);
            }
            .jf-btn-export {
                background: #c5a880 !important;
                color: #0e3b2e !important;
                font-weight: 700 !important;
                font-size: 12px !important;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                padding: 10px 18px !important;
                border-radius: 8px !important;
                text-decoration: none !important;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            }
            .jf-btn-export:hover {
                background: #e2c9a3 !important;
                color: #0e3b2e !important;
                transform: translateY(-1px);
            }
            .jf-tabs {
                border-bottom: 2px solid #0e3b2e;
                margin-bottom: 20px;
                display: flex;
                gap: 6px;
                flex-wrap: wrap;
            }
            .jf-tab {
                background: #e4e8e6;
                color: #0e3b2e;
                font-weight: 600;
                font-size: 13px;
                padding: 10px 18px;
                border-radius: 8px 8px 0 0;
                text-decoration: none;
                transition: all 0.2s ease;
                border: 1px solid transparent;
                border-bottom: none;
            }
            .jf-tab:hover {
                background: #d4ded9;
                color: #0e3b2e;
            }
            .jf-tab.active {
                background: #0e3b2e;
                color: #ffffff;
                border-color: #0e3b2e;
            }
            .jf-tab-settings {
                margin-left: auto;
                background: #2c3338;
                color: #fff;
            }
            .jf-tab-settings:hover {
                background: #40464d;
                color: #fff;
            }
            .jf-table-card {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                border: 1px solid #e2e8f0;
                overflow: hidden;
            }
            .jf-table {
                width: 100%;
                border-collapse: collapse;
                text-align: left;
            }
            .jf-table th {
                background: #0e3b2e;
                color: #ffffff;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                padding: 14px 16px;
                border: none;
            }
            .jf-table td {
                padding: 14px 16px;
                border-bottom: 1px solid #f1f5f9;
                font-size: 13px;
                color: #334155;
                vertical-align: middle;
            }
            .jf-row-unread {
                background: #fffdf5;
                border-left: 4px solid #d63638;
                font-weight: 600;
            }
            .jf-badge-unread {
                background: #d63638;
                color: #ffffff;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                padding: 3px 9px;
                border-radius: 12px;
                letter-spacing: 0.05em;
            }
            .jf-badge-read {
                background: #e2e8f0;
                color: #64748b;
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
                padding: 3px 9px;
                border-radius: 12px;
                letter-spacing: 0.05em;
            }
            .jf-action-btn {
                display: inline-block;
                padding: 6px 12px;
                font-size: 12px;
                font-weight: 600;
                border-radius: 6px;
                text-decoration: none !important;
                transition: all 0.15s ease;
                margin-right: 4px;
            }
            .jf-btn-view {
                background: #0e3b2e;
                color: #ffffff !important;
            }
            .jf-btn-view:hover {
                background: #145241;
            }
            .jf-btn-toggle {
                background: #f1f5f9;
                color: #475569 !important;
                border: 1px solid #cbd5e1;
            }
            .jf-btn-toggle:hover {
                background: #e2e8f0;
            }
            .jf-btn-delete {
                background: #fef2f2;
                color: #dc2626 !important;
                border: 1px solid #fecaca;
            }
            .jf-btn-delete:hover {
                background: #fee2e2;
            }
            .jf-detail-card {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                border: 1px solid #e2e8f0;
                padding: 30px;
                max-width: 850px;
            }
            .jf-detail-header {
                border-bottom: 2px solid #f1f5f9;
                padding-bottom: 16px;
                margin-bottom: 20px;
            }
            .jf-detail-title {
                font-family: Georgia, serif;
                font-size: 24px;
                color: #0e3b2e;
                margin: 0 0 8px 0;
            }
            .jf-detail-meta {
                font-size: 12px;
                color: #64748b;
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
            }
            .jf-detail-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
            }
            .jf-detail-table th {
                background: #f8fafc;
                color: #0e3b2e;
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                padding: 10px 14px;
                width: 30%;
                text-align: left;
                border: 1px solid #e2e8f0;
            }
            .jf-detail-table td {
                padding: 10px 14px;
                border: 1px solid #e2e8f0;
                font-size: 13px;
                color: #1e293b;
            }
        </style>
        <?php
    }

    /**
     * Handle Read / Unread Status Toggle
     */
    public function handle_status_toggle() {
        if (!current_user_can('manage_options')) wp_die('Unauthorized');
        check_admin_referer('jf_toggle_status_nonce');

        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $status = isset($_GET['status']) ? sanitize_text_field($_GET['status']) : 'read';

        if ($id > 0) {
            global $wpdb;
            $wpdb->update(
                $this->table_name,
                array('status' => ($status === 'unread' ? 'unread' : 'read')),
                array('id' => $id),
                array('%s'),
                array('%d')
            );
        }

        wp_redirect(wp_get_referer() ? wp_get_referer() : admin_url('admin.php?page=jf-form-submissions'));
        exit;
    }

    /**
     * Handle Single Submission Deletion
     */
    public function handle_delete_submission() {
        if (!current_user_can('manage_options')) wp_die('Unauthorized');
        check_admin_referer('jf_delete_submission_nonce');

        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        if ($id > 0) {
            global $wpdb;
            $wpdb->delete($this->table_name, array('id' => $id), array('%d'));
        }

        wp_redirect(wp_get_referer() ? wp_get_referer() : admin_url('admin.php?page=jf-form-submissions'));
        exit;
    }

    /**
     * Handle CSV Export
     */
    public function handle_csv_export() {
        if (!current_user_can('manage_options')) wp_die('Unauthorized');
        check_admin_referer('jf_export_csv_nonce');

        global $wpdb;
        $current_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : '';

        if (!empty($current_tab) && $current_tab !== 'all' && $current_tab !== 'settings') {
            $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE form_name = %s ORDER BY id DESC", $current_tab), ARRAY_A);
        } else {
            $rows = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY id DESC", ARRAY_A);
        }

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=form_submissions_' . date('Y-m-d_H-i') . '.csv');

        $output = fopen('php://output', 'w');
        fputcsv($output, array('ID', 'Form Name', 'Status', 'Submitted At', 'Page URL', 'IP Address', 'Fields JSON'));

        if (!empty($rows)) {
            foreach ($rows as $row) {
                fputcsv($output, array(
                    $row['id'],
                    $row['form_name'],
                    $row['status'],
                    $row['created_at'],
                    $row['page_url'],
                    $row['ip_address'],
                    $row['fields']
                ));
            }
        }

        fclose($output);
        exit;
    }

    /**
     * Handle Settings Form Save
     */
    public function handle_save_settings() {
        if (!current_user_can('manage_options')) wp_die('Unauthorized');
        check_admin_referer('jf_save_settings_nonce');

        if (isset($_POST['jf_secret_key'])) {
            update_option($this->option_secret_key, sanitize_text_field($_POST['jf_secret_key']));
        }
        if (isset($_POST['jf_notification_emails'])) {
            update_option($this->option_emails, sanitize_textarea_field($_POST['jf_notification_emails']));
        }

        wp_redirect(admin_url('admin.php?page=jf-form-submissions&tab=settings&updated=true'));
        exit;
    }

    /**
     * Render WP Admin Main View & Dynamic Form Tabs
     */
    public function render_admin_submissions_page() {
        if (!current_user_can('manage_options')) return;

        global $wpdb;

        // Fetch all distinct form names dynamically
        $distinct_forms = $wpdb->get_col("SELECT DISTINCT form_name FROM {$this->table_name} ORDER BY form_name ASC");

        $active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'all';
        $view_id    = isset($_GET['view_id']) ? intval($_GET['view_id']) : 0;

        // Automatically mark as read if viewing specific detail
        if ($view_id > 0) {
            $wpdb->update($this->table_name, array('status' => 'read'), array('id' => $view_id), array('%s'), array('%d'));
            $single_entry = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE id = %d", $view_id));
        }

        ?>
        <div class="jf-wrap">
            
            <!-- Academy Styled Header Banner -->
            <div class="jf-header">
                <div>
                    <h1>
                        <span>🏹</span> Traditional Archery Academy — Form Submissions
                    </h1>
                    <p>Live submission records, dynamic form taxonomy filters, and email notification settings.</p>
                </div>
                <div>
                    <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_export_submissions_csv&tab=' . urlencode($active_tab)), 'jf_export_csv_nonce')); ?>" class="jf-btn-export">
                        📥 Export to CSV
                    </a>
                </div>
            </div>

            <?php if (isset($_GET['updated'])): ?>
                <div class="notice notice-success is-dismissible" style="margin-bottom:20px;border-radius:8px;"><p>Settings saved successfully.</p></div>
            <?php endif; ?>

            <!-- Navigation Tabs (Dynamic per Form Name) -->
            <div class="jf-tabs">
                <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=all'); ?>" class="jf-tab <?php echo ($active_tab === 'all') ? 'active' : ''; ?>">
                    All Submissions
                </a>
                <?php foreach ($distinct_forms as $fname): ?>
                    <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=' . urlencode($fname)); ?>" class="jf-tab <?php echo ($active_tab === $fname) ? 'active' : ''; ?>">
                        <?php echo esc_html($fname); ?>
                    </a>
                <?php endforeach; ?>
                <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=settings'); ?>" class="jf-tab jf-tab-settings <?php echo ($active_tab === 'settings') ? 'active' : ''; ?>">
                    ⚙️ Settings &amp; API Key
                </a>
            </div>

            <?php if ($active_tab === 'settings'): ?>
                <!-- Settings Panel -->
                <div class="jf-detail-card">
                    <h2 class="jf-detail-title">Form Integration Settings</h2>
                    <p style="color:#64748b;font-size:13px;margin-bottom:20px;">Configure REST API security keys and email alert notifications.</p>

                    <form method="post" action="<?php echo admin_url('admin-post.php'); ?>">
                        <input type="hidden" name="action" value="jf_save_settings" />
                        <?php wp_nonce_field('jf_save_settings_nonce'); ?>

                        <table class="form-table">
                            <tr>
                                <th scope="row"><label for="jf_secret_key" style="font-weight:700;">API Secret Authorization Key</label></th>
                                <td>
                                    <input type="text" id="jf_secret_key" name="jf_secret_key" value="<?php echo esc_attr(get_option($this->option_secret_key, 'janfranko_form_sec_2026_x89a')); ?>" class="regular-text" style="font-family:monospace;font-size:13px;padding:8px;" required />
                                    <p class="description">Must match <code>FORM_SECRET_KEY</code> in Next.js <code>.env.local</code>.</p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label for="jf_notification_emails" style="font-weight:700;">Email Notification Recipients</label></th>
                                <td>
                                    <textarea id="jf_notification_emails" name="jf_notification_emails" rows="3" class="large-text" style="padding:10px;font-family:monospace;" placeholder="janfranko@tutanota.com, info@janfranko.com"><?php echo esc_textarea(get_option($this->option_emails, 'janfranko@tutanota.com')); ?></textarea>
                                    <p class="description">Separate multiple recipient emails with commas. Instant alerts will be sent here upon submission.</p>
                                </td>
                            </tr>
                        </table>

                        <p style="margin-top:20px;">
                            <input type="submit" name="submit" id="submit" class="button button-primary" value="Save Settings" style="background:#0e3b2e;border-color:#0e3b2e;padding:6px 20px;font-weight:700;" />
                        </p>
                    </form>
                </div>

            <?php elseif ($view_id > 0 && !empty($single_entry)): ?>
                <!-- Single Entry Detail View -->
                <div>
                    <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=' . urlencode($active_tab)); ?>" class="jf-action-btn jf-btn-toggle" style="margin-bottom:15px;display:inline-block;">← Back to List</a>
                    
                    <div class="jf-detail-card">
                        <div class="jf-detail-header">
                            <h2 class="jf-detail-title">
                                <?php echo esc_html($single_entry->form_name); ?> (#<?php echo $single_entry->id; ?>)
                            </h2>
                            <div class="jf-detail-meta">
                                <span>📅 Submitted At: <strong><?php echo esc_html($single_entry->created_at); ?></strong></span>
                                <span>🌐 IP Address: <code><?php echo esc_html($single_entry->ip_address); ?></code></span>
                                <span>🔗 Source Page: <a href="<?php echo esc_url($single_entry->page_url); ?>" target="_blank"><?php echo esc_html($single_entry->page_url); ?></a></span>
                            </div>
                        </div>

                        <h3 style="font-size:16px;color:#0e3b2e;margin-bottom:10px;">Submitted Field Data</h3>
                        <table class="jf-detail-table">
                            <thead>
                                <tr>
                                    <th>Field Name</th>
                                    <th>Field Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $field_data = json_decode($single_entry->fields, true);
                                if (is_array($field_data)) {
                                    foreach ($field_data as $k => $v) {
                                        $label = esc_html(ucwords(str_replace('_', ' ', $k)));
                                        $val = is_array($v) ? esc_html(implode(', ', $v)) : esc_html($v);
                                        echo "<tr><th>{$label}</th><td>" . nl2br($val) . "</td></tr>";
                                    }
                                } else {
                                    echo "<tr><th>Raw Payload</th><td>" . esc_html($single_entry->fields) . "</td></tr>";
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>

            <?php else: ?>
                <!-- Table Listing View -->
                <?php
                if (!empty($active_tab) && $active_tab !== 'all') {
                    $submissions = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE form_name = %s ORDER BY id DESC LIMIT 200", $active_tab));
                } else {
                    $submissions = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY id DESC LIMIT 200");
                }
                ?>

                <div class="jf-table-card">
                    <table class="jf-table">
                        <thead>
                            <tr>
                                <th style="width:60px;">ID</th>
                                <th style="width:100px;">Status</th>
                                <th style="width:180px;">Form Type</th>
                                <th>Field Data Preview</th>
                                <th style="width:180px;">Page Source</th>
                                <th style="width:160px;">Date &amp; Time</th>
                                <th style="width:200px;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($submissions)): ?>
                                <tr>
                                    <td colspan="7" style="text-align:center;padding:30px;color:#64748b;">
                                        No form submissions recorded yet for this view.
                                    </td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($submissions as $sub): ?>
                                    <?php
                                    $is_unread = ($sub->status === 'unread');
                                    $row_class = $is_unread ? 'jf-row-unread' : '';
                                    $fields_obj = json_decode($sub->fields, true);
                                    $preview_text = '';

                                    if (is_array($fields_obj)) {
                                        $parts = array();
                                        foreach (array_slice($fields_obj, 0, 3) as $k => $v) {
                                            $v_str = is_array($v) ? implode(', ', $v) : $v;
                                            $parts[] = '<strong>' . esc_html(ucwords(str_replace('_', ' ', $k))) . ':</strong> ' . esc_html(mb_strimwidth($v_str, 0, 30, '...'));
                                        }
                                        $preview_text = implode(' <span style="color:#cbd5e1;">|</span> ', $parts);
                                    } else {
                                        $preview_text = esc_html(mb_strimwidth($sub->fields, 0, 80, '...'));
                                    }

                                    $raw_url = $sub->page_url;
                                    $parsed_path = parse_url($raw_url, PHP_URL_PATH) ?: '/';
                                    $display_label = ($parsed_path === '/' || empty($parsed_path)) ? 'Home (/)' : esc_html($parsed_path);
                                    ?>
                                    <tr class="<?php echo $row_class; ?>">
                                        <td>#<?php echo $sub->id; ?></td>
                                        <td>
                                            <?php if ($is_unread): ?>
                                                <span class="jf-badge-unread">Unread</span>
                                            <?php else: ?>
                                                <span class="jf-badge-read">Read</span>
                                            <?php endif; ?>
                                        </td>
                                        <td><strong><?php echo esc_html($sub->form_name); ?></strong></td>
                                        <td><?php echo $preview_text; ?></td>
                                        <td>
                                            <a href="<?php echo esc_url($raw_url); ?>" target="_blank" style="color:#0e3b2e;font-weight:600;text-decoration:underline;" title="<?php echo esc_attr($raw_url); ?>">
                                                <?php echo $display_label; ?>
                                            </a>
                                        </td>
                                        <td style="font-family:monospace;font-size:12px;color:#64748b;"><?php echo esc_html($sub->created_at); ?></td>
                                        <td>
                                            <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=' . urlencode($active_tab) . '&view_id=' . $sub->id); ?>" class="jf-action-btn jf-btn-view">View</a>
                                            
                                            <?php if ($is_unread): ?>
                                                <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_toggle_submission_status&id=' . $sub->id . '&status=read'), 'jf_toggle_status_nonce')); ?>" class="jf-action-btn jf-btn-toggle">Mark Read</a>
                                            <?php else: ?>
                                                <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_toggle_submission_status&id=' . $sub->id . '&status=unread'), 'jf_toggle_status_nonce')); ?>" class="jf-action-btn jf-btn-toggle">Mark Unread</a>
                                            <?php endif; ?>

                                            <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_delete_submission&id=' . $sub->id), 'jf_delete_submission_nonce')); ?>" class="jf-action-btn jf-btn-delete" onclick="return confirm('Delete this submission entry?');">Delete</a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
}

// Instantiate Handler Singleton
JF_Form_Submissions_Handler::get_instance();
