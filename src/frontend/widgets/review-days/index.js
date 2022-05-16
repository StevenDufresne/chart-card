/**
 * WordPress dependencies
 */

import { Tooltip } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, info } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { AppContext, useAppContext } from './store/context';
import Actions from './actions';
import BaseControl from '../base-control';

const Widget = () => {
	const [ chartData, setChartData ] = useState( [] );
	const { startDate } = useAppContext();

	const mapData = ( data ) => {
		const arr = [];
		data.forEach( ( i ) => {
			arr.push( [
				i.ym,
				Number( parseFloat( i.average_days_to_review ).toFixed( 1 ) ),
			] );
		} );

		arr.reverse();
		setChartData( arr );
	};

	return (
		<BaseControl
			cardTitle={
				<Fragment>
					<div>{ __( 'Avg. Days to Review By Month', 'wporg' ) }</div>

					<Actions />
				</Fragment>
			}
			chartData={ chartData }
			chartHeadings={ [ 'Month', 'Avg. Days to Review' ] }
			cartOptions={ {
				legend: 'none',
			} }
			chartNotes={ [
				__(
					'Calculated using the first date of upload and publish date.',
					'wporg'
				),
				__(
					'Does not include themes that are never published.',
					'wporg'
				),
			] }
			url={ `themes/v1/review-stats/reviewDays?startDate=${ startDate }-01` }
			mapFunction={ mapData }
		/>
	);
};

export default () => (
	<AppContext>
		<Widget />
	</AppContext>
);
