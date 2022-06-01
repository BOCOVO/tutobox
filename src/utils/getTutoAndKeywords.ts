import { ExtendsHelper } from "../types/extendsHelper.type"
import { TutoListItem } from "../types/tuto.type"
import helperToTutoListItem from "./helperToTutoListItem"

/**
 * Extract keyword and tuto from extendsHelpers
 * @param extendsHelpers 
 * @returns 
 */
 const getTutoAndKeywords = (extendsHelpers: ExtendsHelper[]) => {
    
    const tutoAndKeyWord = (
        extendsHelpers.filter(
            extendsHelper => extendsHelper.title // only get tuto with title prop
        ).reduce(
            (acc, extendsHelper) => (
                {
                    tutos: [
                        ...acc.tutos,
                        helperToTutoListItem(extendsHelper)
                    ],
                    keywords: [
                        ...acc.keywords,
                        ...(extendsHelper.keywords || [])
                    ]
                }
            ), ({ tutos: [], keywords: [] } as { tutos: TutoListItem[], keywords: string[] })
        )
    )

    const uniqueKeywords = [...(new Set(tutoAndKeyWord.keywords))]

    return { tutos: tutoAndKeyWord.tutos, keywords: uniqueKeywords }
}

export default getTutoAndKeywords