import React, { Component } from 'react'
import { List, Button, Divider, Input } from 'antd';
import { Link } from 'react-router-dom'


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
            // 异步请求，删除boss吧！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
            // this.props.deleteBoss(item)
        }
    }

    // 删除角色数据
    deleteCharacterItem(item){
        if(window.confirm(`您确定要删除${item}吗？`)){
            let characterObj = {name:item}
            // 异步请求，删除角色 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
            // this.props.deleteCharacter(characterObj)
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

    // 相应添加boss的回车
    handleAddBossKey(e){
        if(e.keyCode == 13){
            this.handleAddBossBtn()
        }
    }

    // 相应添加角色的回车
    handleAddCharacterKey(e){
        if(e.keyCode == 13){
            this.handleAddCharacterBtn()
        }
    }

    // 点击添加boss
    handleAddBossBtn(){
        this.setState({
            bossItem:''
        })
        // 异步请求，添加boss ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // this.props.addBoss(this.state.bossItem)
    }

    // 点击添加角色
    handleAddCharacterBtn(){
        // 异步请求，添加角色 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // this.props.addCharacter(this.state.characterItem)
        this.setState({
            characterItem:''
        })
    }

    // 清除boss列表
    clearBossList(){
        const flag = window.confirm('您确定要删除全部boss的数据吗，此行为不可逆,(需确认三次，第一次确认)') 
            && window.confirm('您确定要删除全部boss的数据吗，此行为不可逆,(需确认三次，第二次确认)')
            && window.confirm('您确定要删除全部boss的数据吗，此行为不可逆,(需确认三次，第三次确认)')
        if(!flag) return false
        // 异步请求，清除boss列表 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // this.props.clearBossList()
    }
    render() {
        // 解析boss列表
        // 异步请求，请求boss数据 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // const bossList = this.props.bossData.map((bossItem)=>{
        //     return bossItem
        // })
        const bossList = ['一王','二王']
        
        // 解析角色列表
        // 异步请求，请求角色数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // const characterList = this.props.characterData.map((characterItem)=>{
        //     return characterItem.name
        // })
        const characterList = ['狗拳','狼姐','猫拳']

        // 添加boss的输入框
        const addBossItem = (
            <div>
                <Input style={{width:'70%'}} 
                    value={this.state.bossItem}
                    onChange={(e)=>{this.addBossItem(e.target.value)}}
                    onKeyUp={(e)=>{this.handleAddBossKey(e)}}></Input>
                <Button className="add-btn"
                    onClick={()=>{this.handleAddBossBtn()}}>添加Boss</Button>
            </div>
        )

        // 添加角色的输入框
        const addCharacterItem = (
            <div>
                <Input style={{width:'70%'}}
                    value={this.state.characterItem}
                    onChange={(e)=>{this.addCharacterItem(e.target.value)}}
                    onKeyUp={(e)=>{this.handleAddCharacterKey(e)}}></Input>
                <Button className="add-btn"
                    onClick={()=>{this.handleAddCharacterBtn()}}>添加角色</Button>
            </div>
        )

        return (
            <div className="base-data-list">
                <Button type="primary" className='switch-btn'>
                    <Link to='/'>返回首页</Link>
                </Button>
                <Button className="clear-boss-btn" onClick={()=>{this.clearBossList()}}>删除全部boss</Button>
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


export default BaseDataList