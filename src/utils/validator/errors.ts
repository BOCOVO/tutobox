/**
 * Throw exception for invalide step value
 */
export const InvalideStepError = ():void => {
    throw new Error("The data-step value must be numeric or end")
}

/**
 * Throw exception for no title,des or html 
 * attribute set
 */
export const DescriptionRequiredError = ():void => {
    throw new Error("You must set one of data-step-des or data-step-html")
}

/**
 * Throw exception for no title,des or html 
 * attribute set
 */
 export const EnableDisplayTuto = (tutoName:string):void => {
    throw new Error(`Cannot run tutoriel [${tutoName}]`)
}