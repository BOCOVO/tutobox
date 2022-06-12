import { ExtendsHelper } from "./extendsHelper.type"
import { Locales } from "./locale.type"
import { MultipleTutoValue, NotRequired } from "./utils.type"

export type TutoStep = {
    step: string,
    html?: string,
    des?: string,
    element: HTMLElement,
    stepTitle?: string,
    tuto: string,
    headless?: string,
    dynamic?: boolean,
    action?: string,
    canStartForm?: boolean,
    actionSelector?: string,
}

/**
 * TutoStep type with all attribute as not required
 */
export type RawTutoStep = NotRequired<TutoStep, string, "element">

/**
 * Type of parsed tuto step
 */
export type ParsedTutoStep = {
    [key in keyof TutoStep]: key extends "tuto"
    ? string[] | string
    : (key extends "element" ? HTMLElement : string | MultipleTutoValue)
}


type Tuto = {
    dynamic: boolean,
    name: string,
    steps: TutoStep[],
    includes?: string[]
}

/**
 * HTMLElement tuto attribute
 */

export type HTMLTutoAttr =
    "data-step"
    | "data-tuto"
    | "data-step-html"
    | "data-step-title"
    | "data-step-des"
    | "data-can-start-from"
    | "data-step-action"
    | "data-action-selector"
    | "data-dynamic-steps"
    | "data-headless-step"

export type HTMLTutoAttrAlias =
    "data-can-start"
    | "data-can-sf"
    | "data-dynamic-step"

export type TutoBoxOptions = {
    locales?: Locales ,
    extendsHelpers?: ExtendsHelper[]
}

export type TutoListItem = {
    title: string,
    name:string
}

export type BubblesData = {
    count: number,
    active: number
}

export default Tuto