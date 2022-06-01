import { GetAttrReturnType } from "../../types/utils.type"
import isNumber from "./isNumber"

const  isStep = (value: GetAttrReturnType) : boolean => {
    return isNumber(value) || value === "end"
}

export default isStep