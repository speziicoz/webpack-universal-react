import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import apiList from "./apiList"

const rootReducer = combineReducers({
    routing: routerReducer,
    apiList
})

export default rootReducer