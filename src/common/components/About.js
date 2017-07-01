import React, { Component } from "react"
import PropTypes from "prop-types"

class About extends Component {
    render() {
        const { apiList } = this.context.store.getState()

        return (
            <div>
                <h1>About</h1>
                <p>This is About Component.</p>
                <span>Client Results: {apiList}</span>
            </div>
        )
    }
}

About.contextTypes = {
    store: PropTypes.object.isRequired
};

export default About