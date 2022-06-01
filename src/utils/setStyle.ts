import { StyleProperties } from "../types/elementAttribute.type";

/**
 * set style to element 
 * 
 * @param {HTMLElement} element
 * @param {StyleProperties} style
 */

function setStyle (element: HTMLElement , style:StyleProperties) {
    Object.assign(element.style,style)
}

export default setStyle
