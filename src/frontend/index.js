/**
 * WordPress dependencies
 */
import { createElement, render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import App from './app';
import './styles.css';

const init = () => {
	const container = document.getElementById( 'wporg-theme-review-stats-js' );
	if ( ! container ) {
		return;
	}

	render( createElement( App ), container );
};

document.addEventListener( 'DOMContentLoaded', init ); // eslint-disable-line
