const apiList = (state = 1500, action) => {
    switch (action.type) {
        case "ADD":
            state += action.payload

            break
        case "SUBTRACT":
            state -= action.payload

            break
        default:
    }

    return state
}

export default apiList