import React, { Component } from 'react'
import { Button } from 'antd';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import {TEST} from 'store/ActionType'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    handleTest(){
        console.log(this.props.test)
        this.props.changeTest()
    }
    render() {
        return (
            <div>
                <Button onClick={()=>{this.handleTest()}}>23d3</Button>
            </div>
        )
    }
}

const mapSateToProps = (state)=>{
    return {
        test: state.test
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTest(){
            let action = {
                type:TEST,
                value:'改变后的测试样例'
            }
            console.log('没触发吗')
            dispatch(action)
        }
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(App)