<?php
/**
 * Base functions
 *
 * @package           HostGatorWordPressPlugin
 */

/**
 * Check if plugin install date exists.
 *
 * @return bool
 */
function hg_has_plugin_install_date() {
	return ! empty( get_option( 'hg_plugin_install_date', '' ) );
}

/**
 * Get the plugin install date.
 *
 * @return string
 */
function hg_get_plugin_install_date() {
	return (string) get_option( 'hg_plugin_install_date', gmdate( 'U' ) );
}

/**
 * Set the plugin install date.
 *
 * @param string $value Date in Unix timestamp format.
 */
function hg_set_plugin_install_date( $value ) {
	update_option( 'hg_plugin_install_date', $value, true );
}


/**
 * Get the number of days since the plugin was installed.
 *
 * @return int
 */
function hg_get_days_since_plugin_install_date() {
	return absint( ( gmdate( 'U' ) - hg_get_plugin_install_date() ) / DAY_IN_SECONDS );
}

/**
 * Basic setup
 */
function hg_setup() {
	if ( ( '' === get_option( 'mm_master_aff' ) || false === get_option( 'mm_master_aff' ) ) && defined( 'MMAFF' ) ) {
		update_option( 'mm_master_aff', MMAFF );
	}
	$install_date = get_option( 'mm_install_date' );
	if ( empty( $install_date ) ) {
		update_option( 'mm_install_date', date( 'M d, Y' ) );
		$event                            = array(
			't'    => 'event',
			'ec'   => 'plugin_status',
			'ea'   => 'installed',
			'el'   => 'Install date: ' . get_option( 'mm_install_date', date( 'M d, Y' ) ),
			'keep' => false,
		);
		$events                           = get_option( 'mm_cron', array() );
		$events['hourly'][ $event['ea'] ] = $event;
		update_option( 'mm_cron', $events );
	}
	if ( ! hg_has_plugin_install_date() ) {
		$date = false;
		if ( ! empty( $install_date ) ) {
			$date = DateTime::createFromFormat( 'M d, Y', $install_date );
		}
		hg_set_plugin_install_date( $date ? $date->format( 'U' ) : gmdate( 'U' ) );
	}
}

add_action( 'admin_init', 'hg_setup' );


function hg_install_date_filter( $install_date ) {
    return hg_get_plugin_install_date();
}
add_filter( 'nfd_install_date_filter', 'hg_install_date_filter' );