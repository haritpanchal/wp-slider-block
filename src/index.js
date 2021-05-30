/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/wp-gutenbeg-slider', {
	/**
	 * @see ./edit.js
	 */
	title: __( 'WP Gutenberg Slider', 'repeater-block' ),

	icon: 'slides',
	attributes: {
		sliderArr: {
			type: 'array',
			source: 'query',
			default: [{index: 0 }],
			selector: '.slide_item',
			query: {
				index: {
					attribute: 'data-index',
					source: 'attribute',
					selector: '.slider_bg',
				},
				inner_title: {
					type: 'string',
					source: 'html',
					selector: '.block_inner--title'
				},
				src: {attribute: 'src', source: 'attribute', selector: '.slider_bg'},
				id: {attribute: 'data-id', source: 'attribute', selector: '.slider_bg'},
				alt: {attribute: 'alt', source: 'attribute', selector: '.slider_bg'},
			}
		},
		
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
