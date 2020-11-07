import React, { Component } from 'react'
import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

const _mm = new MM()
class WorkRecommend extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <DropDownMenu />
            </div>
        )
    }
}

export default WorkRecommend