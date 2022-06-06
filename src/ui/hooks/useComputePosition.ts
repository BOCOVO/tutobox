import { computePosition, autoPlacement, shift, offset } from '@floating-ui/dom';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { Placement } from '../../types/utils.type';
import elementInViewport from '../../utils/elementInViewport';

type ComputePositionReturn = {
    x: number,
    y: number,
    placement: Placement,
    highlighterData: HighlighterDataType
}

export type HighlighterDataType = {
    y?: number,
    x?: number,
    width?: number,
    height?: number
}

const highlighterDataMiddleware = (sethighlighterData: (data: HighlighterDataType) => void) => ({
    name: 'highlighterData',
    fn: (a: any) => {
        sethighlighterData(a.rects.reference as HighlighterDataType)
        return {}
    },
});

const useComputePosition = <T extends HTMLElement>(element: HTMLElement) => {

    const tooltipRef = useRef<T | null>(null)

    const [computePos, setComputePos] = useState<ComputePositionReturn | null>(null)

    const update = useCallback(() => {
        if (tooltipRef?.current) {
            //scroll to element if not in viewport
            if (!elementInViewport(element)) {
                element.scrollIntoView()
            }
            const highlighterData = {} as HighlighterDataType

            const sethighlighterData = (data: HighlighterDataType) => {
                Object.assign(highlighterData, data)
            }

            computePosition(element, tooltipRef.current, {
                middleware: [
                    highlighterDataMiddleware(sethighlighterData),
                    offset(12),
                    shift(),
                    autoPlacement(
                        {
                            allowedPlacements: ['top', 'bottom', "left", "right"],

                        }),
                ]
            }).then((compute) => {
                const { x, y, placement } = compute
                setComputePos({ x, y, placement, highlighterData } as ComputePositionReturn)
            })
        }
    }, [element])

    useEffect(() => {
        window.addEventListener("resize", update)
        return () => {
            window.removeEventListener("resize", update)
        }
    }, [update])


    return { computePos, tooltipRef, update }
}

export default useComputePosition
