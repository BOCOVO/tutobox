import { TutoStep } from "../types/tuto.type"
import castStep from "./castStep"
import getTutoValue from "./getTutoValue"

/**
 * Sort tutorial steps's
 * 
 * @param list 
 * @param tutoName 
 * @param parsed if the list is already parsed
 * @returns 
 */
const sortStep = (list: TutoStep[], tutoName: string, parsed: boolean = false) => {
    return [...list].sort((first, second) => {
        const firstStep = castStep(parsed ? first.step : getTutoValue(first.step, tutoName))
        const secondStep = castStep(parsed ? second.step : getTutoValue(second.step, tutoName))
        return firstStep - secondStep
    })
}

export default sortStep
