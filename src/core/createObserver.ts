import { TutoBoxType } from "../types/tutobox.type";

/**
 * 
 * Create a MutationObserver object that is used 
 * to observe change in DOM. 
 * This is needed for dynamic tutorials
 * 
 * @param this 
 * @param callback 
 */

function createObserver(this: TutoBoxType, callback: MutationCallback) {

    if(this.currentObserver){
        this.currentObserver.disconnect()
        delete this.currentObserver
    }
    const observer = new MutationObserver(callback)
    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
    this.currentObserver = observer
}

export default createObserver