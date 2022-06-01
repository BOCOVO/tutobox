import { GetAttrReturnType } from "../../types/utils.type"
import exists from "./exists"

/**
 * check if one of param exists
 * 
 * @param {any} first
 * @param {any} secont
 * @returns {boolean}
 */
const oneOf = (first:GetAttrReturnType,second:GetAttrReturnType): boolean => exists(first) || exists(second)



export default oneOf