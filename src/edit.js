/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';

const EditView = () => (
	<Placeholder
		icon="info"
		label={ __( 'Placeholder for frontend', 'wporg' ) }
	/>
);
export default EditView;
