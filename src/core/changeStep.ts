import { BubblesData } from "../types/tuto.type";
import { TutoBoxType } from "../types/tutobox.type";
import checkOrderedStep from "../utils/checkOrderedStep";
import addActionListenerAll from "./addActionListenerAll";
import onStep from "./onStep";


/**
 * Change the tuto step.
 * Perform navigation between tuto steps
 * 
 * @param prev for previous
 */
function changeStep(this: TutoBoxType, stepIndex: number, prev: boolean = false): void {
    // check if startTuto was called
    this._checkStartedTuto()
    if (this.currentTuto && this.currentStep !== undefined) { // unnecessary verification in done in checkStartedTuto
        // clean old listener
        this._cleanActionListener()

        const isDynamicTuto = this.currentTuto.dynamic

        const step = this.currentTuto.steps[stepIndex]

        if (step) {

            const ordered =
                this.isTourRunning || checkOrderedStep(
                    {
                        step,
                        isDynamicTuto,
                        prev,
                        currentStep: this.currentTuto.steps[this.currentStep]
                    }
                )

            if (isDynamicTuto && !ordered) {
                // wait for next step to be available
                // const intendedStep = Number(step.step) - 1
                this._startWaitingForNextStep(
                    {
                        runningTuto: this.currentTuto.name,
                        // tutoName: step.tuto,
                        // intendedStep,
                        direction: prev ? "prev" : "next"
                    }
                )
            } else {
                // check for waiting step
                if (this.isWaitingForStep) {
                    // remove isWaitingForStep if it exist
                    delete this.isWaitingForStep
                    this._runCallback("stop-waiting")
                }
                this.currentStep = stepIndex
                let bubbles: BubblesData | undefined
                if (!isDynamicTuto) {
                    // create bubbles 
                    bubbles = {
                        count: this.currentTuto.steps.length,
                        active: stepIndex
                    }
                }
                onStep(this.currentTuto, stepIndex,this._runCallback , bubbles)
                // handle action listener on element
                addActionListenerAll(this._actionNextStep, step)
            }
        }
        // stop tutorial if is non-dynamic tuto
        // or is dynamic tuto and the last tuto 
        // is the end
        else if (
            !isDynamicTuto
            || (this.currentTuto.steps[this.currentStep].step === "end")
        ) {
            this.stop()
        } else if (isDynamicTuto) {
            // start waiting for next step
            this._startWaitingForNextStep(
                {
                    runningTuto: this.currentTuto.name,
                    direction: prev ? "prev" : "next"
                }
            )
        }
    }
}

export default changeStep