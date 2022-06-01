import { TutoBoxType } from "../../types/tutobox.type";
import onStep from "./onStep";

/**
 * Go to next tour
 * 
 * @param this 
 */
function nextTour(this: TutoBoxType) {
    if (this.currentTuto && this.currentStep != undefined) {
        this.currentStep = this.currentStep + 1
        onStep(this.currentTuto, this.currentStep,this.runCallback)
    }
}

export default nextTour
