import Tuto, { BubblesData } from "../../types/tuto.type"
import onStep from "../onStep"

/**
 * Raise step change event to tour 
 * create right bubbles data
 * 
 * @param tuto 
 * @param stepIndex 
 * @returns 
 */
const onStepTour = (tuto:Tuto,stepIndex:number,callback:Function) => {
    const bubbles:BubblesData = {
        count: tuto.steps.length,
        active: stepIndex
    }
    onStep(tuto,stepIndex,callback,bubbles)
}

export default onStepTour
