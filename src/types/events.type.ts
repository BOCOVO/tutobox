import { BubblesData, TutoBoxOptions, TutoStep } from "./tuto.type"
import { NotRequiredAll } from "./utils.type"

export type WaintingForStepDirection = "prev" | "next"
type WaitingEvent = "start-waiting" | "stop-waiting" | "accidental-remove"

type TutoNavigationEvents =
    | "start-tuto"
    | "step-change"
    | "stop-tuto"
    | "option-change"

export type EventType = WaitingEvent |TutoNavigationEvents 



export type EventData = {
    tutoName: string,
    step?: number,
    stepData?: TutoStep,
    next?: boolean,
    prev?: boolean,
    end?: boolean,
    bubbles?: BubblesData
}

export type OptionsChange = NotRequiredAll<TutoBoxOptions>