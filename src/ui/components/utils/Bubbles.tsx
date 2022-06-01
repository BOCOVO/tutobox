import { BubblesData } from "../../../types/tuto.type"

type BubblesProps = {
    onClick(index:number):void
} & BubblesData

const Bubbles = ({ count, active ,onClick}:BubblesProps ) => {

    return (
        <ul className="tbox-bubbles">
            {[...(new Array(count)).keys()].map(
                (_, index) => <li onClick={()=>onClick(index)} className={`${index===active?"active":""}`} ></li>
            )
            }
        </ul>
    )
}

export default Bubbles