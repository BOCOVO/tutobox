import Tuto, { TutoStep } from "../../types/tuto.type";
import getAttr from "../../utils/getAttr";

/**
 * retrieve tours in DOM
 * @returns 
 */

const retrieveTour = (): Tuto | void => {
    const tourElements = document.querySelectorAll<HTMLElement>("[data-step-title]:not([data-tuto])")
    if (tourElements.length) {
        let steps: TutoStep[] = []

        tourElements.forEach((element, index) => {
            steps.push({
                element,
                des: getAttr(element, "data-step-des"),
                html: getAttr(element, "data-step-html"),
                stepTitle: getAttr(element, "data-step-title"),
                step: String(index),
                tuto: "tour",
                headless: getAttr(element, "data-headless-step")
            })
        });
        return {
            steps,
            name: "tour",
            dynamic: false
        } as Tuto
    }
}

export default retrieveTour
