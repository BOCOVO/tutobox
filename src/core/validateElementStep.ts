import { RawTutoStep } from "../types/tuto.type";
import { AnyIndexObject } from "../types/utils.type";
import logErrorElementAttr from "../utils/logErrorElementAttr";
import { DescriptionRequiredError, InvalideStepError } from "../utils/validator/errors";
import { checkStep } from "../utils/validator/validator";

type StepData = {
    [key in keyof RawTutoStep]: string | AnyIndexObject
}

const hasCustomStepValue = (stepsData: StepData, attribute: keyof RawTutoStep, currentTuto: string) => {
    return !!(typeof stepsData[attribute] === "object"
        ? ((stepsData[attribute] as AnyIndexObject)[currentTuto])
        : (stepsData[attribute]))
}

const getDefaultValue = (index: keyof RawTutoStep, stepsData: StepData): string => {
    let defaultValue: string = ""
    if (typeof stepsData[index] === "string") defaultValue = stepsData[index] as string
    else if (typeof stepsData[index] === "object") {
        defaultValue = (stepsData[index] as AnyIndexObject)["default"]
    }
    return defaultValue
}

/**
 * Check if the step is valide step
 */
const validateElementSteps = (stepsData: StepData, element: HTMLElement) => {
    // check default step value
    let defaultStep: string = getDefaultValue("step", stepsData)
    //check if defaultStep is valide
    try {
        checkStep(defaultStep)
    } catch (error) {
        defaultStep = "" // set as falsy
        //logErrorElementAttr(error, element)
    }

    // check if title|des|html exit
    const hasDefaultStepTitle = getDefaultValue("stepTitle", stepsData)
    const hasDefaultStepDes = getDefaultValue("des", stepsData)
    const hasDefaultStepHtlm = getDefaultValue("html", stepsData)

    const noDefaultText = !hasDefaultStepDes
        && !hasDefaultStepHtlm
        && !hasDefaultStepTitle

    if ((stepsData.tuto as string[]).length > 1) {
        // use for mutiple tutorial
        for (const currentTuto of (stepsData.tuto as string[])) {
            //ckeck custom step
            if ((stepsData.step as AnyIndexObject)[currentTuto]) {
                try {
                    checkStep((stepsData.step as AnyIndexObject)[currentTuto])
                } catch (error) {
                    if (!defaultStep) {
                        logErrorElementAttr(error, element, currentTuto)
                        return false
                    }
                }
            } else if (!defaultStep) {
                // step is not defined force show error
                try {
                    InvalideStepError()
                } catch (error) {
                    logErrorElementAttr(error, element, currentTuto)
                }
                return false
            }

            //check if one of des,step title or html attr is set
            const hasCustomStepTitle = hasCustomStepValue(stepsData, "stepTitle", currentTuto)
            const hasCustomStepHtml = hasCustomStepValue(stepsData, "html", currentTuto)
            const hasCustomStepDes = hasCustomStepValue(stepsData, "des", currentTuto)
            
            const noCustomText = !hasCustomStepTitle
                    && !hasCustomStepHtml
                    && !hasCustomStepDes
            
            if (noCustomText && noDefaultText) {
                try {
                    DescriptionRequiredError()// force show error
                } catch (error) {
                    logErrorElementAttr(error, element, currentTuto)
                    return false
                }
            }
        }
    } else if (!defaultStep || noDefaultText) {
        try {
            if (!defaultStep) InvalideStepError() // force show error
            else DescriptionRequiredError() // force show error
        } catch (error) {
            logErrorElementAttr(error, element)
        }
        return false
    }

    return true
}

export default validateElementSteps