import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <Link to='/addWork'>添加作业</Link>
                <br></br>
                <Link to='/workList'>查看作业</Link>
            </div>
        )
    }
}

export default App