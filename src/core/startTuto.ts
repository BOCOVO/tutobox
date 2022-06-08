import { EventData } from "../types/events.type";
import { TutoBoxType } from "../types/tutobox.type";
import retrieveTuto from "./retriveTuto";

/**
 * Start a tutorial
 * 
 * @api public
 * @method startTuto
 * @param name The name of the tutorial
 */

function startTuto(this: TutoBoxType, tutoName: string): boolean {
    // check if tutoName is string
    if(typeof tutoName !== "string"){
        throw new Error("The method startTuto must take a string.")
    }
    // fetch tuto
    const tuto = retrieveTuto(tutoName, this.options.extendsHelpers)
    if (!tuto) return false
    const eventData: EventData = {
        tutoName
    }
    this.isTourRunning = false
    this.currentTuto = tuto
    this.currentStep = -1
    //check if it is dynamic tuto
    if(tuto.dynamic){
        this.createObserver()
    } 
    this.runCallback("start-tuto", eventData)
    this.next()
    return true
}

export default startTuto