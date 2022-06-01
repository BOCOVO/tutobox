import { ExtendsHelper } from "../types/extendsHelper.type"
import { TutoListItem } from "../types/tuto.type"

/**
 * Return TutoListItem that contain 
 * the title and name of the tuto
 * 
 * @param extendsHelper 
 * @returns 
 */
const helperToTutoListItem = (extendsHelper:ExtendsHelper) => {
    const { title, tutoName } = extendsHelper
    return { title, name: tutoName } as TutoListItem
}

export default helperToTutoListItem