export type Placement = "top" | "bottom" | "left" | "right"

/**
 * retrieve readonly keys
 */
 type ReadonlyKey<T> = {
    [K in keyof T] : IfEquals<{[Q in K]:T[K]}, {+readonly [Q in K] : T[K]} , K , never>
}[keyof T]

export type IfEquals<T,U,A,B> = (<T>() => T extends U ? 1 : 2) extends (<U>() => U extends T ? 1 : 2) ? A :B

export type Pick<T,K extends keyof T> = {
    [k in K] : T[k]
}

/**
 * transform to not required
 * with U type to assign for all key
 * with N index to remove
 */

export type NotRequired<T,U=never,N=never> = {
    [k in keyof T] ?: k extends N ? never :( U extends never ? T[k] : U )
}

// retrieve writable keys
export type WritableKey<T> = {
    [K in keyof T] : IfEquals<{[Q in K]:T[K]}, {-readonly [Q in K] : T[K]} , K , never>
}[keyof T]

/**
 * Readonly Props of an interface
 */
export type ReadonlyPropsOf<T> = Pick<T , ReadonlyKey<T>>

/**
 * Writable Props of an interface
 */
export type WritablePropsOf<T> = Pick<T , WritableKey<T>>

export type ReturnType<F> =F extends (...args:any) => infer Return ? Return:never

/**
 * Return type of element getAttribute() function
 */
export type GetAttrReturnType = ReturnType<HTMLElement["getAttribute"]>

/**
 * Object for return type of parseMultipleTutoValue function
 * object index is tutorial name
 */
export type MultipleTutoValue = {
    [key:string] : string
}

/**
 * Object with string as key and any type as value
 */
export type AnyIndexObject = {
    [key:string] : any
}

/**
 * Create key list of functions of a type
 */
/*
export type FunctionKey<T,U> = {
    [K in keyof T]: T[K] extends Function ? (K extends U ? never : K ) : never
}[keyof T]
*/

/**
 * Return arguments 
 */
export type ArgumentsType<T> = T extends (...args: infer Args) => any ? Args : never

export type NotRequiredAll<T>= {
    [K in keyof T]+?: T[K]
}
