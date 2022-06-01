import { BubblesData, TutoBoxOptions, TutoStep } from "./tuto.type"
import { NotRequiredAll } from "./utils.type"

export type WaintingForStepDirection = "prev" | "next"
type WaitingEvent = "start-waiting" | "stop-waiting"
type BeforeEvent = "before-start-tuto"

type TutoNavigationEvents =
    | "start-tuto"
    | "step-change"
    | "prev-step"
    | "next-step"
    | "stop-tuto"
    | "option-change"

export type EventType = WaitingEvent | BeforeEvent |TutoNavigationEvents



export type EventData = {
    tutoName: string,
    step?: number,
    stepData?: TutoStep,
    next?: boolean,
    prev?: boolean,
    headless?: boolean,
    end?: boolean,
    bubbles?: BubblesData
}

export type OptionsChange = NotRequiredAll<TutoBoxOptions>