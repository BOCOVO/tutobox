import { createContext } from "preact";
import { Locales } from "../../types/locale.type";

const LocaleContext = createContext<Locales|null>(null)

export default LocaleContext