import retrieveTuto from "../../src/core/retriveTuto"

const fakeSimpleStep = (stp:string,tuto:string) => {
    const step = document.createElement("div")
    step.setAttribute("data-step-title", `Tuto step ${stp} title`)
    step.setAttribute("data-step-des", `Step ${stp} description`)
    step.setAttribute("data-step-html", "<div></div>")
    step.setAttribute("data-tuto", tuto)
    step.setAttribute("data-step", stp)
    step.setAttribute("data-tuto-tile", "Start tuto")
    document.body.appendChild(step)
}

const fakeComplexeStep = (stp:string,tuto:string,canStartForm:boolean=false) => {
    const step = document.createElement("div")
    step.setAttribute("data-step-title", `Tuto step ${stp} title`)
    step.setAttribute("data-step-des", `Step ${stp} description`)
    step.setAttribute("data-step-html", "<div></div>")
    step.setAttribute("data-tuto", `else|${tuto}`)
    step.setAttribute("data-step", `else:4 ${tuto}:${stp}`)
    step.setAttribute("data-tuto-tile", "Start tuto")
    if(canStartForm){
        step.setAttribute("data-can-start-from","true")
    }
    document.body.appendChild(step)
}

describe("Find tutorial data",()=>{
    test("sould find all tuto step",()=>{
        fakeSimpleStep("2","starter")
        fakeSimpleStep("1","starter")
        fakeComplexeStep("3","starter")
        console.log(retrieveTuto("starter"))
    })

    test("sould fetch all steps",()=>{
        fakeComplexeStep("2","default")
        fakeSimpleStep("1","pro")
        fakeComplexeStep("3","pro")
        console.log(retrieveTuto("pro"))
    })

    test("sould fail start step not found",()=>{
        fakeComplexeStep("2","tree")
        fakeSimpleStep("4","tree")
        fakeComplexeStep("3","tree")
        console.log(retrieveTuto("tree"))
    })
})