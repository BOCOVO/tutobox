import { MultipleTutoValue } from "../types/utils.type"

/**
 * Return value of an attritute for a tutorial
 * 
 * @param attrValue 
 * @param tutoName 
 * @returns 
 */
const getTutoValue = (attrValue: string | MultipleTutoValue, tutoName: string): string => {
    if (typeof attrValue === "string") return attrValue
    else if (typeof attrValue === "object") {
        return attrValue[tutoName] || attrValue.default
    }
    return ""
}

export default getTutoValue
