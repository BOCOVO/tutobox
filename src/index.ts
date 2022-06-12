import changeStep from "./core/changeStep";
import startTuto from "./core/startTuto";
import stopTuto from "./core/stopTuto";
import { TutoBoxOptions } from "./types/tuto.type";
import { EventCallback, EventsCallbacks, TutoBoxType } from "./types/tutobox.type";
import { ArgumentsType } from "./types/utils.type";
import App from "./ui/components";
import createObserver from "./core/createObserver";
import observerCallback from "./core/observerCallback";
import patchUpdate from "./core/patchUpdate";
import cleanActionListener from "./core/cleanActionListener";
import startWaitingForNextStep from "./core/startWaitingForNextStep";
import handleWaitingForStep from "./core/handleWaitingForStep";
import { Locales } from "./types/locale.type";
import { ExtendsHelper } from "./types/extendsHelper.type";
import startTour from "./core/tour/startTour";
import nextTour from "./core/tour/nextTour";
import prevTour from "./core/tour/prevTour";
import { EventData, EventType } from "./types/events.type";
import sleep from "./utils/sleep";
import { AUTO_HELP_TUTO_NAME } from "./constances";

const defaultOption: TutoBoxOptions = {
    locales: {
        close: "Close",
        next: "Next",
        prev: "Prev",
        findHelp: "Find help here.",
        howToFind: "Scroll tutorial below and click on tutorial you search for.",
        searchPlaceholder: "Tape keyword here.",
        emptySearch: "No result found.",
        finish: "Finish",
        autoHelpButton: "Click here to see the list of available tutorials.",
        autoHelpSelect: "Select the tutorial you are looking for"
    },
}

class _TutoBox {

    options: TutoBoxOptions
    eventsCallbacks: EventsCallbacks = {}
    isTourRunning?: boolean
    isMounted = false

    constructor(options: TutoBoxOptions) {
        this.options = options
    }

    _actionNextStep = () => {
        (this as this & TutoBoxType).next()
    }

    _cleanActionListener(this: this & TutoBoxType) {
        cleanActionListener.call(this)
    }

    _checkStartedTuto(this: this & TutoBoxType) {
        if (!this.currentTuto || this.currentStep === undefined) {
            throw new Error("No tuto or tour was started. Make sure you call TutoBox.startTuto() with the name of desired tuto before call TutoBox.nextStep() or TutoBox.prevStep() method.")
        }
    }

    _runCallback = (eventName: EventType, eventData: EventData | TutoBoxOptions) => {
        if (this.eventsCallbacks[eventName]) {
            this.eventsCallbacks[eventName]?.forEach(callback => {
                try {
                    callback(eventData)
                } catch (error) {
                    console.error(error)
                }
            })
        }
    }

    #observerCallback(
        this: this & TutoBoxType,
        ...args: ArgumentsType<typeof observerCallback>
    ) {
        observerCallback.call(this, ...args)
    }

    _patchUpdate() {
        patchUpdate.call(this as this & TutoBoxType)
    }

    _createObserver(this: this & TutoBoxType) {
        createObserver.call(this, this.#observerCallback.bind(this))
    }

    _startWaitingForNextStep(...args: ArgumentsType<typeof startWaitingForNextStep>) {
        startWaitingForNextStep.call(this as this & TutoBoxType, ...args)
    }

    _handleWaitingForStep() {
        handleWaitingForStep.call(this as this & TutoBoxType)
    }

    /* Navigation methods */
    #nextTour() {
        nextTour.call(this as this & TutoBoxType)
    }

    #prevTour() {
        prevTour.call(this as this & TutoBoxType)
    }

    #nextStep(this: this & TutoBoxType): EventData | void {
        if (this.currentStep != undefined) {
            const stepIndex = this.currentStep + 1
            return changeStep.call(this as this & TutoBoxType, stepIndex);
        }
    }

    #prevStep(this: this & TutoBoxType): EventData | void {
        if (this.currentStep != undefined) {
            const stepIndex = this.currentStep - 1
            return changeStep.call(this, stepIndex, true);
        }
    }

    /**
     * Wait for a few seconds until the views are mounted.
     */
    #checkIsMounted = async () => {
        if (!this.isMounted) await sleep()
    }

    /** User API */

    addEventListener(eventName: EventType, callback: EventCallback) {
        if (typeof callback !== "function") {
            throw new Error("The event listener callback must be a function.");
        }
        if (!this.eventsCallbacks[eventName]) {
            this.eventsCallbacks[eventName] = []
        }
        const callbackIndex = (this.eventsCallbacks[eventName] as EventCallback[]).indexOf(callback)
        if (callbackIndex == -1) this.eventsCallbacks[eventName]?.push(callback)
    }

    removeEventListener(eventName: EventType, callbackToRemove: EventCallback) {
        if (this.eventsCallbacks[eventName]) {
            const callbackIndex = (this.eventsCallbacks[eventName] as EventCallback[]).indexOf(callbackToRemove)
            if (~callbackIndex) {
                this.eventsCallbacks[eventName] = this.eventsCallbacks[eventName]?.filter(callback => callback == callbackToRemove)
                if (this.eventsCallbacks[eventName]?.length === 0) {
                    delete this.eventsCallbacks[eventName];
                }
                return true
            } else {
                console.warn('The callback function you are trying to remove was not found. This may be because you have a function reference other than the one used to add the callback function.')
            }
        }
        return false
    }

    goToStep = (step: number) => {
        if (step < 1) {
            console.error(`The value ${step} is invalid as step number. The steps are numbered from 1.`)
        } else {
            changeStep.call(this as this & TutoBoxType, step - 1);
        }
    }

    /* Start an tutorial */
    async startTuto(...args: ArgumentsType<typeof startTuto>) {
        await this.#checkIsMounted()
        startTuto.call(this as this & TutoBoxType, ...args);
    }

    async startTour(this: this & TutoBoxType) {
        await this.#checkIsMounted()
        startTour.call(this)
    }

    stop() {
        stopTuto.call(this as this & TutoBoxType)
    }

    next(this: this & TutoBoxType) {
        this._checkStartedTuto()
        if (this.isTourRunning) {
            this.#nextTour()
        } else {
            this.#nextStep()
        }
    }

    prev(this: this & TutoBoxType) {
        this._checkStartedTuto()
        if (this.isTourRunning) {
            this.#prevTour()
        } else {
            this.#prevStep()
        }
    }

    /**
     * Update locales uption
     * 
     * @param locales 
     */
    async setLocales(locales: Locales) {
        const newLocale = { ...this.options.locales, ...locales }
        this.options.locales = newLocale
        await this.#checkIsMounted()
        this._runCallback("option-change", { locales: newLocale })
    }

    /**
    * Update extendsHelpers uption
    * 
    * @param locales 
    */
    async setExtendsHelpers(extendsHelpers: ExtendsHelper[]) {
        this.options.extendsHelpers = extendsHelpers
        await this.#checkIsMounted()
        this._runCallback("option-change", { extendsHelpers: extendsHelpers })
    }


    /**
    * Run auto help tutorial
    * 
    */
    async runAutoHelp() {
        if (this.options.extendsHelpers?.length) {
            await this.#checkIsMounted()
            this.startTuto(AUTO_HELP_TUTO_NAME)
        }
    }

}

const TutoBox = (
    () => {
        const tuto = new _TutoBox(defaultOption);
        App(tuto.options, tuto);
        return tuto
    }
)();

export default TutoBox;
