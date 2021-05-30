/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { 
        IconButton, 
        PanelBody, 
        PanelRow, 
        ColorPalette, 
        ColorPicker,    
} from '@wordpress/components';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	let attributes = props.attributes;
    let sliderArr = attributes.sliderArr;
    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }

	let sliderList = sliderArr.sort(function (a, b) {
        return a.index - b.index;
    }).map(function (item) {
        return [
            <div className='slider-element'>
                <div className='slider-head'>
                    <span>Slide# {Number(item.index) +1 }</span>
                    <IconButton icon='trash' className="slider-add" onClick= {()=>{
                            var newItem = sliderArr.filter(function (element) {
                                return element.index != item.index;
                            }).map(function (t) {
                                if (t.index > item.index) {
                                    t.index -= 1;
                                }
                                return t;
                            });
                            props.setAttributes({sliderArr: newItem});
                        }} >Delete Slide</IconButton> 
                </div>  
                <div>
                    <MediaUpload 
                        onSelect = { (media) => {
                                let newObject = Object.assign({}, item, {
                                    src: media.url,
                                    id: media.id,
                                    alt: media.alt
                                });
                                props.setAttributes({
                                    sliderArr: [].concat(_toConsumableArray(sliderArr.filter(function (element) {
                                        return element.index != item.index;
                                    })), [newObject])
                                });
                            }}
                        value= {item.id}
                        render =  {(obj) =>{
                            return !!item.src ? <div> 
                                <IconButton 
                                    icon = 'no'
                                    className= 'slider-add delete-slider'
                                    onClick = {() => {
                                        let newObject = Object.assign({}, item, {
                                            src: null,
                                            id: null,
                                            alt: null
                                        });
                                        props.setAttributes({
                                            sliderArr: [].concat(_toConsumableArray(sliderArr.filter(function (element) {
                                                return element.index != item.index;
                                            })), [newObject])
                                        });
                                }}> 
                                </IconButton>
                                <img className='inner_image' src={item.src} onClick={obj.open} />  
                            </div> :
                            <div>
                                <IconButton 
                                    icon = 'format-image'
                                    className= 'slider-add'
                                    onClick = {obj.open}> Add Slider Image
                                </IconButton>
                            </div>
                        }}
                        >
                    </MediaUpload>
                   
                    <RichText 
                        tagName = 'p'
                        placeholder = 'Enter Title'
                        value = { item.inner_title }
                        style = {{color: attributes.font_color, fontSize: attributes.font_size_title}}
                        onChange = {(inner_title)=>{
                            let newObject = Object.assign({}, item, {
                                inner_title: inner_title
                            });
                            props.setAttributes({
                                sliderArr: [].concat(_toConsumableArray(sliderArr.filter(function (element) {
                                    return element.index != item.index;
                                })), [newObject])
                            });
                        }}
                    />
                </div>
            </div>
        ];
    });

	return [
		<>
		<InspectorControls>
				<PanelBody title="Background Image Settings" initialOpen= { true }>
					{sliderList}
                    <div className="slider-add-btn">
                        <IconButton
                            icon ='plus'
                            className="slider-element-add"
                            onClick = { ()=> {return props.setAttributes({
                                sliderArr: [].concat(_toConsumableArray(attributes.sliderArr), [{
                                    index: attributes.sliderArr.length,
                                    inner_title:'',
                                }])
                            });}} >Add Slide
                        </IconButton>
				    </div>
				</PanelBody>
			</InspectorControls>

			<div className="slider-element-list">
				<div className='slider-element-listing'>
				{sliderList}
				</div>
				<div className="slider-add-btn">
					<IconButton
						icon ='plus'
						className="slider-element-add"
						onClick = { ()=> {return props.setAttributes({
							sliderArr: [].concat(_toConsumableArray(attributes.sliderArr), [{
								index: attributes.sliderArr.length,
								inner_title:'',
							}])
						});}} >Add Slide
					</IconButton>
				</div>
			</div>
		</>
	]
}
