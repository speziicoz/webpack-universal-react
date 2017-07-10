import React, { Component } from "react"
import { Link, Route } from "react-router"
import PropTypes from "prop-types"

import Header from "./Header"

class App extends Component {
    render() {
        const { add, subtract, apiList } = this.props

        return (
            <div className="test2">
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
                <Header name="Champ N. Jaikaew" />
                <span>Client Results: {apiList}</span>
                <div>
                    <button onClick={add}>Add</button>
                    {" "}
                    <button onClick={subtract}>Subtract</button>
                </div>
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
    add: PropTypes.func.isRequired,
    subtract: PropTypes.func.isRequired,
    apiList: PropTypes.number
}

export default App