import React, { Component } from "react"

class Header extends Component {
    render() {
        const { name } = this.props

        return (
            <div>
                <h1>Webpack Universal React.</h1>
                <p>React on the Server for Beginners: Build a Universal React and Node App</p>
                <p className="author">By {name}</p>
            </div>
        )
    }
}

export default Header