import { useEffect } from "preact/hooks";
import useComputePosition from "../hooks/useComputePosition";
import Button from "./utils/Button";
import Highlighter from "./Highlighter";
import CloseButton from "./utils/CloseButton";
import createCaretStyle from "../../utils/createCaretStyle";
import useLocale from "../hooks/useLocale";
import { WaintingForStepDirection } from "../../types/events.type";
import Bubbles from "./utils/Bubbles";
import { BubblesData } from "../../types/tuto.type";



type ToolptipBoxProps = {
    title?: string;
    html?: string;
    des?: string;
    headless: boolean;
    prev: boolean;
    next: boolean;
    element: HTMLElement;
    isEnd: boolean;
    bubbles?: BubblesData | null;
    waitingForStep: WaintingForStepDirection | null,
    prevStep(): void;
    nextStep(): void;
    stopTuto(): void;
    goToStep(step:number): void;
};

const TooltipBox = ({
    title,
    html,
    des,
    prev,
    next,
    element,
    headless,
    isEnd,
    bubbles,
    waitingForStep,
    nextStep,
    prevStep,
    stopTuto,
    goToStep
}: ToolptipBoxProps) => {

    const localeContext = useLocale()

    const { computePos, tooltipRef, update } = useComputePosition<HTMLDivElement>(element);

    useEffect(() => {
        update();
    }, [element]);

    const tooltipOverflow = computePos && computePos.y < 0
    const useTop = tooltipOverflow ? 10 : computePos?.y
    const usePlacement = useTop === 10 || !computePos ? "bottom" : computePos?.placement

    const caretstyle = createCaretStyle({
        placement: usePlacement,
        tooltipX: computePos?.x,
        elementX: computePos?.highlighterData.x,
        tooltipY: useTop,
        elementY: computePos?.highlighterData.y
    })


    const boxStyle = headless ?
        {}
        : {
            top: useTop,
            left: computePos?.x
        }

    return (
        <div className={`tbox-tooltip-main ${headless ? "tbox-headless" : ""}`}>
            {!headless && <Highlighter {...computePos?.highlighterData} />}
            <div
                ref={tooltipRef}
                style={boxStyle}
                className="tbox-absolute tbox-axe-anim tooltip-help-box">
                {!headless
                    && <span
                        style={caretstyle}
                        className={`tbox-caret tbox-absolute ${computePos?.placement || "top"}`}
                    ></span>
                }
                <div className="tbox-overflow-hidden tbox-rounded-md">
                    <CloseButton
                        title={localeContext.close}
                        onClick={stopTuto}
                    />
                    {title ? (
                        <h4 className=" tbox-font-semibold tbox-px-3 tbox-pt-3 tbox-pb-1 ">
                            {title}
                        </h4>
                    ) : null}
                    <div className=" tbox-px-3 tbox-my-3">
                        {des ?
                            <p>{des}</p>
                            : (html ?
                                <p dangerouslySetInnerHTML={{ __html: html }}></p>
                                : null)}
                    </div>
                    <div className=" tbox-divider"></div>
                    <div className=" tbox-flex tbox-flex-row-reverse tbox-justify-between">
                        <Button
                            loading={waitingForStep === "next"}
                            onClick={nextStep}
                            disabled={isEnd ? false : !next}
                            className="tbox-bg-primary tbox-btn-next hover:tbox-bg-primary-light tbox-text-textwhite "
                        >
                            {isEnd ? localeContext.finish : localeContext.next}
                        </Button>
                        {bubbles && <Bubbles onClick={(step)=>goToStep(step+1)} {...bubbles} />}
                        <Button
                            loading={waitingForStep === "prev"}
                            onClick={prevStep}
                            disabled={!prev}
                            className="tbox-text-primary tbox-btn-prev hover:tbox-text-pr "
                        >
                            {localeContext.prev}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TooltipBox;
