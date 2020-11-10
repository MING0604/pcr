import React, { PureComponent } from 'react'
import { List, Divider, Button } from 'antd';

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import './index.css'

const _mm = new MM()
class UserControl extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userList:[]
        }
    }
    async componentDidMount(){
        // 查看是否具有权限
        let isOwner = await _mm.isOwner()
        if(!isOwner){
            this.props.history.push('/pageLogin')
            return
        }
        this.getUserList()
        
    }
    // 获取用户列表信息
    async getUserList(){
        let { userMsg:userList } = await _mm.request({
            url:'/getUserListMsg'
        })
        this.setState({
            userList
        })
    }

    // 设置/撤销管理员权限
    async handleManager(actionType,username){
        if(actionType === 'add'){
            if(!window.confirm(`您确定要将${username}设置为管理员吗`)) return false
            await _mm.request({
                type: 'post',
                url: '/addManager',
                data: {
                    username
                }
            })
            alert('设置权限成功')
        }
        if(actionType === 'delete'){
            if(!window.confirm(`您确定要删除${username}的管理员权限吗`)) return false
            await _mm.request({
                type: 'post',
                url: '/deleteManager',
                data: {
                    username
                }
            })
            alert('删除权限成功')
        }
        this.getUserList()
    }

    // 设置/撤销拥有者权限
    async handleOwner(actionType,username){
        if(actionType === 'add'){
            if(!window.confirm(`您确定要将${username}设置为拥有者吗`)) return false
            await _mm.request({
                type: 'post',
                url: '/addOwner',
                data: {
                    username
                }
            })
            alert('设置权限成功')
        }
        if(actionType === 'delete'){
            if(!window.confirm(`您确定要删除${username}的拥有者权限吗`)) return false
            await _mm.request({
                type: 'post',
                url: '/deleteOwner',
                data: {
                    username
                }
            })
            alert('删除权限成功')
        }
        this.getUserList()
    }

    render() {
        const data = this.state.userList.map((userItem,index)=>{
            let { username, password, isManager, isOwner } = userItem
            let handleManagerActionType = isManager?'delete':'add'
            let handleOwnerActionType = isOwner?'delete':'add'
            return (
                <div className="user-item">
                    <div>用户名：<span className="username">{username}</span></div>
                    <div>密码：<span className="password">{password}</span></div>
                    <div>
                        权限: 
                        {
                            isOwner?
                            <span>拥有者</span>
                            :
                            isManager?
                            <span>管理员</span>
                            :
                            <span>用户</span>
                        }
                    </div>
                    <div className="btn">
                        <Button type={isManager?'danger':''} 
                            onClick={(e)=>{this.handleManager(handleManagerActionType,username)}}>
                                {isManager?'撤销管理员':'设为管理员'}
                        </Button>
                        <Button className="set-owner-btn" 
                            type={isOwner?'danger':''} 
                            onClick={(e)=>{this.handleOwner(handleOwnerActionType,username)}}>
                            {isOwner?'撤销拥有者':'设为拥有者'}
                        </Button>
                    </div>
                </div>
            )
        })
        // console.log(data)
        return (
            <div>
                <DropDownMenu />
                <div className="user-control-list">
                    <Divider orientation="left">用户列表</Divider>
                        <List
                        bordered
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default UserControl