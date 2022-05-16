/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import BaseControl from '../base-control';

export default () => {
	const [ chartData, setChartData ] = useState( [] );

	const mapData = ( data ) => {
		const mapped = {};
		const exists = {};

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
					segment1: 0,
					segment2: 0,
					segment3: 0,
				};
			}

			// Has the author already published a theme?
			if ( exists[ i.postAuthor ] ) {
				// It's at least one, so check if it's in the last segment
				if ( exists[ i.postAuthor ] > 5 ) {
					mapped[ i.publishedOn ].segment3++;
				} else {
					mapped[ i.publishedOn ].segment2++;
				}

				exists[ i.postAuthor ]++;
			} else {
				exists[ i.postAuthor ] = 1;
				mapped[ i.publishedOn ].segment1++;
			}
		} );

		let out = [];
		Object.keys( mapped ).forEach( ( key ) => {
			out.push( [
				key,
				mapped[ key ].segment1,
				mapped[ key ].segment2,
				mapped[ key ].segment3,
			] );
		} );

		// Filter out anything before 2018
		// The volume is too low and uninteresting
		out = out.filter(
			( i ) => parseInt( i[ 0 ].substring( 0, 4 ) ) >= 2018
		);

		setChartData( out );
	};

	return (
		<BaseControl
			cardTitle={ __( 'Published by Segment', 'wporg' ) }
			chartType="ColumnChart"
			chartData={ chartData }
			chartHeadings={ [ 'Month', '1', '2 - 5', '5+' ] }
			chartOptions={ {
				isStacked: true,
				vAxis: {
					title: 'Count',
				},
			} }
			chartNotes={ [
				__('Groups authors based on how many published themes they have at the time of upload.', 'wporg'),
				__('Chart only shows data after 2018 although is calculated using all historical data.','wporg'),
			] }
			url={ `themes/v1/review-stats?startDate=2007-01-01` }
			mapFunction={ mapData }
		/>
	);
};
