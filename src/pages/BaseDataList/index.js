import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Button, Divider, Input } from 'antd';
import { Link } from 'react-router-dom'

import { ADD_CHARACTER_ITEM, ADD_BOSS_ITEM, DELETE_BOSS_ITEM, DELETE_CHARACTER_ITEM } from 'store/ActionType'

import './index.css'

class BaseDataList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bossItem:'',
            characterItem:''
        }
    }
    componentWillMount(){
        let ifLogin = localStorage.getItem('ifLogin')
        if(!ifLogin){
            this.props.history.push('/login')
        }
    }
    // 删除boss数据
    deleteBossItem(item){
        if(window.confirm(`您确定要删除${item}吗？`)){
            this.props.deleteBoss(item)
        }
    }

    // 删除角色数据
    deleteCharacterItem(item){
        if(window.confirm(`您确定要删除${item}吗？`)){
            let characterObj = {name:item}
            this.props.deleteCharacter(characterObj)
        }
    }

    // 同步添加boss输入框与state
    addBossItem(bossItem){
        this.setState({
            bossItem
        })
    }

    // 同步添加character输入框与state
    addCharacterItem(characterItem){
        this.setState({
            characterItem
        })
    }
    render() {
        // 解析boss列表
        const bossList = this.props.bossData.map((bossItem)=>{
            return bossItem
        })
        
        // 解析角色列表
        const characterList = this.props.characterData.map((characterItem)=>{
            return characterItem.name
        })

        // 添加boss的输入框
        const addBossItem = (
            <div>
                <Input style={{width:'70%'}} 
                    value={this.state.bossItem}
                    onChange={(e)=>{this.addBossItem(e.target.value)}}></Input>
                <Button className="add-btn"
                    onClick={()=>{
                        this.setState({
                            bossItem:''
                        })
                        this.props.addBoss(this.state.bossItem)
                    }}>添加Boss</Button>
            </div>
        )

        // 添加角色的输入框
        const addCharacterItem = (
            <div>
                <Input style={{width:'70%'}}
                    value={this.state.characterItem}
                    onChange={(e)=>{this.addCharacterItem(e.target.value)}}></Input>
                <Button className="add-btn"
                    onClick={()=>{
                        this.props.addCharacter(this.state.characterItem)
                        this.setState({
                            characterItem:''
                        })
                    }}>添加角色</Button>
            </div>
        )

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
                    footer={addBossItem}
                    renderItem={item => (
                        <List.Item>
                            {item}
                            <Button type="danger" 
                                className='delete-btn'
                                onClick={()=>{this.deleteBossItem(item)}}>删除</Button>
                        </List.Item>
                    )}
                    />
                <Divider orientation="left">角色列表</Divider>
                <List
                    className="list"
                    size="small"
                    bordered
                    dataSource={characterList}
                    footer={addCharacterItem}
                    renderItem={item => (
                        <List.Item>
                            {item}
                            <Button type="danger" 
                                className='delete-btn'
                                onClick={()=>{this.deleteCharacterItem(item)}}>删除</Button>
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
        // 添加boss
        addBoss(bossMsg){
            const action={
                type:ADD_BOSS_ITEM,
                value:bossMsg
            }
            dispatch(action)
        },
        // 添加角色
        addCharacter(characterMsg){
            const action={
                type:ADD_CHARACTER_ITEM,
                value:characterMsg
            }
            dispatch(action)
        },
        // 删除boss
        deleteBoss(bossMsg){
            const action = {
                type:DELETE_BOSS_ITEM,
                value: bossMsg
            }
            dispatch(action)
        },
        // 删除角色
        deleteCharacter(characterObj){
            const action = {
                type:DELETE_CHARACTER_ITEM,
                value: characterObj
            }
            dispatch(action)
        }
        
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(BaseDataList)