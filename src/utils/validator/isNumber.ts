import { GetAttrReturnType } from "../../types/utils.type"
import exists from "./exists"

const  isNumber = (value: GetAttrReturnType) : boolean => {
    const regex = /^[0-9]+$/
    return (
        exists(value) &&  
        ( 
            typeof value === "number" || 
            ( 
                typeof value === "string" && 
                regex.test(value)
            )
        ) 
        )
}
export default isNumber