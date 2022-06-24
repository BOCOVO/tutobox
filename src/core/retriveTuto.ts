import { ExtendsHelper } from "../types/extendsHelper.type"
import Tuto, { ParsedTutoStep, TutoStep } from "../types/tuto.type"
import { MultipleTutoValue } from "../types/utils.type"
import getTutoValue from "../utils/getTutoValue"
import sortStep from "../utils/sortStep"
import { EnableDisplayTuto } from "../utils/validator/errors"
import fetchTutoboxAttr from "./fetchTutoStepAttr"


/**
 * This function find all tuto's step 
 * 
 * @param tutoName the name of tutorial to retrieve
 * @param extendsHelpers the list of entendsHelper
 * @param noError If throw error when the tuto cant start.
 * @returns tutos 
 */
function retrieveTuto(tutoName: string, extendsHelpers: ExtendsHelper[] = []): Tuto | false {
    return _retrieveTuto(tutoName, extendsHelpers)
}

export function retrieveTutoNoError(tutoName: string, extendsHelpers: ExtendsHelper[] = []): Tuto | false {
    return _retrieveTuto(tutoName, extendsHelpers,true)
}

/**
 * 
 * @param tutoName the name of tutorial to retrieve
 * @param extendsHelpers the list of entendsHelper
 * @param parentResolving this parameter exists juste to knoow in the script running if it
 * is the resolution of inherited parent. In order to handle the exceptions that will be
 * encountered, because they must not stop script running
 * @returns tutos
 */
function _retrieveTuto(tutoName: string, extendsHelpers: ExtendsHelper[], noError?: boolean, parentResolving?: Boolean): Tuto | false {
    let isDynamicTuto: boolean = false
    let canStartTuto: boolean = false

    let tutoStepList: TutoStep[] = []
    // getting tuto-box elements
    const elements = document.querySelectorAll(`[data-tuto=${tutoName}],[data-tuto*='|${tutoName}|'],[data-tuto$='|${tutoName}'],[data-tuto^='${tutoName}|']`)
    elements.forEach(element => {

        const tutoStepData = fetchTutoboxAttr(element as HTMLElement)

        if (tutoStepData) {
            // check has dynamic attribute
            const dynamicAttr = tutoStepData.dynamic
                ? getTutoValue(tutoStepData.dynamic, tutoName)
                : false
            if (dynamicAttr) isDynamicTuto = true

            // ckeck if can start tutoriel
            // tutorial can start if the step 1 is found 
            // or if there is a step with canStartFrom value
            const stepPosition = getTutoValue(tutoStepData.step, tutoName)
            if (parseInt(stepPosition) === 1) {
                canStartTuto = true
            } else if (tutoStepData.canStartForm) {
                // search for canStartFrom
                canStartTuto = !!getTutoValue(tutoStepData.canStartForm, tutoName)
            }

            tutoStepList.push(getUsableStepData(tutoStepData, tutoName))
        }
    })

    // handle extending tuto
    let parentTuto: Tuto | false = false
    const extendsHelper = extendsHelpers?.find(item => item.tutoName === tutoName)
   
    if (extendsHelper && extendsHelper.extendsTuto) {
        parentTuto = _retrieveTuto(extendsHelper.extendsTuto, extendsHelpers, noError, true)
    }
    if (!noError) {
        if (!canStartTuto && !parentTuto) {
            if (parentResolving) {
                console.group()
                console.warn(`Tutorial ${tutoName} cannot be started. It lacks the beginning step.`)
                console.log("You can ignore this warning if your tuto is dynamic.")
                console.groupEnd()
            }
            else EnableDisplayTuto(tutoName)
            return false
        }
    }

    // sort step
    tutoStepList = sortStep(tutoStepList,tutoName)

    //create tuto object
    const tuto: Tuto = {
        dynamic: isDynamicTuto,
        name: tutoName,
        steps: parentTuto
            ? [...parentTuto.steps, ...tutoStepList]
            : tutoStepList,
        includes: parentTuto
            ? [...(parentTuto?.includes || []), tutoName]
            : [tutoName],
    }

    return tuto
}

const getUsableStepData = (step: ParsedTutoStep, tutoName: string): TutoStep => {

    const tutoStep = { ...step }
    for (const key in tutoStep) {
        const k = key as keyof ParsedTutoStep
        if (k !== "element"
            && tutoStep[k]
            && (typeof tutoStep[k] !== "string")
        ) {
            if (k === 'tuto') {
                tutoStep[k] = tutoName
            } else {
                tutoStep[k] = (tutoStep[k] as MultipleTutoValue)[tutoName]
                    || (tutoStep[k] as MultipleTutoValue)["default"]
            }
        }
    }
    return tutoStep as TutoStep
}

export default retrieveTuto