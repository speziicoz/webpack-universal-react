import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { browserHistory } from "react-router"
import { routerMiddleware } from "react-router-redux"

import rootReducer from "../reducers"
import { readyStatePromise, loggerMiddleware } from "./storeMiddleware"

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    resolveMiddleware()
  )

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

const resolveMiddleware = () => {
  if (process.env.NODE_ENV === "development" && process.env.BROWSER) {
    return applyMiddleware(
      thunkMiddleware,
      readyStatePromise,
      routerMiddleware(browserHistory),
      loggerMiddleware,
    )
  } else {
    return applyMiddleware(
      thunkMiddleware,
      readyStatePromise,
      routerMiddleware(browserHistory),
    )
  }
}

export default configureStore