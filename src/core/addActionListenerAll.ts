import { TutoStep } from "../types/tuto.type";
import querySelectorAll from "../utils/querySelectorAll";
import addActionListener from "./addActionListener";

/**
 * This function defines a callback 
 * that leads to the next step according 
 * to the `action` and `actionSelector` properties
 * of the current step.
 * @param step 
 * @param callback 
 * @param toNode if specified add listener directly on it
 */
const addActionListenerAll = (callback: (event: any) => void, step: TutoStep) => {
    if (step.action) {
        if (!step.actionSelector) {
            // action on same element
            addActionListener(callback,step.action,step.element)
        } else {
            const nodes: NodeListOf<Element> | null =
                querySelectorAll(step.actionSelector, step.element)
            if (nodes) {
                nodes.forEach(node => {
                    addActionListener(callback,step.action as string,node)
                })
            }
        }
    }
}

export default addActionListenerAll