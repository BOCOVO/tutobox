const castStep = (step:string) => {
    return step === "end" ? 10000 : parseInt(step)
}

export default castStep