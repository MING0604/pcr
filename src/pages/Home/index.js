import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDownMenu from 'modules/DropDownMenu'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <DropDownMenu />
                <h1>很精美的首页</h1>
            </div>
        )
    }
}

export default App