import { TutoBoxType } from "../types/tutobox.type";
import isLastStep from "../utils/isLastStep"

/**
 * There is `accidental remove` when the step's Node is
 * removed from the DOM, while the step is showing
 */

function handleAccidentalRemove(this: TutoBoxType) {
    if (this.isWaitingForStep) return
    if (this.currentTuto && this.currentStep != undefined && ~this.currentStep) {
        console.warn("The element on which the stage being displayed is removed from the DOM, this is not expected behavior. It is possible that TutoBox decides to stop the tutorial.")
        // close the tutoriel when it is the last step
        // or non dynamic tuto
        if (!this.currentTuto.dynamic || isLastStep(this.currentTuto, this.currentStep)) {
            this.stop()
        } else {
            // got to the next step if the tutorial is ordered
            this.next()
            if (this.isWaitingForStep) {
                this._runCallback("accidental-remove", {
                    tutoName: this.currentTuto.name,
                })
            }
        }
    }

}

export default handleAccidentalRemove