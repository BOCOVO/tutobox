import { MultipleTutoValue } from "../types/utils.type";

/**
 * This type is use for tiping value 
 * parsing data which handle tuto property
 * value in list value
 */
type TutoValueIndex = {
    tuto:string,
    pos:number // value position
}

/**
 * This function retrieve all buto-box props values for attribute
 * with mutiple value 
 * exemple : `data-step="tuto1:6 tuto2:8"`
 * 
 * @param attrValue 
 * @param tutosList 
 * @returns 
 */
const parseMultitpleTutoValue = (attrValue:string,tutosList:string[]): MultipleTutoValue|string => {
    //check if default is set
    const hasDefault = attrValue.includes("default:")

    // add default to tutos list
    let tutosIndex:TutoValueIndex[] = (hasDefault ? [...tutosList,"default"] : tutosList).map(
        (tuto :string):TutoValueIndex => 
        {
        const pos = attrValue.indexOf(`${tuto}:`)
        if(pos === -1 && !hasDefault){
            // the tuto value of current tuto-box property
            // is not found. Log an error
        }
        return {pos,tuto}
    });

    // keep only found value and sort
    tutosIndex = tutosIndex
                .filter(index => index.pos!==-1)
                .sort((a,b) => a.pos-b.pos)

    // return if any custom tuto attribute value not found
    if(!tutosIndex.length){
        return attrValue
    }

    // return value
    const values:MultipleTutoValue = {}

    for (let indexPos = 0; indexPos < tutosIndex.length; indexPos++) {
        const currentPos = tutosIndex[indexPos]
        //tutosIndex[indexPos+1] will not exist at end of the list 
        //then use undefined to substring to end of the string
        const tutoValue:string = attrValue.substring(currentPos.pos,tutosIndex[indexPos+1]?.pos||undefined)
        
        values[currentPos.tuto] = tutoValue.trim().replace(`${currentPos.tuto}:`,"") // remove tutoname: for get only the value
    }

    return values
}

export default parseMultitpleTutoValue