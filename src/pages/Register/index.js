import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import './index.css'

const _mm = new MM()

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password1:'',
            password2:''
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
            this.register()
        }
    }
    // 登陆
    async register(){
        if(!this.state.username){
            alert('用户名不能为空！')
        }else if(this.state.username.length < 4){
            alert('用户名不能少于4个字符！')
        }else if(this.state.username.length > 12){
            alert('用户名不能多于12个字符')
        }else if(!this.state.password1){
            alert('密码不能为空！')
        }else if(!this.state.password2){
            alert('确认密码不能为空！')
        }else if(this.state.password1 !== this.state.password2){
            alert('两次输入的密码不一致')
        }else {
            // 异步请求，注册
            let res = await _mm.request({
                type:'post',
                url:'/register',
                data:{
                    username: this.state.username,
                    password: this.state.password2,
                    isManager:false,
                    isOwner: false
                }
            })
            if(res.status === 200){
                alert('注册成功！')
                window.history.back()
            }else{
                alert('用户名已被申请')
            }
        }
    }

    render() {
        return (
            <Form name="basic" className="page-register">
                <div className="register-wrap">
                    <div className="register-form" >
                        <div className="switch-btn">
                            <DropDownMenu />
                        </div>
                        <div className="inputBox">
                            <Form.Item
                                label="用户名"
                                className="login-from-item"
                                >
                                <Input placeholder="请输入用户名，长度4-12个字符" 
                                    name="username"
                                    onChange={(e)=>{this.handleInputChange(e)}}
                                    onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                className="login-from-item"
                                >
                                <Input.Password placeholder = "请输入密码"
                                    name="password1"
                                    onChange={(e)=>{this.handleInputChange(e)}}
                                    onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
                            </Form.Item>

                            <Form.Item
                                label="确认密码"
                                className="login-from-item"
                                >
                                <Input.Password placeholder = "确认密码"
                                    name="password2"
                                    onChange={(e)=>{this.handleInputChange(e)}}
                                    onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" onClick={()=>{this.register()}}>
                                    注册
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
		
	            </div>
                
            </Form>
        )
    }
}



export default Register