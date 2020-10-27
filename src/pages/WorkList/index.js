import React, { Component } from 'react'
import { connect } from 'react-redux'
import WorkCard from 'pages/WorkList/WorkCard'

class WorkList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <WorkCard />
            </div>
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