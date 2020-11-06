import React, { Component } from 'react'

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

const _mm = new MM()
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    componentDidMount(){
        // 判断用户是否登陆
        let isUser = _mm.isUser()
        if(!isUser){
            this.props.history.push('/pageLogin')
            return
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