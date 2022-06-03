import { useCallback, useEffect, useState } from "preact/hooks"
import { Locales } from "../../types/locale.type"
import { TutoBoxOptions } from "../../types/tuto.type"
import { TutoBoxType } from "../../types/tutobox.type"
import LocaleContext from "../contexts/LocaleContext"
import HelpBox from "./HelpBox/HelpBox"
import tutobox from "./TuboBox"
import TutoBox from "./TuboBox"

const Main = (options: TutoBoxOptions & { tutobox: TutoBoxType }) => {

    const [locale, setLocale] = useState(options.locales as Locales)
    const [extendsHelpers, setExtendsHelpers] = useState(options.extendsHelpers || [])

    const optionChange = useCallback(
        (data: TutoBoxOptions) => {
            if (data.locales) setLocale(data.locales)
            if (data.extendsHelpers) setExtendsHelpers(data.extendsHelpers)
        },
        []
    )


    useEffect(() => {
        options.tutobox.addEventListener("option-change", optionChange)

        return () => {
            options.tutobox.removeEventListener("option-change", optionChange)
        }
    }, [])

    // set isMounted to true once rendering is done.
    useEffect(() => {
        options.tutobox.isMounted = true
        return () => {
            options.tutobox.isMounted = false
        }
    }, [])


    return (
        <LocaleContext.Provider value={locale}>
            <HelpBox tutobox={options.tutobox} extendsHelpers={extendsHelpers} />
            <TutoBox tutobox={options.tutobox} />
        </LocaleContext.Provider>
    )
}
export default Main
