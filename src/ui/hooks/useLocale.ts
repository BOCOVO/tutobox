import { useContext } from "preact/hooks"
import { Locales } from "../../types/locale.type"
import LocaleContext from "../contexts/LocaleContext"

const useLocale = () => {
    return useContext(LocaleContext) as Locales
}

export default useLocale