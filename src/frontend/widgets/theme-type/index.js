/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BaseControl from '../base-control';

export default () => {
	const [ chartData, setChartData ] = useState( [] );

	const mapData = ( data ) => {
		const mapped = {};

		// Needs this ordered by date
		data = data.sort( ( a, b ) => {
			return new Date( a.publishedOn ) - new Date( b.publishedOn );
		} );

		data.forEach( ( i ) => {
			/**
			 * Do we have this month yet?
			 * We will skip empty months, the are not necessary
			 *
			 * */
			if ( ! mapped[ i.publishedOn ] ) {
				mapped[ i.publishedOn ] = {
					fse: 0,
					classic: 0,
				};
			}

			if ( i.tags?.indexOf( 'full-site-editing' ) >= 0 ) {
				mapped[ i.publishedOn ].fse++;
			} else {
				mapped[ i.publishedOn ].classic++;
			}
		} );

		let out = [];
		Object.keys( mapped ).forEach( ( key ) => {
			out.push( [ key, mapped[ key ].fse, mapped[ key ].classic ] );
		} );

		// Filter out anything before 2020
		// The volume is too low and uninteresting
		out = out.filter(
			( i ) => parseInt( i[ 0 ].substring( 0, 4 ) ) >= 2020
		);

		setChartData( out );
	};

	return (
		<BaseControl
			cardTitle={ __( 'Published: FSE vs Classic', 'wporg' ) }
			chartType="ColumnChart"
			chartData={ chartData }
			chartHeadings={ [ 'Month', 'FSE', 'Classic' ] }
			chartOptions={ {
				isStacked: true,
				vAxis: {
					title: 'Count',
				},
			} }
			chartNotes={ [
				__('Themes that contain tag full-site-editing are considered FSE themes.', 'wporg'),
				__('Chart only shows data after 2020 although is calculated using all historical data.','wporg'),
			] }
			url={ `themes/v1/review-stats?startDate=2001-01-01` }
			mapFunction={ mapData }
		/>
	);
};
