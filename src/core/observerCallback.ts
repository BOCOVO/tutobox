import { TutoBoxType } from "../types/tutobox.type";
import getAttr from "../utils/getAttr";
import addActionListener from "./addActionListener";

/**
 * Check if new tutorial step is added to DOM and update
 * the steps list.
 * This is the callback function of the observer.
 * 
 * @param mutations 
 * @param observer 
 */
function observerCallback(this: TutoBoxType, mutations: MutationRecord[]) {
    
    // created to avoid some repeatition
    const applyUpdate = (node:HTMLElement) => {
        const elementTutos = !!getAttr(node, "data-tuto") || !!node.querySelector("[data-tuto]")
        if (elementTutos) {
            // update tuto list
            this.patchUpdate()
            // handle step waiting
            this.handleWaitingForStep()
        }
    }

    for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
            if (!(addedNode instanceof HTMLElement)) continue;
            if (this.currentTuto
                && (this.currentStep !== undefined)
            ) {
                applyUpdate(addedNode)
                // check if the current step has action and actionSelector
                // then add listener if the added element matches the selector
                const step = this.currentTuto.steps[this.currentStep]
                if (step.action
                    && step.actionSelector
                    && addedNode.matches(step.actionSelector)
                ) {
                    addActionListener(this.actionNextStep, step.action, addedNode)
                }
            }
        }
        for (let removedNode of mutation.removedNodes) {
            if (!(removedNode instanceof HTMLElement)) continue;
            if (
                this.currentTuto
                && (this.currentStep !== undefined)
            ) {
                applyUpdate(removedNode)
            }
        }
    }
}


export default observerCallback