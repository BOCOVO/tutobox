import { WaintingForStepDirection } from "../types/events.type"
import { TutoBoxType } from "../types/tutobox.type"

/**
 * Set necessary proprety for step waiting
 * 
 * @param runningTuto 
 * @param tutoName 
 * @param intendedStep 
 */
function startWaitingForNextStep(
    this: TutoBoxType,
    {
        runningTuto,
        //tutoName,
        //intendedStep,
        direction
    }: { runningTuto: string, direction: WaintingForStepDirection, /*tutoName?: string, intendedStep?: number, */ }
) {
    console.info('Waiting for next step to be available.')
    // TODO: stratTime should be use to set maxWaiting property
    // in next update
    this.isWaitingForStep = {
        tuto: runningTuto,
        direction: direction
    }
    this._runCallback("start-waiting")
}
export default startWaitingForNextStep