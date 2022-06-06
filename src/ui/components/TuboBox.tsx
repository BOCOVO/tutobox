import { useCallback, useEffect, useState } from "preact/hooks";
import { EventData, WaintingForStepDirection } from "../../types/events.type";
import { BubblesData, TutoStep } from "../../types/tuto.type";
import { TutoBoxType } from "../../types/tutobox.type";
import TooltipBox from "./TooltipBox";

type BoxPops ={tutobox:TutoBoxType}

const tutobox = ({tutobox}:BoxPops) => {

    const [canNext, setCanNext] = useState<boolean>(false);
    const [canPrev, setCanPrev] = useState<boolean>(false);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [bubblesData, setBubblesData] = useState<null | BubblesData>(null)
    const [waitingForStep, setWaitingForStep] = useState<WaintingForStepDirection | null>(null)
    const [currentStep, setCurrentStep] = useState<TutoStep | null>(null);

    const changeStep = useCallback(
        (eventData: EventData) => {
            if (eventData.stepData) setCurrentStep(eventData.stepData);
            setCanNext(!!eventData.next);
            setCanPrev(!!eventData.prev);
            setIsEnd(!!eventData.end)
            if (eventData.bubbles) {
                setBubblesData(eventData.bubbles)
            } else {
                setBubblesData(null)
            }
        }, []);

    const handleWaitingStep = useCallback(() => {
        setWaitingForStep(tutobox.isWaitingForStep?.direction || null)
    }, [])

    useEffect(() => {
        tutobox.addEventListener("step-change", changeStep)

        tutobox.addEventListener("start-waiting", handleWaitingStep)
        tutobox.addEventListener("stop-waiting", handleWaitingStep)
        return () => {
            tutobox.removeEventListener("step-change", changeStep)

            tutobox.removeEventListener("start-waiting", handleWaitingStep)
            tutobox.removeEventListener("stop-waiting", handleWaitingStep)

        }
    }, [])

    const stopTuto = () => {
        tutobox.stop()
        setCurrentStep(null)
        setCanNext(false)
        setCanPrev(false)
    };

    const nextStep = () => {
        if (isEnd) {
            stopTuto()
        } else {
            tutobox.next()
        }
    };

    const prevStep = () => {
        tutobox.prev()
    };

    if (!currentStep) return null

    return (
        <div className=" ">
            <TooltipBox
                {...currentStep}
                headless={!!currentStep.headless}
                prev={canPrev}
                next={canNext}
                nextStep={nextStep}
                prevStep={prevStep}
                isEnd={isEnd}

                bubbles={bubblesData}
                waitingForStep={waitingForStep}
                stopTuto={stopTuto}
                goToStep={tutobox.goToStep}
            />
        </div>
    );
};

export default tutobox;
