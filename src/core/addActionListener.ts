
/**
 * This function defines a callback 
 * that leads to the next.
 * 
 * @param callback 
 * @param eventName 
 * @param element 
 */
const addActionListener = (callback: (event: any) => void,eventName: string,element:Element) => {
    element.addEventListener<any>(eventName, callback)
}

export default addActionListener