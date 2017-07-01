export const readyStatePromise = store => next => action => {
    if (!action.promise) {
        return next(action)
    }

    function makeAction(ready, data) {
        let newAction = Object.assign({}, action, { ready }, data)
        delete newAction.promise

        return newAction
    }

    next(makeAction(false))

    return action.promise.then(
        result => next(makeAction(true, { result })),
        error => next(makeAction(true, { error }))
    )
}

export function loggerMiddleware({ getState }) {
    return (next) => (action) => {
        console.log("will dispatch", action)

        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action)

        console.log("state after dispatch", getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}
