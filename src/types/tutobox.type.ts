import startWaitingForNextStep from "../core/startWaitingForNextStep"
import { EventData, EventType , WaintingForStepDirection } from "./events.type"
import { ExtendsHelper } from "./extendsHelper.type"
import { Locales } from "./locale.type"
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
        eventsCallbacks:EventsCallbacks,
        isMounted:boolean,

        // internal API
        _patchUpdate(): void,
        _createObserver(): void,
        _actionNextStep(): void,
        _cleanActionListener(): void,
        _checkStartedTuto(): void,
        _startWaitingForNextStep: typeof startWaitingForNextStep,
        _runCallback(callbackName: EventType, data?: EventData|TutoBoxOptions): void,
        _handleWaitingForStep(): void,
        _handleAccidentalRemove():void,
        addEventListener(eventName: EventType, callback: EventCallback): void,
        removeEventListener(eventName: EventType, callback: EventCallback): boolean

        // user API
        prev(): void,
        next(): void,
        stop(): void,
        goToStep(step: number): void,
        startTuto(tutoName:string):Promise<void>,
        startTour():Promise<void>,
        setExtendsHelpers(extendsHelpers: ExtendsHelper[]):Promise<void>,
        setLocales(locales: Locales):Promise<void>, 
        runAutoHelp():Promise<void>, 
    }