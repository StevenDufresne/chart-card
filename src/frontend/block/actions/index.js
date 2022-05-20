/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { useAppContext } from '../store/context';
import { __ } from '@wordpress/i18n';

export default () => {
	const { startDate, setStartDate } = useAppContext();
	return (
		<div className="wporg-chart-block__actions">
			<label htmlFor="startDate">{ __( 'From:', 'wporg-block' ) }</label>
			<input
				type="date"
				id="startDate"
				value={ startDate }
				onChange={ ( event ) => setStartDate( event.target.value ) }
			/>
		</div>
	);
};
