/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';

registerBlockType( 'wporg-theme-review-stats/main', {
	title: 'Theme Review Stats',
	icon: 'info',
	category: 'widgets',
	attributes: {},
	edit,
	save: () => null,
} );
