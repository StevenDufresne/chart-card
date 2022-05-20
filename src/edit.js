/**
 * WordPress dependencies
 */
import {
	SelectControl,
	TextControl,
	TextareaControl,
	PanelBody,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { chartBar } from '@wordpress/icons';

const EditView = ( { attributes, setAttributes } ) => {
	const {
		headings,
		dataURL,
		notes,
		title,
		chartType,
		chartOptions,
	} = attributes;

	function onURLChange( newValue ) {
		setAttributes( { dataURL: newValue } );
	}

	function onNotesChange( newValue ) {
		setAttributes( { notes: newValue } );
	}

	function onTitleChange( newValue ) {
		setAttributes( { title: newValue } );
	}

	function onHeadingsChange( newValue ) {
		setAttributes( { headings: newValue } );
	}

	function onTypeChange( newValue ) {
		setAttributes( { chartType: newValue } );
	}

	function onOptionsChange( newValue ) {
		// TODO try JSON parse to validate.
		setAttributes( { chartOptions: newValue } );
	}

	const chartTypes = [
		'LineChart',
		'ColumnChart',
		'Histogram',
		'PieChart',
		'ScatterChart',
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Chart' ) }>
					<TextControl
						label={ __( 'Title', 'wporg-block' ) }
						value={ title }
						onChange={ onTitleChange }
					/>
					<SelectControl
						label="Chart Type"
						onChange={ onTypeChange }
						value={ chartType }
						options={ [
							...[
								{
									label: __( 'Select an option', 'wporg-block' ),
									value: '',
								},
							],
							...chartTypes.map( ( type ) => {
								return { label: type, value: type };
							} ),
						] }
					/>
					<TextareaControl
						label={ __( 'Options (Optional)', 'wporg-block' ) }
						value={ chartOptions }
						help={ __( 'Valid JSON object', 'wporg-block' ) }
						onChange={ onOptionsChange }
					/>
					<TextareaControl
						label="Notes (Optional)"
						value={ notes }
						help={ __( 'Comma separated list.', 'wporg-block' ) }
						onChange={ onNotesChange }
						z
					/>
				</PanelBody>
				<PanelBody title={ __( 'Data Settings' ) }>
					<TextControl
						label={ __( 'URL', 'wporg-block' ) }
						help={ __(
							'The relative endpoint that returns google charts data.',
							'wporg'
						) }
						value={ dataURL }
						onChange={ onURLChange }
					/>
					<TextareaControl
						label={ __( 'Headings', 'wporg-block' ) }
						help={ __( 'Comma separated list', 'wporg-block' ) }
						value={ headings }
						onChange={ onHeadingsChange }
					/>
				</PanelBody>
			</InspectorControls>
			<Placeholder
				icon={ chartBar }
				label={ title.length ? title : __( 'Stats Widget', 'wporg-block' ) }
			>
				<p>
					{ dataURL.length
						? dataURL
						: __( 'Fill in details in the sidebar.', 'wporg-block' ) }
				</p>
			</Placeholder>
		</>
	);
};
export default EditView;
