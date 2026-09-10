<?php
/**
 * Snippet Name: Jan Franko Next.js Form Submissions Storage & WP Admin Handler
 * Description: Custom database table, REST API POST endpoint, unread badge counter, dynamic form tabs, and email alerts for Next.js forms.
 * Version: 1.0.0
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
        add_action('admin_post_jf_toggle_submission_status', array($this, 'handle_status_toggle'));
        add_action('admin_post_jf_delete_submission', array($this, 'handle_delete_submission'));
        add_action('admin_post_jf_export_submissions_csv', array($this, 'handle_csv_export'));
        add_action('admin_post_jf_save_settings', array($this, 'handle_save_settings'));
    }

    /**
     * Create Custom DB Table if not exists
     */
    public function maybe_create_table() {
        if (get_option('jf_form_db_version') === '1.0.0') {
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

        update_option('jf_form_db_version', '1.0.0');

        // Set default secret key if not set
        if (!get_option($this->option_secret_key)) {
            update_option($this->option_secret_key, 'janfranko_form_sec_2026_x89a');
        }

        // Set default email notification if not set
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
            'permission_callback' => '__return_true', // Validated manually via secret header
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

        // Send Email Alert
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

        $body = "<h2>New Form Submission Recorded</h2>";
        $body .= "<p><strong>Form Name:</strong> " . esc_html($form_name) . "</p>";
        $body .= "<p><strong>Page URL:</strong> <a href='" . esc_url($page_url) . "'>" . esc_html($page_url) . "</a></p>";
        $body .= "<p><strong>IP Address:</strong> " . esc_html($ip_address) . "</p>";
        $body .= "<p><strong>Submitted At:</strong> " . esc_html(current_time('Y-m-d H:i:s')) . "</p>";

        $body .= "<h3>Submitted Fields:</h3><ul>";
        if (is_array($fields) || is_object($fields)) {
            foreach ($fields as $key => $val) {
                $formatted_key = esc_html(ucwords(str_replace('_', ' ', $key)));
                $formatted_val = is_array($val) ? esc_html(implode(', ', $val)) : esc_html($val);
                $body .= "<li><strong>{$formatted_key}:</strong> {$formatted_val}</li>";
            }
        }
        $body .= "</ul>";

        $admin_url = admin_url('admin.php?page=jf-form-submissions');
        $body .= "<p><a href='" . esc_url($admin_url) . "' style='display:inline-block;padding:10px 18px;background:#0e3b2e;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;'>View Submission in WP Admin</a></p>";

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
        <div class="wrap">
            <h1 class="wp-heading-inline" style="font-family:Georgia, serif;font-weight:bold;color:#0e3b2e;">
                Traditional Archery Academy — Form Submissions
            </h1>

            <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_export_submissions_csv&tab=' . urlencode($active_tab)), 'jf_export_csv_nonce')); ?>" className="page-title-action" style="background:#0e3b2e;color:#fff;border:none;">
                Export Submissions to CSV
            </a>

            <hr className="wp-header-end" />

            <?php if (isset($_GET['updated'])): ?>
                <div className="notice notice-success is-dismissible"><p>Settings saved successfully.</p></div>
            <?php endif; ?>

            <!-- Navigation Tabs (Dynamic per Form Name) -->
            <h2 className="nav-tab-wrapper" style="margin-top:15px;">
                <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=all'); ?>" class="nav-tab <?php echo ($active_tab === 'all') ? 'nav-tab-active' : ''; ?>">
                    All Submissions
                </a>
                <?php foreach ($distinct_forms as $fname): ?>
                    <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=' . urlencode($fname)); ?>" class="nav-tab <?php echo ($active_tab === $fname) ? 'nav-tab-active' : ''; ?>">
                        <?php echo esc_html($fname); ?>
                    </a>
                <?php endforeach; ?>
                <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=settings'); ?>" class="nav-tab <?php echo ($active_tab === 'settings') ? 'nav-tab-active' : ''; ?>" style="margin-left:auto;background:#f0f0f1;">
                    ⚙️ Settings &amp; API Key
                </a>
            </h2>

            <?php if ($active_tab === 'settings'): ?>
                <!-- Settings Panel -->
                <div className="card" style="max-width:700px;margin-top:20px;padding:20px;border-radius:8px;">
                    <h3>Form Integration Settings</h3>
                    <form method="post" action="<?php echo admin_url('admin-post.php'); ?>">
                        <input type="hidden" name="action" value="jf_save_settings" />
                        <?php wp_nonce_field('jf_save_settings_nonce'); ?>

                        <table className="form-table">
                            <tr>
                                <th scope="row"><label for="jf_secret_key">API Secret Authorization Password</label></th>
                                <td>
                                    <input type="text" id="jf_secret_key" name="jf_secret_key" value="<?php echo esc_attr(get_option($this->option_secret_key, 'janfranko_form_sec_2026_x89a')); ?>" class="regular-text" required />
                                    <p className="description">Must match <code>FORM_SECRET_KEY</code> in Next.js <code>.env.local</code>.</p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label for="jf_notification_emails">Email Notification Recipients</label></th>
                                <td>
                                    <textarea id="jf_notification_emails" name="jf_notification_emails" rows="3" class="large-text" placeholder="janfranko@tutanota.com, info@janfranko.com"><?php echo esc_textarea(get_option($this->option_emails, 'janfranko@tutanota.com')); ?></textarea>
                                    <p className="description">Separate multiple email addresses with commas. Instant alerts will be sent here upon submission.</p>
                                </td>
                            </tr>
                        </table>

                        <?php submit_button('Save Settings'); ?>
                    </form>
                </div>

            <?php elseif ($view_id > 0 && !empty($single_entry)): ?>
                <!-- Single Entry Detail View -->
                <div style="margin-top:20px;">
                    <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=' . urlencode($active_tab)); ?>" class="button">← Back to List</a>
                    <div className="card" style="margin-top:15px;padding:25px;max-width:800px;border-radius:10px;">
                        <h2 style="font-family:Georgia, serif;color:#0e3b2e;">
                            <?php echo esc_html($single_entry->form_name); ?> (#<?php echo $single_entry->id; ?>)
                        </h2>
                        <p style="color:#666;font-size:12px;">
                            Submitted at: <strong><?php echo esc_html($single_entry->created_at); ?></strong> | IP: <code><?php echo esc_html($single_entry->ip_address); ?></code>
                        </p>
                        <p style="color:#666;font-size:12px;">
                            Source Location: <a href="<?php echo esc_url($single_entry->page_url); ?>" target="_blank"><?php echo esc_html($single_entry->page_url); ?></a>
                        </p>

                        <hr />

                        <h3>Submitted Field Data</h3>
                        <table className="widefat striped" style="margin-top:10px;">
                            <thead>
                                <tr>
                                    <th style="width:30%;">Field Name</th>
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
                                        echo "<tr><td><strong>{$label}</strong></td><td>" . nl2br($val) . "</td></tr>";
                                    }
                                } else {
                                    echo "<tr><td colspan='2'>" . esc_html($single_entry->fields) . "</td></tr>";
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

                <table className="wp-list-table widefat fixed striped table-view-list" style="margin-top:20px;">
                    <thead>
                        <tr>
                            <th style="width:60px;">ID</th>
                            <th style="width:100px;">Status</th>
                            <th style="width:180px;">Form Type</th>
                            <th>Field Data Preview</th>
                            <th style="width:180px;">Page Source</th>
                            <th style="width:140px;">Date &amp; Time</th>
                            <th style="width:180px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($submissions)): ?>
                            <tr>
                                <td colspan="7">No submissions recorded yet for this view.</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($submissions as $sub): ?>
                                <?php
                                $is_unread = ($sub->status === 'unread');
                                $row_style = $is_unread ? 'font-weight:bold;background:#fff8e5;' : '';
                                $fields_obj = json_decode($sub->fields, true);
                                $preview_text = '';

                                if (is_array($fields_obj)) {
                                    $parts = array();
                                    foreach (array_slice($fields_obj, 0, 3) as $k => $v) {
                                        $v_str = is_array($v) ? implode(', ', $v) : $v;
                                        $parts[] = ucwords(str_replace('_', ' ', $k)) . ': ' . esc_html(mb_strimwidth($v_str, 0, 30, '...'));
                                    }
                                    $preview_text = implode(' | ', $parts);
                                } else {
                                    $preview_text = esc_html(mb_strimwidth($sub->fields, 0, 80, '...'));
                                }
                                ?>
                                <tr style="<?php echo $row_style; ?>">
                                    <td>#<?php echo $sub->id; ?></td>
                                    <td>
                                        <?php if ($is_unread): ?>
                                            <span style="background:#d63638;color:#fff;padding:3px 8px;border-radius:12px;font-size:10px;text-transform:uppercase;">Unread</span>
                                        <?php else: ?>
                                            <span style="background:#2c3338;color:#eee;padding:3px 8px;border-radius:12px;font-size:10px;text-transform:uppercase;">Read</span>
                                        <?php endif; ?>
                                    </td>
                                    <td><strong><?php echo esc_html($sub->form_name); ?></strong></td>
                                    <td><?php echo $preview_text; ?></td>
                                    <td><a href="<?php echo esc_url($sub->page_url); ?>" target="_blank" style="font-size:11px;"><?php echo esc_html(parse_url($sub->page_url, PHP_URL_PATH) ?: $sub->page_url); ?></a></td>
                                    <td style="font-size:11px;"><?php echo esc_html($sub->created_at); ?></td>
                                    <td>
                                        <a href="<?php echo admin_url('admin.php?page=jf-form-submissions&tab=' . urlencode($active_tab) . '&view_id=' . $sub->id); ?>" class="button button-small button-primary">View</a>
                                        
                                        <?php if ($is_unread): ?>
                                            <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_toggle_submission_status&id=' . $sub->id . '&status=read'), 'jf_toggle_status_nonce')); ?>" class="button button-small">Mark Read</a>
                                        <?php else: ?>
                                            <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_toggle_submission_status&id=' . $sub->id . '&status=unread'), 'jf_toggle_status_nonce')); ?>" class="button button-small">Mark Unread</a>
                                        <?php endif; ?>

                                        <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=jf_delete_submission&id=' . $sub->id), 'jf_delete_submission_nonce')); ?>" class="button button-small" onclick="return confirm('Delete this submission entry?');" style="color:#b32d2e;">Delete</a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        <?php
    }
}

// Instantiate Handler Singleton
JF_Form_Submissions_Handler::get_instance();
