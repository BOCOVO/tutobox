import parseMultitpleTutoValue from "../../src/utils/parseMultipleTutoValue"

describe("parseMultipleTutoValue test", () => {
    test("should return tuto property value", () => {
        expect(parseMultitpleTutoValue("tuto:1 tuto1:5", ["tuto", "tuto1"])).toStrictEqual(
            {
                tuto: "1",
                tuto1: "5"
            }
        )
    })

    test("should find one", () => {
        expect(parseMultitpleTutoValue("tuto:1 tutoj1:5", ["tuto", "tuto1"])).toStrictEqual(
            {
                tuto: "1 tutoj1:5",
            }
        )
    })

    test("should find default", () => {
        expect(parseMultitpleTutoValue("tuto:1 default:5", ["tuto", "tuto1"])).toStrictEqual(
            {
                tuto: "1",
                "default":"5"
            }
        )
    })
})