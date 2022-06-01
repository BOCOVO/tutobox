import Tuto from "../types/tuto.type";



const isLastStep = (tuto: Tuto, index: number) => {
    return (
        !tuto.steps[index + 1]
        && (
            !tuto.dynamic
            || isLastStepForDynamicTuto(tuto,index)
        )
    )
}

const isLastStepForDynamicTuto = (tuto: Tuto, index: number) => {
    return (
        // it is end for dynamic tuto when the last 
        // tuto have the same tutoName with tuto user had
        // run, and if the step step value is end
        tuto.name === tuto.steps[index]?.tuto
        && tuto.steps[index]?.step === "end"
        )
}

export default isLastStep