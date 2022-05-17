<?php
/**
 * Plugin Name: Theme Review Stats
 * Description: Displays stats from theme reviews
 * Plugin URI: https://github.com/WordPress/theme-review-stats-block
 * Author: WordPress.org
 * Version: 1.1.0
 * Text Domain: wporg-theme-review-stats-block
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

namespace WordPressdotorg\Theme_Review_Stats_Block;

/**
 * Render the block content (html) on the frontend of the site.
 *
 * @param array  $attributes
 * @param string $content
 * @return string HTML output used by the calendar JS.
 */
function render_callback( $attributes, $content ) {
	return sprintf(
		'<div class="wporg-theme-review-stats wporg-theme-review-stats-js"
			data-url="%s" 
			data-title="%s" 
			data-headings="%s" 
			data-notes="%s" 
			data-type="%s" 
			data-options="%s"
		>Loading Stats ...</div>',
		esc_attr( $attributes['dataURL'] ),
		esc_attr( $attributes['title'] ),
		esc_attr( $attributes['headings'] ),
		esc_attr( $attributes['notes'] ),
		esc_attr( $attributes['chartType'] ),
		esc_attr( $attributes['chartOptions'] ),
	);
}

/**
 * Register scripts, styles, and block.
 */
function register_assets() {
	$block_deps_path    = __DIR__ . '/build/index.asset.php';
	$frontend_deps_path = __DIR__ . '/build/frontend.asset.php';
	if ( ! file_exists( $block_deps_path ) || ! file_exists( $frontend_deps_path ) ) {
		return;
	}

	$block_info    = require $block_deps_path;
	$frontend_info = require $frontend_deps_path;

	// Register our block script with WordPress.
	wp_register_script(
		'wporg-theme-review-stats-block-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$block_info['dependencies'],
		$block_info['version'],
		false
	);

	// Register our block's base CSS.
	wp_register_style(
		'wporg-theme-review-stats-block-style',
		plugins_url( 'style.css', __FILE__ ),
		array(),
		$block_info['version']
	);

	// No frontend scripts in the editor
	if ( ! is_admin() ) {
		wp_register_script(
			'wporg-theme-review-stats-script',
			plugin_dir_url( __FILE__ ) . 'build/frontend.js',
			$frontend_info['dependencies'],
			$frontend_info['version'],
			false
		);
		wp_register_style(
			'wporg-theme-review-stats-style',
			plugin_dir_url( __FILE__ ) . 'build/frontend.css',
			array( 'wp-components' ),
			$frontend_info['version']
		);
	}

	// Enqueue the script in the editor.
	register_block_type(
		'wporg-theme-review-stats/main',
		array(
			'editor_script'   => 'wporg-theme-review-stats-block-script',
			'editor_style'    => 'wporg-theme-review-stats-block-style',
			'script'          => 'wporg-theme-review-stats-script',
			'style'           => 'wporg-theme-review-stats-style',
			'render_callback' => __NAMESPACE__ . '\render_callback',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_assets' );

/**
 * Conditionally remove the Script/Style assets added through `register_block_type()`.
 */
function conditionally_load_assets() {
	if ( ! is_singular() || ! has_block( 'wporg-theme-review-stats/main' ) ) {
		wp_dequeue_script( 'wporg-theme-review-stats-script' );
		wp_dequeue_style( 'wporg-theme-review-stats-style' );
	}
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\conditionally_load_assets' );
