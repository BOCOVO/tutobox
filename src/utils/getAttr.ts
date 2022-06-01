import { HTMLTutoAttr, HTMLTutoAttrAlias } from "../types/tuto.type";

/**
 * This function is juste a ponify for
 * `HTMLElement.getAttribute(qualifiedName)` function 
 * Use for typing qualifiedName
 */
const getAttr = (element:Element,qualifiedName:HTMLTutoAttrAlias|HTMLTutoAttr):string => {
    return element.getAttribute(qualifiedName)||""
}

export default getAttr