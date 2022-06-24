import { TutoBoxType } from "../../types/tutobox.type";
import onStep from "./onStep";
import retrieveTour from "./retrieveTour";

function startTour(this: TutoBoxType): void {

    const tuto = retrieveTour()
    if (tuto) {
        this.currentTuto = tuto
        this.currentStep = 0
        this.isTourRunning = true
        if(this.isWaitingForStep){
            delete this.isWaitingForStep
        }
        //start observing the DOM
        this._createObserver()
        onStep(this.currentTuto, this.currentStep, this._runCallback)
    } else {
        console.error("No tour found in the DOM")
    }
}

export default startTour
