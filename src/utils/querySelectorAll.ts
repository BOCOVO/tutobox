/**
 * Selet element in DOM and shows a more 
 * understandable error if a bad selector is provided
 * 
 * @param selector 
 * @param element 
 * @returns 
 */
const querySelectorAll = (selector: string,element:Element) => {
    let nodes: NodeListOf<Element> | null = null
    try {
        nodes = document.querySelectorAll(selector)
    } catch (error) {
        console.group()
        console.log(error)
        console.error("This error above means you provided a badly constituted selector for data-action-selector attribute . The error is encountered on this element 👇")
        console.log(element)
        console.groupEnd()
    }
    return nodes
}

export default querySelectorAll