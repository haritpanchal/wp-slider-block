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
import { RichText, useBlockProps } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	let attributes = props.attributes;
    let sliderArr = attributes.sliderArr;
    let sliderList = sliderArr.map(function (item) {
            return <div className='slide_item'>
				<div>
					<RichText.Content
						tagName= 'div'
						className = "slider_bg"
						alt= {item.alt}
						src= {item.src}
						data-index = {item.index}
						data-id = {item.id}
						style= {{
							backgroundImage : `url(${ item.src ? item.src : '' })`,
							backgroundSize : 'auto',
							backgroundPosition : 'center',
							backgroundRepeat : 'no-repeat',
							height: '500px',
							position:'relative',
						}}
					/>
					  <RichText.Content 
							tagName = 'h2'
							className="block_inner--title"
							value = {item.inner_title}
							style = {{color:attributes.font_color, fontSize: attributes.font_size_title}}
						/>
				</div>
            </div> 
        });

	let dots = sliderArr.map(function ( cuttent_val, item ) {
		return <span class="wp_dot" slider-index={item+1}></span>
	})
 	
    return <section className='rep-block' data-length={sliderArr.length}>
        <div className="container" >
                {sliderList}
				<a class="prev" onClick="plusSlides(-1)">&#10094;</a>
				<a class="next" onClick="plusSlides(1)">&#10095;</a>
				<div style="text-align:center">
					{dots}
				</div>
        </div>
    </section>
	
}
