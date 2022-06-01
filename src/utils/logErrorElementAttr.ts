/**
 * Show an error with the element in console
 * @param error 
 * @param element 
 * @param tuto 
 */
const logErrorElementAttr = (error:any,element:HTMLElement,tuto?:string) => {
    console.group()
    console.error(error)
    console.log(`Error occured on this element${tuto? (",for tutorial["+tuto+"]:") :""}`,element)
    console.groupEnd()
}

export default logErrorElementAttr