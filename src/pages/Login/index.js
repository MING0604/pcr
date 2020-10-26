import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux'

import './index.css'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password:''
        }
    }

    // 输入用户名/密码
    handleInputChange(e){
        let name = e.target.name,
            value = e.target.value
        this.setState({
            [name]:value
        })
    }

    // 对于回车的相应
    handleKeyUp(e){
        if(e.keyCode == 13){
            this.login()
        }
    }
    // 登陆
    login(){
        if(!this.state.username){
            alert('用户名不能为空！')
        }else if(!this.state.password){
            alert('密码不能为空！')
        }else if(this.state.username == this.props.userMsg.username 
            && this.state.password == this.props.userMsg.password){
                alert('登陆成功！')
                localStorage.setItem('ifLogin',true)
                window.history.back();
        }else{
            alert('用户名或密码错误')
        }
    }

    render() {
        return (
            <Form name="basic" className="login-form" >
                <Form.Item
                    label="用户名"
                    className="login-from-item"
                    >
                    <Input placeholder="请输入用户名" 
                        name="username"
                        onChange={(e)=>{this.handleInputChange(e)}}
                        onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    className="login-from-item"
                    >
                    <Input.Password placeholder="请输入密码"
                        name="password"
                        onChange={(e)=>{this.handleInputChange(e)}}
                        onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={()=>{this.login()}}>
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const mapSateToProps = (state)=>{
    return {
        userMsg: state.userMsg
    }
}


export default connect(mapSateToProps,null)(Login)