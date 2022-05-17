/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

registerBlockType( 'wporg-theme-review-stats/main', {
	title: __( 'Theme Review Stats', 'wporg' ),
	icon: 'info',
	category: 'widgets',
	attributes: {
		dataURL: {
			type: 'string',
			default: '',
		},
		title: {
			type: 'string',
			default: '',
		},
		notes: {
			type: 'string',
			default: '',
		},
		headings: {
			type: 'string',
			default: '',
		},
		chartType: {
			type: 'string',
			default: '',
		},
		chartOptions: {
			type: 'string',
		},
	},
	edit,
	save: () => null,
} );
