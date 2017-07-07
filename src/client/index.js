import "babel-polyfill"
import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { applyRouterMiddleware, Router } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { createHistory } from "history"

import routes from "../common/routes"
import configureStore from "../common/store/configureStore"

const store = configureStore()
const history = syncHistoryWithStore(createHistory(), store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} render={applyRouterMiddleware()} />
  </Provider>,
  document.getElementById("root")
)