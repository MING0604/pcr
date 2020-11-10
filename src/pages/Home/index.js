import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd'
import MM from 'util/MM'

import './index.css'
import { Link } from 'react-router-dom'

const _mm = new MM()
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOwner: false,
            isManager: false,
            isUser: false,
            username:''
        }
    }
    componentDidMount(){
        let isOwner = _mm.getCookie('isOwner')
        let isManager = _mm.getCookie('isManager')
        let isUser = _mm.getCookie('isUser')
        let username = _mm.getCookie('username')
        this.setState({
            isOwner,
            isManager,
            isUser,
            username
        })
    }

    render() {
        const userList = [
            {
                name:'添加作业',
                url:'/newWork'
            },
            {
                name:'查看个人排刀推荐',
                url:'/workRecommend'
            },
            {
                name:'查看作业列表',
                url:'/workList'
            }
        ]
        const managerList =[...userList,{
            name:'修改角色和boss信息',
            url:'/baseDataList'
        }]
        const ownerList = [...managerList,{
            name:'管理用户权限',
            url:'/userControl'
        }]
        const cardList = (
            this.state.isOwner 
            ?
            ownerList
            :
            this.state.isManager
            ?
            managerList
            :
            userList
        )
        const menu = (
            <Menu>
                <Menu.Item>
                    <div onClick={()=>{_mm.logout()}}>退出登陆</div>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="index-page">
                <div className="background"></div>
                <div className="index-header">
                    <div className="index-title">公主连结会战作业管理系统</div>
                    <div className="index-flow">
                        {
                            this.state.isUser
                            ?
                            <Dropdown overlay={menu} >
                                <a className="ant-dropdown-link" onClick={e => {e.preventDefault()}}>
                                    <span>您好，{this.state.username}</span>
                                </a>
                            </Dropdown>
                            :
                            <Link to="/pageLogin" className="index-page-login-btn">尚未登录，请登录</Link>
                        }
                    </div>
                </div>
                <div className="index-wrap">
                    {
                        cardList.map((item,index)=>{
                            let { url, name } = item
                            return (
                                <Link key={index} to={url} className="card-item">
                                    <div className={'img img'+(index+1)}></div>
                                    <div className="name">{name}</div>
                                </Link>
                            )
                        })
                    }
                </div>
                
            </div>
        )
    }
}

export default App