import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import App from "../components/App"
import * as actions from "../actions"

const mapStateToProps = (state) => ({
    apiList: state.apiList
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)