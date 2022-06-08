import { useCallback, useEffect, useState } from "preact/hooks"
import { ExtendsHelper } from "../../../types/extendsHelper.type"
import { TutoListItem } from "../../../types/tuto.type"
import getTutoAndKeywords from "../../../utils/getTutoAndKeywords"
import helperToTutoListItem from "../../../utils/helperToTutoListItem"
import useLocale from "../../hooks/useLocale"
import AutoComplete from "../utils/AutoComplete"
import CloseButton from "../utils/CloseButton"
import TutoList from "./TutoList"
import { AUTO_HELP_TUTO_NAME } from "../../../constances"
import { TutoBoxType } from "../../../types/tutobox.type"

type HelpBoxProps = {
    extendsHelpers: ExtendsHelper[],
    tutobox:TutoBoxType
}

const HelpBox = ({ extendsHelpers,tutobox }: HelpBoxProps) => {

    const locale = useLocale()

    const [opened, setOpened] = useState(false)
    const [resultTuto, setResultTuto] = useState<TutoListItem[]|null>(null)

    const autoClose = useCallback(() => setOpened(false), [])
    
    useEffect(() => {
        // automaticaly close helpbox 
        // when a tuto is started
        tutobox.addEventListener("start-tuto", autoClose)
        return () => {
            tutobox.removeEventListener("start-tuto", autoClose)
        }
    }, [autoClose])


    const close = () => setOpened(false)
    const open = () => setOpened(true)

    const applySearch = (theme:string) => {
        const result = extendsHelpers.filter((helper) => {
            return helper.keywords?.includes(theme)
        }).map(extendsHelper => helperToTutoListItem(extendsHelper) )
        
        setResultTuto(result)
    }

    const onStartTuto = (tuto: string) => {
        close()
        tutobox.startTuto(tuto)
    }

    const clearSearch= () => {
        setResultTuto(null)
    }

    const { tutos, keywords } = getTutoAndKeywords(extendsHelpers)

    // do not show help box there is no ExtendsHelper
    if(!tutos.length) return null

    return (
        <div className={`tbox-axe-anim tbox-help-box ${opened ? "open" : ""}`}>
            <div className=" tbox-relative tbox-py-1">
                <div className=" tbox-py-1 tbox-px-3">
                    <button
                        // auto help tuto attribute
                        data-dynamic-steps="true"
                        data-tuto={AUTO_HELP_TUTO_NAME}
                        data-step-title={locale.htButton}
                        data-step-action="click"
                        data-step="1"

                        onClick={open}
                        className=" tbox-text-primary tbox-font-semibold">
                        {locale.findHelp}
                    </button>
                    {opened &&
                        <CloseButton onClick={close} />
                    }
                </div>
                {opened &&
                    <>
                        <div className=" tbox-divider" />
                        {keywords.length
                            ?
                            <>
                                <AutoComplete
                                    emptyText={locale.emptySearch}
                                    options={keywords}
                                    placeholder={locale.searchPlaceholder}
                                    onClear={clearSearch}
                                    onSelect={applySearch}
                                />
                                <div className=" tbox-divider" />
                            </>
                            : null
                        }
                        <p className="tbox-text-sm tbox-bg-very-light-primary tbox-text-primary tbox-py-1 tbox-px-3">
                            {locale.howToFind}
                        </p>
                        <div className=" tbox-divider" />
                        <TutoList onStartTuto={onStartTuto} tutos={resultTuto || tutos} />
                    </>
                }
            </div>
        </div>
    )
}

export default HelpBox