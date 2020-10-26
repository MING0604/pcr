import React, { Component } from 'react'

class BaseDataList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        let ifLogin = localStorage.getItem('ifLogin')
        if(!ifLogin){
            this.props.history.push('/login')
        }
        return (
            <div>BaseData</div>
        )
    }
}

export default BaseDataList