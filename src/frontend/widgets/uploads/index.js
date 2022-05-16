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
		const exists = new Set();

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
					new: 0,
					returning: 0,
				};
			}

			// Has the author already published a theme?
			if ( exists.has( i.postAuthor ) ) {
				mapped[ i.publishedOn ].returning++;
			} else {
				exists.add( i.postAuthor );
				mapped[ i.publishedOn ].new++;
			}
		} );

		let out = [];
		Object.keys( mapped ).forEach( ( key ) => {
			const total = mapped[ key ].new + mapped[ key ].returning;
			out.push( [
				key,
				mapped[ key ].new,
				mapped[ key ].returning,
				total,
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
			cardTitle={ __( 'Published: New vs Returning', 'wporg' ) }
			chartData={ chartData }
			chartHeadings={ [ 'Month', 'New', 'Returning', 'Total' ] }
			chartOptions={ {
				isStacked: true,
				vAxis: {
					title: 'Count',
				},
			} }
			chartNotes={ [
				'Chart only shows data after 2018 although is calculated using all historical data.',
			] }
			url={ `themes/v1/review-stats?startDate=2001-01-01` }
			mapFunction={ mapData }
		/>
	);
};
