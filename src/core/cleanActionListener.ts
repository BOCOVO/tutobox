import { TutoBoxType } from "../types/tutobox.type";
import querySelectorAll from "../utils/querySelectorAll";

/**
 * This function revoves all action listener added 
 * to handle `action` and `actionSlector` of the last step
 */
function cleanActionListener(this: TutoBoxType) {
    this.checkStartedTuto()
    if (this.currentTuto && this.currentStep !== undefined) { // unnecessary verification in done in checkStartedTuto
        const step = this.currentTuto.steps[this.currentStep]
        if (!step) return // step not found
        if (step.action) {
            if (!step.actionSelector) {
                // action on same element
                step.element.removeEventListener<any>(step.action, this.actionNextStep)
            } else {
                const nodes: NodeListOf<Element> | null =
                    querySelectorAll(step.actionSelector, step.element)
                if (nodes) {
                    nodes.forEach(node => {
                        node.removeEventListener<any>(step.action, this.actionNextStep)
                    })
                }
            }
        }
    }
}

export default cleanActionListener