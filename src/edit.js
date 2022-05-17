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

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Data Settings' ) }>
					<TextControl
						label={ __( 'URL', 'wporg' ) }
						help={ __( 'The relative endpoint that returns google charts data.', 'wporg' ) }
						value={ dataURL }
						onChange={ onURLChange }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Chart Settings' ) }>
					<SelectControl
						label="Google Chart Type"
						onChange={ onTypeChange }
						value={ chartType }
						options={ [
							{
								label: __( 'Select an option', 'wporg' ),
								value: '',
							},
							{
								label: 'LineChart',
								value: 'LineChart',
							},
							{
								label: 'ColumnChart',
								value: 'ColumnChart',
							},
						] }
					/>
					<TextareaControl
						label={ __( 'Headings', 'wporg' ) }
						help={ __( 'Comma separated list', 'wporg' ) }
						value={ headings }
						onChange={ onHeadingsChange }
					/>

					<TextareaControl
						label={ __( 'Options', 'wporg' ) }
						value={ chartOptions }
						help={ __( 'Valid JSON object', 'wporg' ) }
						onChange={ onOptionsChange }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Card Settings' ) }>
					<TextControl
						label={ __( 'Title', 'wporg' ) }
						value={ title }
						onChange={ onTitleChange }
					/>

					<TextareaControl
						label="Notes"
						value={ notes }
						help={ __( 'Comma separated list.', 'wporg' ) }
						onChange={ onNotesChange }
                        z
					/>
				</PanelBody>
			</InspectorControls>
			<Placeholder
				icon={chartBar}
                instructions={ dataURL.length ? dataURL : __( 'Fill in details in the sidebar.', 'wporg' ) }
				label={ title.length ? title : __( 'Stats Widget', 'wporg' ) }
			/>
		</>
	);
};
export default EditView;
