import { AUTO_HELP_TUTO_NAME } from "../../../constances"
import { TutoListItem } from "../../../types/tuto.type"
import useLocale from "../../hooks/useLocale"

type TutoListProps = {
    tutos: TutoListItem[],
    onStartTuto: (tuto: string) => void
}

const TutoList = ({ tutos, onStartTuto }: TutoListProps) => {

    const locale = useLocale()

    return (
        <div>
            {
                tutos.length ?
                    <ul
                        // auto help tuto attribute
                        data-tuto={AUTO_HELP_TUTO_NAME}
                        data-step-title={locale.autoHelpSelect}
                        data-step="end"
                        className=" tbox-tuto-list tbox-py-2 tbox-px-3">
                        {
                            tutos.map(
                                (tuto, index) => {
                                    return (
                                        <li
                                            onClick={() => onStartTuto(tuto.name)}
                                            className="tbox-cursor-pointer hover:tbox-bg-very-light-primary tbox-font-medium tbox-py-2 tbox-px-2"
                                            key={index}
                                        >
                                            {tuto.title}
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>
                    : "Empty"
            }
        </div>
    )
}

export default TutoList