import { ParsedTutoStep, RawTutoStep } from "../types/tuto.type"
import { MultipleTutoValue } from "../types/utils.type"
import getAttr from "../utils/getAttr"
import parseMultitpleTutoValue from "../utils/parseMultipleTutoValue"
import validateElementSteps from "./validateElementStep"


/**
 * Fetch all TutoBox attributes on HTMLElement
 * 
 * @param {HTMLElement} element
 * @return {Tuto} 
 */
const fetchTutoboxAttr = (element: HTMLElement) => {

    const rawAttr: RawTutoStep = {
        stepTitle: getAttr(element,"data-step-title"),
        des: getAttr(element,"data-step-des"),
        html: getAttr(element,"data-step-html"),
        tuto: getAttr(element,"data-tuto"),
        step: getAttr(element,"data-step"),
        tutoTitle: getAttr(element,"data-tuto-title"),
        action: getAttr(element,"data-step-action"),
        actionSelector: getAttr(element,"data-action-selector"),
        headless: getAttr(element,"data-headless-step"),
        canStartForm: getAttr(element,"data-can-start-from") 
            || getAttr(element,"data-can-start") //alias
            || getAttr(element,"data-can-sf"), //alias
        dynamic: getAttr(element,"data-dynamic-steps") 
            ||getAttr(element,"data-dynamic-step"),//alias
        
    }

    if (rawAttr.tuto) {
        //check if element is use for multiple tuto
        const elementTutos = rawAttr.tuto.split("|")

        const eleTutosValue: ParsedTutoStep = {
            tuto: elementTutos,
            step:"" , 
            element: element
        }

        const { tuto, ...attrWithoutTuto } = rawAttr

        for (const k in attrWithoutTuto) {
            const attrKey = k as keyof RawTutoStep// needed for typescript
            if(rawAttr[attrKey]){
                (eleTutosValue[attrKey] as (string | MultipleTutoValue)) = parseMultitpleTutoValue(rawAttr[attrKey] as string, elementTutos) 
            }
        }
        // add element if is not headless step
        const isValideData = validateElementSteps(eleTutosValue,element)
        if(isValideData) return eleTutosValue
    }

    return false
}

export default fetchTutoboxAttr