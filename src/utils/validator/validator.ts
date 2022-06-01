import {InvalideStepError } from "./errors";
import isStep from "./isStep";


/**
 * check step
 */
export const checkStep = (value:string) => {
    if(!isStep(value)){
        InvalideStepError()
    }
}