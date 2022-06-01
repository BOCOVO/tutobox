import { TutoStep } from "../types/tuto.type"

/**
 * 
 * @param param0 {
 *   step: data of step to show,
 *   currentStep: current step data,
 *   isDynamicTuto: flag for dynamic tuto,
 *   prev: if it is previous action
 * }
 * @returns 
 */
const checkOrderedStep = (
    {
        step,
        currentStep,
        isDynamicTuto,
        prev,
        //showWarn = true
    }: { step?: TutoStep, currentStep?: TutoStep, isDynamicTuto: boolean, prev: boolean, showWarn?: boolean }
) => {
    const currentStepValue = currentStep?.step
    let nextStepValue = step?.step

    // handle end case
    if (nextStepValue === "end" || currentStepValue==="end") return true

        let ordered: boolean = true
    if (step && currentStepValue && nextStepValue) {
        // check if the step is in same tuto
        const sameTuto = currentStep.tuto === step.tuto

        if (sameTuto) {
            // check order
            ordered = Number(nextStepValue) - Number(currentStepValue) === (prev ? -1 : 1)
            if (
                !ordered
                && !isDynamicTuto
                //&& showWarn
            ) {
                console.warn(`A non-dynamic tutorial should always have steps ordered from 1 to any number. The tutorial [${step.tuto}] steps in not ordered, near step [${nextStepValue}]`)
            }
        } else if (isDynamicTuto && step.step != "1") {
            ordered = false
        } else if (
            !prev
            && !isDynamicTuto
            && step.step != "1"
            && !step.canStartForm
            //&& showWarn
        ) {
            // if not same tuto the next tuto
            // must start from step 1
            console.warn(`A non-dynamic tutorial should always start with step 1. This warning is found on tutorial [${step.tuto}]`)
            //ordered = false
        }
    }
    return ordered
}
export default checkOrderedStep