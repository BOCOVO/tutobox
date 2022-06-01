import fetchTutoboxAttr from "../../src/core/fetchTutoStepAttr"

describe("Fetch tuto attribute", () => {

    test("should fetch attributes", () => {
        const element = document.createElement("div")
        element.setAttribute("data-step-title", "Tuto step title")
        element.setAttribute("data-step-des", "Step description")
        element.setAttribute("data-step-html", "<div></div>")
        element.setAttribute("data-tuto", "starter")
        element.setAttribute("data-step", "2")
        element.setAttribute("data-tuto-tile", "Start tuto")

        expect(fetchTutoboxAttr(element)).toStrictEqual(
            {
                tuto: ['starter'],
                stepTitle: 'Tuto step title',
                des: 'Step description',
                html: '<div></div>',
                step: '2'
            }
        )
    })

    test("should fetch attributes for each tyto", () => {

        const element = document.createElement("div")
        element.setAttribute("data-step-title", "Tuto step title")
        element.setAttribute("data-step-des", "starter:Des Starter else:Des Else")
        element.setAttribute("data-step-html", "starter:<div></div> else:<br>")
        element.setAttribute("data-tuto", "starter|else")
        element.setAttribute("data-step", "starter:2 else:3")
        element.setAttribute("data-tuto-title", "starter:Starter else:Else")

        expect(fetchTutoboxAttr(element)).toStrictEqual({
            tuto: ['starter', 'else'],
            stepTitle: 'Tuto step title',
            des: {
                starter: "Des Starter",
                else: "Des Else"
            },
            html: {
                starter: '<div></div>',
                else: '<br>'
            },
            step: {
                starter: '2',
                else: '3'
            },
            tutoTitle: {
                starter: "Starter",
                else: "Else"
            }
        })
    })

    test("should fail description validation", () => {

        const element = document.createElement("div")
        element.setAttribute("data-tuto", "starter|else")
        element.setAttribute("data-step", "starter:2 else:3")
        element.setAttribute("data-tuto-title", "starter:Starter else:Else")

        expect(fetchTutoboxAttr(element)).toBe(false)
    })

    test("should fail step validation for else", () => {

        const element = document.createElement("div")
        element.setAttribute("data-step-title", "Tuto step title")
        element.setAttribute("data-step-des", "starter:Des Starter else:Des Else")
        element.setAttribute("data-step-html", "starter:<div></div> else:<br>")
        element.setAttribute("data-tuto", "starter|else")
        element.setAttribute("data-step", "starter:2")
        element.setAttribute("data-tuto-title", "starter:Starter else:Else")

        expect(fetchTutoboxAttr(element)).toBe(false)
    })
})