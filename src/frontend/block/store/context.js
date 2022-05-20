/**
 * WordPress dependencies
 */
import { createContext, useContext, useState } from '@wordpress/element';
import { getQueryArg } from "@wordpress/url";

const StateContext = createContext();

const getDate = ( dateObj, subtract = 0 ) => {
	const month = dateObj.getUTCMonth() + 1;
	const paddedMonth = month < 10 ? `0${ month }` : month;
	const year = dateObj.getUTCFullYear() - subtract;
    const day = dateObj.getUTCDate();
    const paddedDay = day < 10 ? `0${ day }` : day;

	return `${year}-${paddedMonth}-${paddedDay}`;
};

export function AppContext( { data, children } ) {
    const qStartDate = getQueryArg(data.url, 'startDate');

    // If a startDate was added to the url, use that.
    let initDate = qStartDate ? qStartDate : getDate( new Date(), 2 );
	const [ startDate, setStartDate ] = useState( initDate );

	return (
		<StateContext.Provider
			value={ {
				startDate,
				setStartDate,
			} }
		>
			{ children }
		</StateContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext( StateContext );

	if ( context === undefined ) {
		throw new Error( 'useAppContext must be used within a Provider' );
	}

	return context;
}
