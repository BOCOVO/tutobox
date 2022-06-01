import Tuto, { TutoStep } from "../../types/tuto.type";
import { TutoBoxType } from "../../types/tutobox.type";
import getAttr from "../../utils/getAttr";
import onStep from "./onStep";

function startTour (this: TutoBoxType):void{

    const tourElements = document.querySelectorAll<HTMLElement>("[data-step-title]:not([data-tuto])")
    if(tourElements.length){
        let steps:TutoStep[] = []

        tourElements.forEach((element,index) => {
            steps.push({
                element,
                des:getAttr(element,"data-step-des"),
                html:getAttr(element,"data-step-html"),
                stepTitle: getAttr(element,"data-step-title"),
                step:String(index),
                tuto:"tour",
                headless: getAttr(element,"data-headless-step")
            })
        });

        const tuto: Tuto = {
           steps,
           name:"tour",
           dynamic:false
        }

        this.currentTuto = tuto
        this.currentStep = 0
        this.isTourRunning = true
        onStep(this.currentTuto,this.currentStep,this.runCallback)
    }
}

export default startTour
