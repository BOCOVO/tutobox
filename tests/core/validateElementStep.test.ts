import purgeElementSteps from "../../src/utils/validateElementStep"

describe("Element step validation",()=>{

    test("sould fail description validation",()=>{
        const ele = document.createElement("a")
        expect(purgeElementSteps({
            step:"2" ,
            tuto:["test"]
        },ele)).toBe(false)
    })

    test("sould fail description validation for tuto2",()=>{
        const ele = document.createElement("a")
        expect(purgeElementSteps({
            step:"2" ,
            des:{
                test:"test"
            },
            tuto:["test","tuto2"]
        },ele)).toBe(false)
    })
})