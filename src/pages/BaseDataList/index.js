import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Button, Divider } from 'antd';
import { Link } from 'react-router-dom'

import './index.css'

class BaseDataList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    componentWillMount(){
        let ifLogin = localStorage.getItem('ifLogin')
        if(!ifLogin){
            this.props.history.push('/login')
        }
    }
    render() {
        const bossList = this.props.bossData.map((bossItem)=>{
            let stage = String.fromCharCode(65+bossItem.stage-1)
            return `${stage}${bossItem.bossId}${bossItem.name}`
        })
        
        const characterList = this.props.characterData.map((characterItem)=>{
            return characterItem.name
        })
        return (
            <div className="base-data-list">
                <Button type="primary" className='switch-btn'>
                    <Link to='/'>返回首页</Link>
                </Button>
                <Divider orientation="left">Boss列表</Divider>
                <List
                    className="list"
                    size="small"
                    bordered
                    dataSource={bossList}
                    footer={<div>Footer</div>}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                    />
                <Divider orientation="left">角色列表</Divider>
                <List
                    className="list"
                    size="small"
                    bordered
                    dataSource={characterList}
                    footer={<div>Footer</div>}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                    />
            </div>
        )
    }
}

const mapSateToProps = (state)=>{
    return {
        bossData:state.bossData,
        characterData:state.characterData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(BaseDataList)