import { TutoBoxType } from "../types/tutobox.type";
import refreshStep from "./refreshStep";
import retrieveTuto from "./retriveTuto";

/**
 * Places a step in the step list of the
 * running tutorial.
 * 
 * @param this 
 */
function patchUpdate(this: TutoBoxType) {
    if (this.currentTuto && this.currentStep !== undefined) {
        const tutoName = this.currentTuto.name
        const currentStepIndex = this.currentStep

        const currentStepData = this.currentTuto.steps[currentStepIndex]

        // TODO: fetch step data on the element
        // and add it on the right place on tuto step list
        // this avoid call retrieveTuto function that 
        // can be expensive

        // get updated tuto data
        const tuto = retrieveTuto(tutoName, this.options.extendsHelpers)
        if (tuto) {
            const stepIndexInNewData = !currentStepData
                ? -1 // if currentStepData is falsy dont need to to find the step index
                : tuto.steps.findIndex(step => {

                    return step.stepTitle === currentStepData.stepTitle
                        && step.step === currentStepData.step
                        && step.tuto === currentStepData.tuto
                        && step.html === currentStepData.html
                        && step.des === currentStepData.des
                        && step.tutoTitle === currentStepData.tutoTitle
                })

            // update tuto
            this.currentTuto = tuto
            if (~stepIndexInNewData
                // Maybe while running this function 
                // the user moved to another step.
                // check if active tuto or step has changed
                && tutoName === this.currentTuto.name
                && currentStepIndex === this.currentStep
                && stepIndexInNewData !== this.currentStep
            ) {
                // update step index
                this.currentStep = stepIndexInNewData
            }
            refreshStep(this.currentTuto, this.currentStep,this.runCallback)
        } else {
            // TODO : log warning
        }
    }
}

export default patchUpdate