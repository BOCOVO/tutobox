import isLastStep from "../../src/utils/isLastStep"

describe("isLastStep test", () => {
    test("non-dynamic should be last step", () => {
        expect(isLastStep({
            dynamic: false,
            name: "test",
            steps: [
                {
                    step: "0",
                    tuto: "test",
                    element: document.createElement("span")
                }
            ]
        }, 0)).toBe(true)
    })

    test("non-dynamic should not be last step", () => {
        expect(isLastStep({
            dynamic: false,
            name: "test",
            steps: [
                {
                    step: "0",
                    tuto: "test",
                    element: document.createElement("span")
                },
                {
                    step: "1",
                    tuto: "test",
                    element: document.createElement("span")
                }
            ]
        }, 0)).toBe(false)
    })

    test("dynamic should not be last step", () => {
        expect(isLastStep({
            dynamic: true,
            name: "test",
            steps: [
                {
                    step: "0",
                    tuto: "test",
                    element: document.createElement("span")
                },
                {
                    step: "1",
                    tuto: "test",
                    element: document.createElement("span")
                }
            ]
        }, 0)).toBe(false)
    })

    test("dynamic should not be last step", () => {
        expect(isLastStep({
            dynamic: true,
            name: "test",
            steps: [
                {
                    step: "0",
                    tuto: "test",
                    element: document.createElement("span")
                }
            ]
        }, 0)).toBe(false)
    })

    test("dynamic should be last step", () => {
        expect(isLastStep({
            dynamic: true,
            name: "test",
            steps: [
                {
                    step: "0",
                    tuto: "test",
                    element: document.createElement("span")
                },
                {
                    step: "end",
                    tuto: "test",
                    element: document.createElement("span")
                }
            ]
        }, 1)).toBe(true)
    })

    test("dynamic with extends should not be last step", () => {
        expect(isLastStep({
            dynamic: true,
            name: "test",
            steps: [
                {
                    step: "0",
                    tuto: "test0",
                    element: document.createElement("span")
                },
                {
                    step: "end",
                    tuto: "test0",
                    element: document.createElement("span")
                },
                {
                    step: "0",
                    tuto: "test",
                    element: document.createElement("span")
                }
            ]
        }, 1)).toBe(false)
    })

    test("dynamic with extends should be last step", () => {
        
        expect(isLastStep({
            dynamic: true,
            name: "test",
            steps: [
                {
                    step: "0",
                    tuto: "test0",
                    element: document.createElement("span")
                },
                {
                    step: "end",
                    tuto: "test0",
                    element: document.createElement("span")
                },
                {
                    step: "0",
                    tuto: "test",
                    element: document.createElement("span")
                },
                {
                    step: "end",
                    tuto: "test",
                    element: document.createElement("span")
                }
            ]
        }, 3)).toBe(true)
    })

})