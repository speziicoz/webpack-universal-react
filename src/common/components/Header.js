import React, { Component } from "react"

class Header extends Component {
    render() {
        const { name } = this.props

        return (
            <div>
                <h1>React Component.</h1>
                <p>By {name}</p>
            </div>
        )
    }
}

export default Header