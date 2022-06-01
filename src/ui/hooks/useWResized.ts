import { useState, useEffect, useCallback } from "preact/hooks"

/**
 * This hook take a function that is called each
 * time the screen is resized
 */
const useWResized = <T>(callback:() => T|null): T|null => {
    
    const [result, setResult] = useState<T | null>(null)

    // updater callback
    const updateResult = useCallback(() => {
        setResult(callback())
    }, [])

    // register onresize event listener
    useEffect(() => {
        // update result for first time
        updateResult()
        window.addEventListener("resize", updateResult)
        return () => {
            window.removeEventListener("resize", updateResult)
        }
    }, [])

    return result
}

export default useWResized
