import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'

import './index.css'
class DropDownMenu extends Component {
    render() {
        const menu = (
            <Menu>
              <Menu.Item>
                <Link to='/newWork'>添加作业</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/baseDataList'>修改角色和boss信息</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/workList'>查看作业列表</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/'>首页</Link>
              </Menu.Item>
              
            </Menu>
          );
        return (
            <Dropdown overlay={menu} className="DropDownMenu">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                菜单导航 
                </a>
            </Dropdown>
        )
    }
}

export default DropDownMenu