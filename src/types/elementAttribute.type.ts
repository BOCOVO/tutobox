import { WritablePropsOf } from "./utils.type"


export type StyleProperties = {
    [key in keyof CSSStyleDeclaration]?: string
}

export type WritableHTMLElementProps = WritablePropsOf<HTMLElement>

/**
 * Type for Element creating attribute
 */

type ElementAttribute = {
    style?: StyleProperties
    } & {
        [K in keyof WritableHTMLElementProps as string]?: WritableHTMLElementProps[K]
    }

export default ElementAttribute