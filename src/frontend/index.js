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
	const containers = document.querySelectorAll( '.wporg-theme-review-stats-js' );

	if ( ! containers.length ) {
		return;
	}

    // We may have multiple charts on the same page
    containers.forEach( container => {
        render( createElement( App, { data: container.dataset }  ), container );
    })	
};

document.addEventListener( 'DOMContentLoaded', init ); // eslint-disable-line
