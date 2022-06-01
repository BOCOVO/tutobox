import { TutoBoxType } from "../types/tutobox.type";

/**
 * Check if there is waitting to step
 * for a dynamic step tutorial
 * 
 * @param this 
 */
function handleWaitingForStep(this: TutoBoxType) {
    if (this.isWaitingForStep && this.currentTuto) {
        this.next()
    }
}

export default handleWaitingForStep