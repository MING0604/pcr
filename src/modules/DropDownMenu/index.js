import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'

import MM from 'util/MM'

import './index.css'

const _mm = new MM()

class DropDownMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isManager: false,
      isOwner: false,
      username:''
    }
  }
  componentDidMount(){
    let isOwner = _mm.getCookie('isOwner')
    let isManager = _mm.getCookie('isManager')
    let username = _mm.getCookie('username')
    this.setState({
      isManager,
      isOwner,
      username
    })
  }
  render() {
      //拥有者权限下显示的导航 
      const ownerList = (
        <Menu>
          <Menu.Item>
            <Link to='/'>首页</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/newWork'>添加作业</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/workRecommend'>查看个人排刀推荐</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/workList'>查看作业列表</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/baseDataList'>修改角色和boss信息</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/userControl'>管理用户权限</Link>
          </Menu.Item>
          <Menu.Item>
            <div onClick={()=>{_mm.logout()}}>退出登陆</div>
          </Menu.Item>

        </Menu>
        );
      // 管理员权限下的导航
      const managerList = (
        <Menu>
          <Menu.Item>
            <Link to='/'>首页</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/newWork'>添加作业</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/workRecommend'>查看个人排刀推荐</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/baseDataList'>修改角色和boss信息</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/workList'>查看作业列表</Link>
          </Menu.Item>
          <Menu.Item>
            <div onClick={()=>{_mm.logout()}}>退出登陆</div>
          </Menu.Item>

        </Menu>
      );
      // 用户权限下的导航
      const userList = (
        <Menu>
          <Menu.Item>
            <Link to='/'>首页</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/newWork'>添加作业</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/workRecommend'>查看个人排刀推荐</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/workList'>查看作业列表</Link>
          </Menu.Item>
          <Menu.Item>
            <div onClick={()=>{_mm.logout()}}>退出登陆</div>
          </Menu.Item>
          
        </Menu>
      );

      const menu = (
        this.state.isOwner ? ownerList
        :
        this.state.isManager ? managerList
        :
        userList
      )
      
      return (
          <Dropdown overlay={menu} className="DropDownMenu">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {
                  this.state.username ? <span className="username">您好，{this.state.username}</span> : null
                }
                
                <span>菜单导航</span>
              
              </a>
          </Dropdown>
      )
  }
}

export default DropDownMenu