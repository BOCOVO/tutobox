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

    if(!this.isTourRunning)this._cleanActionListener()
   
    // delete ressourses
    delete this.currentTuto
    delete this.currentStep
    delete this.isTourRunning

    if(!this.isTourRunning && this.currentObserver){
        this.currentObserver.disconnect()
        delete this.currentObserver
    }

    this._runCallback("stop-tuto",{
        tutoName
    })
}
export default stopTuto