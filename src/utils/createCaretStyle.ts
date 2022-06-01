import { Placement } from "../types/utils.type";

/**
 * Create style for tooltip caret
 * 
 * @param placement 
 * @param tooltipX 
 * @param elementX 
 * @returns 
 */
const createCaretStyle = (
    { placement, tooltipX, elementX, tooltipY, elementY }: { placement: Placement, tooltipX?: number, elementX?: number, elementY?: number, tooltipY?: number }) => {
    const style: any = {};
    // give some margin to better caret placement
    const caretTBGap = tooltipX
        && elementX
        && elementX > tooltipX
        ? (
            elementX - tooltipX + 10
        )
        : 0

    const caretLRGap = tooltipY
        && elementY
        && elementY > tooltipY
        ? (
            elementY - tooltipY + 10
        )
        : 0 
    if (caretTBGap) style.marginLeft = caretTBGap
    if (caretLRGap) style.marginTop = caretLRGap
    switch (placement) {
        case "top":
            style.bottom = -10;
            style.transform = "rotate(180deg)";
            break;
        case "left":
            style.right = -15;
            style.transform = "rotate(90deg)";
            break;
        case "right":
            style.left = -15;
            style.transform = "rotate(-90deg)";
            break;
        default:
            style.top = -10;
            break;
    }
    return style;
};

export default createCaretStyle