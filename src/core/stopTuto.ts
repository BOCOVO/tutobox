import { TutoBoxType } from "../types/tutobox.type";

/**
 * Stop the running tuto
 * @api
 * @method
 * 
 */
function stopTuto(this: TutoBoxType){
    // remove 
    if(!this.currentTuto){
        throw new Error("Enable to stop tuto because no tuto was started");
    }
    const tutoName = this.currentTuto.name
    this.runCallback("beforeStopTuto",{
        tutoName
    })

    if(!this.isTourRunning)this.cleanActionListener()
   
    // delete ressourses
    delete this.currentTuto
    delete this.currentStep
    delete this.isTourRunning

    if(!this.isTourRunning && this.currentObserver){
        this.currentObserver.disconnect()
        delete this.currentObserver
    }

    this.runCallback("afterStopTuto",{
        tutoName
    })
}
export default stopTuto