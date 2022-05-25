/**
 * WordPress dependencies
 */

import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { AppContext, useAppContext } from './store/context';
import Actions from './actions';
import BaseControl from './base-control';

const Block = ({ data }) => {
	const [chartData, setChartData] = useState([]);
	const { startDate } = useAppContext();
	const { title, url, headings, notes, type, options, isPrivate } = data;
    const _isPrivate = isPrivate === "true" ? true : false;

	const fullUrl = addQueryArgs(removeQueryArgs(url, 'startDate'), {
		startDate,
	});

	const hasPermission = useSelect(
		(select) => select(coreStore).canUser('create', 'posts'),
		[]
	);

	// If it's private only show the card for create capabilities
	// Otherwise let the api determine capabilities
	if (_isPrivate && !hasPermission) {
		return null;
	}

	return (
		<BaseControl
			cardTitle={
				<Fragment>
					<div>{title}</div>

					<Actions />
				</Fragment>
			}
			chartType={type}
			chartData={chartData}
			chartHeadings={headings.split(',')}
			chartOptions={options.trim().length ? JSON.parse(options) : {}}
			chartNotes={notes.trim().length ? notes.split(',') : []}
			url={fullUrl}
			mapFunction={setChartData}
		/>
	);
};

export default (props) => (
	<AppContext {...props}>
		<Block {...props} />
	</AppContext>
);
