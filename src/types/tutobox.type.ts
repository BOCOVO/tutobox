import startWaitingForNextStep from "../core/startWaitingForNextStep"
import { EventData, EventType , WaintingForStepDirection } from "./events.type"
import Tuto, { TutoBoxOptions } from "./tuto.type"

type WaitingForStepProps = {
    tuto: string,
    direction: WaintingForStepDirection
}

export type EventsCallbacks = {
    [K in EventType]?: EventCallback[]
}
export type EventCallback = (data: any) => void

export type TutoBoxType =
    {
        isWaitingForStep?: WaitingForStepProps
        currentObserver?: MutationObserver,
        options: TutoBoxOptions,
        currentTuto?: Tuto,
        currentStep?: number,
        isTourRunning?: boolean,
        eventsCallbacks:EventsCallbacks

        // internal API
        patchUpdate(): void,
        createObserver(): void,
        actionNextStep(): void,
        cleanActionListener(): void,
        checkStartedTuto(): void,
        startWaitingForNextStep: typeof startWaitingForNextStep,
        runCallback(callbackName: EventType, data?: EventData|TutoBoxOptions): void,
        handleWaitingForStep(): void
        addEventListener(eventName: EventType, callback: EventCallback): void
        removeEventListener(eventName: EventType, callback: EventCallback): void

        // user API
        prev(): EventData | undefined,
        next(): EventData | undefined,
        stopTuto(): EventData | undefined
        goToStep(step: number): EventData | undefined
        startTuto(tutoName:string):void
        startTour():void
    }