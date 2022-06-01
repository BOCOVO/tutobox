import Tuto, { BubblesData } from "../types/tuto.type"
import checkLastStep from "../utils/isLastStep"

/**
 * Raise step change event
 * @param tuto 
 * @param stepIndex 
 * @returns 
 */
const onStep = (tuto:Tuto,stepIndex:number,callback:Function,bubbles?:BubblesData) => {
    const isLastStep = checkLastStep(tuto, stepIndex)
    //emit event
    const eventData = {
        tutoName: tuto.name,
        step: stepIndex,
        stepData: tuto.steps[stepIndex],
        next: !!tuto.steps[stepIndex + 1],
        prev: !!tuto.steps[stepIndex - 1],
        end: isLastStep,
        bubbles
    }
    callback("step-change",eventData)
}

export default onStep
