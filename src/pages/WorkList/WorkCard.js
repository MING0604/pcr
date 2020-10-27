import React, { Component } from 'react'
import { Collapse } from 'antd';

class WorkCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    callback(key) {
        console.log(key);
    }
    render() {
        const { Panel } = Collapse;

        const text = `
            A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
        `;

        return (
            <Collapse defaultActiveKey={['1']} onChange={(key)=>{this.callback(key)}}>
                <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" disabled>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        )
    }
}

export default WorkCard