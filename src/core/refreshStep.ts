import Tuto from "../types/tuto.type"
import onStep from "./onStep"

/**
 * Force refresh step's showed datas
 * 
 * @param tuto 
 * @param stepIndex 
 */
const refreshStep = (tuto:Tuto,stepIndex:number,callback:Function) => {
   onStep(tuto,stepIndex,callback)
}
export default refreshStep