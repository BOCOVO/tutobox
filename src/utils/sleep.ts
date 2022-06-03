
/**
 * Wait for a time
 * 
 * @param time 
 */
const pause = async (time = 5000) => {
    return new Promise<void>(
        (resolve) => {
            setTimeout(resolve, time);
        }
    )
}

export default pause
