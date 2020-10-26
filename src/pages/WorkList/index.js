import React, { Component } from 'react'
import { connect } from 'react-redux'

class WorkList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>123123</div>
        )
    }
}

const mapSateToProps = (state)=>{
    return {
        workList:state.workList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(WorkList)