<?php
/**
 * Snippet Name: Jan Franko Equipment Product Orders & Inquiries Handler
 * Description: Dedicated database table, REST API POST endpoint, status lifecycle pipeline (New, Read, In Discussion, Approved, In Production, Production Ready, Shipment Sent, Delivered), and WP Admin tracking dashboard for Equipment products.
 * Version: 1.0.0
 * Author: Jan Franko Traditional Archery Academy
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class JF_Equipment_Orders_Handler {
    private static $instance = null;
    private $table_name;
    private $option_secret_key = 'jf_form_secret_key';
    private $option_emails = 'jf_form_notification_emails';

    // Status lifecycle stages
    private $statuses = array(
        'new'              => 'New Inquiry',
        'read'             => 'Read / In Review',
        'in_discussion'    => 'In Discussion',
        'approved'         => 'Approved',
        'in_production'    => 'In Production',
        'production_ready' => 'Production Ready',
        'shipment_sent'    => 'Shipment Sent',
        'delivered'        => 'Delivered'
    );

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'jf_equipment_inquiries';

        // Hooks
        add_action('init', array($this, 'maybe_create_table'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'register_admin_menu'));
        add_action('admin_head', array($this, 'inject_admin_styles'));
        add_action('admin_post_jf_update_equipment_status', array($this, 'handle_status_update'));
        add_action('admin_post_jf_delete_equipment_inquiry', array($this, 'handle_delete_inquiry'));
        add_action('admin_post_jf_export_equipment_csv', array($this, 'handle_csv_export'));
    }

    /**
     * Create Custom DB Table if not exists
     */
    public function maybe_create_table() {
        if (get_option('jf_equipment_db_version') === '1.0.0') {
            return;
        }

        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$this->table_name} (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            product_name varchar(255) NOT NULL,
            full_name varchar(150) NOT NULL,
            email varchar(150) NOT NULL,
            phone varchar(50) DEFAULT NULL,
            quantity varchar(50) DEFAULT '1',
            custom_specifications text DEFAULT NULL,
            shipping_destination varchar(255) DEFAULT NULL,
            message longtext DEFAULT NULL,
            page_url text DEFAULT NULL,
            ip_address varchar(45) DEFAULT NULL,
            device_info text DEFAULT NULL,
            status varchar(30) NOT NULL DEFAULT 'new',
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id),
            KEY product_name (product_name),
            KEY status (status),
            KEY created_at (created_at)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        update_option('jf_equipment_db_version', '1.0.0');
    }

    /**
     * Register REST API POST Endpoint
     */
    public function register_rest_routes() {
        register_rest_route('janfranko/v1', '/submit-equipment-inquiry', array(
            'methods'  => 'POST',
            'callback' => array($this, 'handle_rest_submission'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Handle incoming REST submission for Equipment Products
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

        $fields = !empty($params['fields']) ? $params['fields'] : array();

        $product_name          = !empty($fields['product_name']) ? sanitize_text_field($fields['product_name']) : 'General Equipment';
        $full_name             = !empty($fields['full_name']) ? sanitize_text_field($fields['full_name']) : 'Anonymous';
        $email                 = !empty($fields['email']) ? sanitize_email($fields['email']) : '';
        $phone                 = !empty($fields['phone']) ? sanitize_text_field($fields['phone']) : '';
        $quantity              = !empty($fields['quantity']) ? sanitize_text_field($fields['quantity']) : '1';
        $custom_specifications = !empty($fields['custom_specifications']) ? sanitize_textarea_field($fields['custom_specifications']) : '';
        $shipping_destination  = !empty($fields['shipping_destination']) ? sanitize_text_field($fields['shipping_destination']) : '';
        $message               = !empty($fields['message']) ? sanitize_textarea_field($fields['message']) : '';

        $page_url    = !empty($params['page_url']) ? esc_url_raw($params['page_url']) : '';
        $ip_address  = !empty($params['ip_address']) ? sanitize_text_field($params['ip_address']) : $_SERVER['REMOTE_ADDR'];
        $device_info = !empty($params['device_info']) ? sanitize_text_field($params['device_info']) : $_SERVER['HTTP_USER_AGENT'];

        global $wpdb;
        $inserted = $wpdb->insert(
            $this->table_name,
            array(
                'product_name'          => $product_name,
                'full_name'             => $full_name,
                'email'                 => $email,
                'phone'                 => $phone,
                'quantity'              => $quantity,
                'custom_specifications' => $custom_specifications,
                'shipping_destination'  => $shipping_destination,
                'message'               => $message,
                'page_url'              => $page_url,
                'ip_address'            => $ip_address,
                'device_info'           => $device_info,
                'status'                => 'new',
                'created_at'            => current_time('mysql')
            ),
            array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
        );

        if (!$inserted) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'Failed to save inquiry to database.'
            ), 500);
        }

        $this->send_email_notification($wpdb->insert_id, $product_name, $full_name, $email, $phone, $quantity, $custom_specifications, $shipping_destination, $message, $page_url);

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Equipment order inquiry recorded successfully.',
            'entry_id' => $wpdb->insert_id
        ), 200);
    }

    /**
     * Send Email Notification for Equipment Inquiry
     */
    private function send_email_notification($entry_id, $product_name, $full_name, $email, $phone, $quantity, $specs, $shipping, $message, $page_url) {
        $raw_emails = get_option($this->option_emails, 'janfranko@tutanota.com');
        if (empty($raw_emails)) return;

        $recipients = array_map('trim', explode(',', $raw_emails));
        $valid_emails = array_filter($recipients, 'is_email');
        if (empty($valid_emails)) return;

        $subject = sprintf('[Equipment Order Inquiry #%d] %s - %s', $entry_id, $product_name, $full_name);

        $body = "<div style='font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#333;'>";
        $body .= "<h2 style='color:#0e3b2e;'>New Equipment Product Order Inquiry</h2>";
        $body .= "<p><strong>Product:</strong> " . esc_html($product_name) . "</p>";
        $body .= "<p><strong>Customer Name:</strong> " . esc_html($full_name) . "</p>";
        $body .= "<p><strong>Email:</strong> <a href='mailto:" . esc_attr($email) . "'>" . esc_html($email) . "</a></p>";
        $body .= "<p><strong>Phone / WhatsApp:</strong> " . esc_html($phone) . "</p>";
        $body .= "<p><strong>Quantity:</strong> " . esc_html($quantity) . "</p>";
        $body .= "<p><strong>Custom Specifications:</strong> " . esc_html($specs) . "</p>";
        $body .= "<p><strong>Shipping Destination:</strong> " . esc_html($shipping) . "</p>";
        $body .= "<p><strong>Message / Request:</strong><br>" . nl2br(esc_html($message)) . "</p>";
        $body .= "<p><strong>Page URL:</strong> <a href='" . esc_url($page_url) . "'>" . esc_html($page_url) . "</a></p>";
        $body .= "<hr style='border:none;border-top:1px solid #ddd;margin:20px 0;'>";
        $body .= "<p style='font-size:12px;color:#777;'>Jan Franko Archery Academy - Automatic Equipment Order Notification</p>";
        $body .= "</div>";

        $headers = array('Content-Type: text/html; charset=UTF-8');
        wp_mail($valid_emails, $subject, $body, $headers);
    }

    /**
     * Register WP Admin Top-Level Menu
     */
    public function register_admin_menu() {
        global $wpdb;
        $new_count = 0;
        if ($wpdb->get_var("SHOW TABLES LIKE '{$this->table_name}'") === $this->table_name) {
            $new_count = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name} WHERE status = 'new'");
        }

        $menu_title = 'Equipment Orders';
        if ($new_count > 0) {
            $menu_title .= sprintf(' <span class="awaiting-mod count-%d"><span class="pending-count" aria-hidden="true">%d</span></span>', $new_count, $new_count);
        }

        add_menu_page(
            'Equipment Orders & Inquiries',
            $menu_title,
            'manage_options',
            'jf-equipment-orders',
            array($this, 'render_admin_page'),
            'dashicons-shield-alt',
            27
        );
    }

    /**
     * Inject Custom CSS into WP Admin Head
     */
    public function inject_admin_styles() {
        $screen = get_current_screen();
        if ($screen && $screen->id === 'toplevel_page_jf-equipment-orders') {
            echo '<style>
                .jf-eq-dashboard { margin-top: 20px; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif; }
                .jf-eq-kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 25px; }
                .jf-eq-kpi-card { background: #fff; border-radius: 12px; border: 1px solid #c3c4c7; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
                .jf-eq-kpi-card h4 { margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #646970; }
                .jf-eq-kpi-card .number { font-size: 26px; font-weight: 700; color: #0e3b2e; }
                .jf-eq-status-badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
                .jf-status-new { background: #d6f5e8; color: #0e3b2e; }
                .jf-status-read { background: #f0f0f1; color: #50575e; }
                .jf-status-in_discussion { background: #fff3cd; color: #856404; }
                .jf-status-approved { background: #cce5ff; color: #004085; }
                .jf-status-in_production { background: #e2e3e5; color: #383d41; }
                .jf-status-production_ready { background: #d1ecf1; color: #0c5460; }
                .jf-status-shipment_sent { background: #e8daef; color: #5b2c6f; }
                .jf-status-delivered { background: #d4edda; color: #155724; }
                .jf-eq-filter-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 12px; }
                .jf-eq-tab { text-decoration: none; padding: 6px 14px; border-radius: 6px; background: #fff; border: 1px solid #ccc; color: #2c3338; font-size: 12px; font-weight: 500; }
                .jf-eq-tab.active { background: #0e3b2e; color: #fff; border-color: #0e3b2e; }
            </style>';
        }
    }

    /**
     * Update Order Status Lifecycle State
     */
    public function handle_status_update() {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        check_admin_referer('jf_update_equipment_status_action');

        $id     = isset($_POST['inquiry_id']) ? intval($_POST['inquiry_id']) : 0;
        $status = isset($_POST['new_status']) ? sanitize_text_field($_POST['new_status']) : '';

        if ($id > 0 && array_key_exists($status, $this->statuses)) {
            global $wpdb;
            $wpdb->update(
                $this->table_name,
                array('status' => $status),
                array('id' => $id),
                array('%s'),
                array('%d')
            );
        }

        $redirect = wp_get_referer();
        if (!$redirect) {
            $redirect = admin_url('admin.php?page=jf-equipment-orders');
        }
        wp_safe_redirect($redirect);
        exit;
    }

    /**
     * Delete Inquiry
     */
    public function handle_delete_inquiry() {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        check_admin_referer('jf_delete_equipment_inquiry_action');

        $id = isset($_POST['inquiry_id']) ? intval($_POST['inquiry_id']) : 0;
        if ($id > 0) {
            global $wpdb;
            $wpdb->delete($this->table_name, array('id' => $id), array('%d'));
        }

        $redirect = wp_get_referer();
        if (!$redirect) {
            $redirect = admin_url('admin.php?page=jf-equipment-orders');
        }
        wp_safe_redirect($redirect);
        exit;
    }

    /**
     * Export Equipment Inquiries to CSV
     */
    public function handle_csv_export() {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        check_admin_referer('jf_export_equipment_csv_action');

        global $wpdb;
        $rows = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY id DESC", ARRAY_A);

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=janfranko_equipment_orders_' . date('Y-m-d') . '.csv');

        $output = fopen('php://output', 'w');
        fputcsv($output, array('ID', 'Product Name', 'Customer Name', 'Email', 'Phone', 'Quantity', 'Specifications', 'Shipping Destination', 'Message', 'Status', 'Submitted At', 'Page URL', 'IP Address'));

        foreach ($rows as $r) {
            fputcsv($output, array(
                $r['id'],
                $r['product_name'],
                $r['full_name'],
                $r['email'],
                $r['phone'],
                $r['quantity'],
                $r['custom_specifications'],
                $r['shipping_destination'],
                $r['message'],
                $r['status'],
                $r['created_at'],
                $r['page_url'],
                $r['ip_address']
            ));
        }

        fclose($output);
        exit;
    }

    /**
     * Render WP Admin Main Page
     */
    public function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        global $wpdb;

        // Statistics
        $total_count        = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name}");
        $new_count          = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name} WHERE status = 'new'");
        $in_discussion_cnt  = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name} WHERE status = 'in_discussion'");
        $approved_cnt       = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name} WHERE status = 'approved'");
        $in_production_cnt  = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name} WHERE status = 'in_production'");
        $shipped_cnt        = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name} WHERE status IN ('shipment_sent', 'delivered')");
        $top_product        = $wpdb->get_var("SELECT product_name FROM {$this->table_name} GROUP BY product_name ORDER BY COUNT(*) DESC LIMIT 1");

        $active_tab = isset($_GET['status_tab']) ? sanitize_text_field($_GET['status_tab']) : 'all';

        // Query entries
        if ($active_tab === 'all' || !array_key_exists($active_tab, $this->statuses)) {
            $entries = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY id DESC LIMIT 200");
        } else {
            $entries = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE status = %s ORDER BY id DESC LIMIT 200", $active_tab));
        }

        // Single entry view
        $view_id = isset($_GET['view_id']) ? intval($_GET['view_id']) : 0;
        $single_entry = null;
        if ($view_id > 0) {
            $single_entry = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE id = %d", $view_id));
            if ($single_entry && $single_entry->status === 'new') {
                $wpdb->update($this->table_name, array('status' => 'read'), array('id' => $view_id), array('%s'), array('%d'));
                $single_entry->status = 'read';
            }
        }

        echo '<div class="wrap jf-eq-dashboard">';
        echo '<h1 class="wp-heading-inline" style="color:#0e3b2e;font-weight:700;">Equipment Orders &amp; Inquiries Dashboard</h1>';
        
        echo '<form action="' . admin_url('admin-post.php') . '" method="post" style="display:inline-block;margin-left:15px;">';
        echo '<input type="hidden" name="action" value="jf_export_equipment_csv">';
        wp_nonce_field('jf_export_equipment_csv_action');
        echo '<button type="submit" class="button button-secondary">Export Orders CSV</button>';
        echo '</form>';

        echo '<hr class="wp-header-end">';

        // KPI Stat Cards
        echo '<div class="jf-eq-kpi-grid">';
        echo '<div class="jf-eq-kpi-card"><h4>Total Orders</h4><div class="number">' . $total_count . '</div></div>';
        echo '<div class="jf-eq-kpi-card"><h4>New Inquiries</h4><div class="number" style="color:#28a745;">' . $new_count . '</div></div>';
        echo '<div class="jf-eq-kpi-card"><h4>In Discussion</h4><div class="number" style="color:#ffc107;">' . $in_discussion_cnt . '</div></div>';
        echo '<div class="jf-eq-kpi-card"><h4>Approved &amp; In Production</h4><div class="number" style="color:#007bff;">' . ($approved_cnt + $in_production_cnt) . '</div></div>';
        echo '<div class="jf-eq-kpi-card"><h4>Shipped / Delivered</h4><div class="number" style="color:#6f42c1;">' . $shipped_cnt . '</div></div>';
        echo '<div class="jf-eq-kpi-card"><h4>Top Inquired Item</h4><div class="number" style="font-size:14px;line-height:1.3;padding-top:4px;">' . esc_html($top_product ? $top_product : 'N/A') . '</div></div>';
        echo '</div>';

        // Single Entry Detail Overlay/Modal View
        if ($single_entry) {
            echo '<div style="background:#fff;border:1px solid #c3c4c7;border-radius:12px;padding:25px;margin-bottom:30px;box-shadow:0 3px 6px rgba(0,0,0,0.06);">';
            echo '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #eee;padding-bottom:15px;margin-bottom:20px;">';
            echo '<h2 style="margin:0;color:#0e3b2e;">Order Details #' . $single_entry->id . ' — ' . esc_html($single_entry->product_name) . '</h2>';
            echo '<a href="' . remove_query_arg('view_id') . '" class="button button-secondary">Close View</a>';
            echo '</div>';

            echo '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">';
            echo '<div>';
            echo '<p><strong>Product Name:</strong> ' . esc_html($single_entry->product_name) . '</p>';
            echo '<p><strong>Customer Name:</strong> ' . esc_html($single_entry->full_name) . '</p>';
            echo '<p><strong>Email Address:</strong> <a href="mailto:' . esc_attr($single_entry->email) . '">' . esc_html($single_entry->email) . '</a></p>';
            echo '<p><strong>Phone / WhatsApp:</strong> ' . esc_html($single_entry->phone) . '</p>';
            echo '<p><strong>Quantity:</strong> ' . esc_html($single_entry->quantity) . '</p>';
            echo '<p><strong>Shipping Destination:</strong> ' . esc_html($single_entry->shipping_destination ? $single_entry->shipping_destination : 'Not specified') . '</p>';
            echo '</div>';

            echo '<div>';
            echo '<p><strong>Current Order Stage:</strong> <span class="jf-eq-status-badge jf-status-' . esc_attr($single_entry->status) . '">' . esc_html(isset($this->statuses[$single_entry->status]) ? $this->statuses[$single_entry->status] : $single_entry->status) . '</span></p>';
            echo '<p><strong>Submitted Date:</strong> ' . esc_html($single_entry->created_at) . '</p>';
            echo '<p><strong>Submitted Page URL:</strong> <a href="' . esc_url($single_entry->page_url) . '" target="_blank">' . esc_html($single_entry->page_url) . '</a></p>';
            echo '<p><strong>IP Address:</strong> ' . esc_html($single_entry->ip_address) . '</p>';
            echo '</div>';
            echo '</div>';

            echo '<div style="margin-top:20px;padding:15px;background:#f9f9f9;border-radius:8px;">';
            echo '<h4 style="margin:0 0 10px 0;color:#7d603a;">Custom Specifications Requested:</h4>';
            echo '<p style="margin:0;font-family:monospace;white-space:pre-wrap;">' . esc_html($single_entry->custom_specifications ? $single_entry->custom_specifications : 'None') . '</p>';
            echo '</div>';

            echo '<div style="margin-top:15px;padding:15px;background:#f9f9f9;border-radius:8px;">';
            echo '<h4 style="margin:0 0 10px 0;color:#7d603a;">Customer Inquiry Message:</h4>';
            echo '<p style="margin:0;white-space:pre-wrap;">' . esc_html($single_entry->message) . '</p>';
            echo '</div>';

            // Quick Status Advance Controls
            echo '<div style="margin-top:20px;padding-top:15px;border-top:1px solid #eee;display:flex;align-items:center;gap:15px;">';
            echo '<span style="font-weight:600;">Advance Pipeline Stage:</span>';
            echo '<form action="' . admin_url('admin-post.php') . '" method="post" style="display:inline-flex;gap:10px;">';
            echo '<input type="hidden" name="action" value="jf_update_equipment_status">';
            echo '<input type="hidden" name="inquiry_id" value="' . $single_entry->id . '">';
            wp_nonce_field('jf_update_equipment_status_action');
            echo '<select name="new_status" class="postform">';
            foreach ($this->statuses as $st_key => $st_label) {
                echo '<option value="' . esc_attr($st_key) . '" ' . selected($single_entry->status, $st_key, false) . '>' . esc_html($st_label) . '</option>';
            }
            echo '</select>';
            echo '<button type="submit" class="button button-primary">Update Status</button>';
            echo '</form>';
            echo '</div>';

            echo '</div>';
        }

        // Filter Tabs
        echo '<div class="jf-eq-filter-tabs">';
        $all_url = remove_query_arg(array('status_tab', 'view_id'));
        echo '<a href="' . esc_url($all_url) . '" class="jf-eq-tab ' . ($active_tab === 'all' ? 'active' : '') . '">All (' . $total_count . ')</a>';
        foreach ($this->statuses as $st_key => $st_label) {
            $cnt = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$this->table_name} WHERE status = %s", $st_key));
            $tab_url = add_query_arg('status_tab', $st_key, remove_query_arg('view_id'));
            echo '<a href="' . esc_url($tab_url) . '" class="jf-eq-tab ' . ($active_tab === $st_key ? 'active' : '') . '">' . esc_html($st_label) . ' (' . $cnt . ')</a>';
        }
        echo '</div>';

        // Submissions Data Table
        echo '<table class="wp-list-table widefat fixed striped table-view-list">';
        echo '<thead>';
        echo '<tr>';
        echo '<th style="width:50px;">ID</th>';
        echo '<th>Product Name</th>';
        echo '<th>Customer</th>';
        echo '<th>Email / Phone</th>';
        echo '<th>Qty</th>';
        echo '<th>Status Pipeline Stage</th>';
        echo '<th>Submitted At</th>';
        echo '<th style="width:160px;">Actions</th>';
        echo '</tr>';
        echo '</thead>';
        echo '<tbody>';

        if (empty($entries)) {
            echo '<tr><td colspan="8" style="text-align:center;padding:20px;color:#888;">No equipment order inquiries found in this view.</td></tr>';
        } else {
            foreach ($entries as $row) {
                $view_url = add_query_arg('view_id', $row->id);
                $st_label = isset($this->statuses[$row->status]) ? $this->statuses[$row->status] : $row->status;

                echo '<tr>';
                echo '<td><strong>#' . $row->id . '</strong></td>';
                echo '<td><strong><a href="' . esc_url($view_url) . '">' . esc_html($row->product_name) . '</a></strong></td>';
                echo '<td>' . esc_html($row->full_name) . '</td>';
                echo '<td><a href="mailto:' . esc_attr($row->email) . '">' . esc_html($row->email) . '</a><br><small>' . esc_html($row->phone) . '</small></td>';
                echo '<td><span class="badge" style="background:#eee;padding:2px 8px;border-radius:10px;font-size:11px;">' . esc_html($row->quantity) . '</span></td>';
                echo '<td><span class="jf-eq-status-badge jf-status-' . esc_attr($row->status) . '">' . esc_html($st_label) . '</span></td>';
                echo '<td>' . esc_html(date('M j, Y H:i', strtotime($row->created_at))) . '</td>';
                echo '<td>';
                echo '<a href="' . esc_url($view_url) . '" class="button button-small button-primary" style="margin-right:4px;">View</a>';

                // Delete Form
                echo '<form action="' . admin_url('admin-post.php') . '" method="post" style="display:inline-block;" onsubmit="return confirm(\'Delete this inquiry record?\');">';
                echo '<input type="hidden" name="action" value="jf_delete_equipment_inquiry">';
                echo '<input type="hidden" name="inquiry_id" value="' . $row->id . '">';
                wp_nonce_field('jf_delete_equipment_inquiry_action');
                echo '<button type="submit" class="button button-small button-link-delete" style="color:#a00;">Delete</button>';
                echo '</form>';

                echo '</td>';
                echo '</tr>';
            }
        }

        echo '</tbody>';
        echo '</table>';
        echo '</div>';
    }
}

// Instantiate
JF_Equipment_Orders_Handler::get_instance();
