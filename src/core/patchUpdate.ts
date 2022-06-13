import { TutoStep } from "../types/tuto.type";
import { TutoBoxType } from "../types/tutobox.type";
import sortStep from "../utils/sortStep";
import refreshStep from "./refreshStep";
import { retrieveTutoNoError } from "./retriveTuto";
import retrieveTour from "./tour/retrieveTour";

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
        const refreshedTuto = (this.isTourRunning
            ? retrieveTour()
            : retrieveTutoNoError(tutoName, this.options.extendsHelpers))
        if (refreshedTuto) {

            const merge = [...refreshedTuto.steps,...this.currentTuto.steps]
            // remove double
            let filteredSorted = merge.filter(
                (currentStep, currentStepIndex) => {
                    const indexInList = merge.findIndex(
                        (findIndexStep) =>isSameStep(findIndexStep,currentStep)
                    )
                    return indexInList === currentStepIndex
                }
            )
            filteredSorted = sortStep(filteredSorted,this.currentTuto.name)
            
            refreshedTuto.steps = filteredSorted
            
            const stepIndexInNewData = !currentStepData
                ? -1 // if currentStepData is falsy dont need to to find the step index
                : refreshedTuto.steps.findIndex(step => isSameStep(step, currentStepData))

            // used to handle accidental remove
            refreshedTuto.dynamic = this.currentTuto.dynamic
            // update tuto
            this.currentTuto = refreshedTuto
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

            if (stepIndexInNewData === -1 || !this.currentTuto.steps[this.currentStep].element.isConnected) {
                this._handleAccidentalRemove()
            } else {
                // refresh only if the element is still in DOM
                refreshStep(this.currentTuto, this.currentStep, this._runCallback)
            }
        } else {
            // TODO : log warning
        }
    }
}

const isSameStep = (first: TutoStep, second: TutoStep) => {
    return (
        first.stepTitle === second.stepTitle
        && first.step === second.step
        && first.tuto === second.tuto
        && first.html === second.html
        && first.des === second.des
    )
}

export default patchUpdate