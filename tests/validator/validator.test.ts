import validate from "../../src/utils/validator/validator"

describe("Validation", () => {
    
    test('should throw error name is required', () => {
        expect(()=>validate(null, "name").exist()).toThrow()
    })

    test('should throw error step is required', () => {
        expect(()=>validate(null, "step").isNumber()).toThrow()
    })

    test('should throw error step must be number', () => {
        expect(()=>validate("4p", "step").isNumber()).toThrow()
    })

    test('should throw error one of', () => {
        expect(()=>validate(null, "des").oneOf(null,"html")).toThrow()
    })

    test('should validate step', () => {
        expect(()=>validate("10", "step").exist()).not.toThrow()
    })

    test('should throw valide one of', () => {
        expect(()=>validate("Description", "des").oneOf(null,"html")).not.toThrow()
    })
    
})