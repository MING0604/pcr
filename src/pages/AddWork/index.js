import React, { Component } from 'react'
import { Form, Select, Button,Input  } from 'antd';
import ImageUploader from './ImageUpload';
import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import './index.css'

const { TextArea } = Input;
const _mm = new MM()
const { Option } = Select;

class AddWork extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bossName:'',
            characterList:[],
            damage:null,
            workMessage:'',
            workType:'url',
            characterData:[],
            bossData:[],
            isModify:false,
            wid:0,
            remark:''
        }
        
    }

    async componentDidMount(){
        // 判断用户是否登陆
        let isUser = _mm.isUser()
        if(!isUser){
            this.props.history.push('/pageLogin')
            return
        }
        let isManager = _mm.isManager()
        if(!isManager){
            this.props.history.push('/pageLogin')
            return
        }
        // 异步请求角色和boss数据
        let characterData = await _mm.request({
            url:'/getCharacter'
        })
        let bossData = await _mm.request({
            url:'/getBoss'
        })
        this.setState({
            characterData,
            bossData
        })
        // 当具有wid时，请求响应wid对应的数据
        if(this.props.match.params.wid){
            let wid = parseInt(this.props.match.params.wid)
            let res = await _mm.request({
                type:'post',
                url:'/getWorkItem',
                data:{wid:wid}
            })
            this.setState({
                bossName:res.bossName,
                damage:res.damage,
                workMessage:res.workMessage,
                workType:res.workType,
                characterList:res.characterList,
                isModify:true,
                wid:res.wid,
                remark:res.remark
            })
        }
    }
    // 修改作业boss目标
    handleBossChange(bossName) {
        this.setState({
            bossName
        })
    }
    
    // 修改作业阵容
    handleCharacterChange(characterList) {
        this.setState({
            characterList
        })
    }
    // 修改作业的备注
    handleRemark({target:{value:remark}}){
        this.setState({
            remark
        })
        // console.log(remark)
    }

    // 修改作业伤害
    handleDamageChange(e){
        let damage,
            value = e.target.value
        if(!value){
            this.setState({
                damage:null
            })
            return null
        }
        if(parseInt(value)!=value){
            return null
        }

        damage = parseInt(value)
        this.setState({
            damage
        })
    }

    // 提交作业
    async onSubmit(){
        let urlReg = /((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)/
        let data = this.state
        // 判断作业是否完整
        if(data.bossName==''){
            alert('请选择作业对应的boss')
        }else if(data.characterList.length !=5){
            alert('请选择该作业的完整阵容')
        }else if(!data.damage){
            alert('请输入该作业的预期伤害')
        }else if(!data.workMessage){
            alert('请输入该作业所对应的轴')
        }else if(data.workType === 'url' && !urlReg.test(data.workMessage)){
              alert('请输入完整有效的作业链接')  
        }else {
            
            // 进行异步请求，将作业信息发到后端 
            
            delete data.bossData
            delete data.characterData
            if(data.isModify){
                await _mm.request({
                    type:'post',
                    url:'/deleteWork',
                    data:{
                        wid:data.wid
                    }
                })
            }
            await _mm.request({
                type:'post',
                url:'/addWork',
                data
            })
            if(data.isModify){
                alert('修改成功！')
            }else{
                alert('添加成功')
            }
            this.props.history.push('/workList')
        }
        
    }

    // 选择作业类型
    handleType(workType){
        this.setState({
            workType
        })
    }

    // 输入作业内容
    handleWork(workMessage){
        this.setState({
            workMessage
        })

    }

    render() {
        return (
            <div className="addWorkPage">
                <div className="background"></div>
                <DropDownMenu />
                <div className="addWork">
                    <Form  name="nest-messages" className="addWorkFrom" >
                        <Form.Item label="boss" >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeho lder="选择作业boss"
                            onChange={(bossName)=>{this.handleBossChange(bossName)}}
                            value = {this.state.bossName}
                        >
                            {
                                this.state.bossData.map((bossItem,index)=>{
                                    return (
                                        <Option key={index} value={bossItem}>
                                            {bossItem}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                        </Form.Item>
                        <Form.Item label="阵容" >
                            <Select
                            mode="multiple"
                            allowClear
                            placeholder="选择阵容角色"
                            onChange={(characterList)=>{this.handleCharacterChange(characterList)}}
                            value={this.state.characterList}
                            >
                                {
                                    this.state.characterData.map((characterItem,index)=>{
                                        return <Option key={index} value={characterItem.name}>{characterItem.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="备注" >
                            <TextArea autoSize 
                                placeholder="作业中角色的星级以及rank相关信息的备注（选填）" 
                                onChange={(value)=>{this.handleRemark(value)}}
                                value={this.state.remark}></TextArea>
                        </Form.Item>
                        <Form.Item label="标伤" >
                            <Input style={{ width: 200 }} 
                                addonAfter="W" 
                                placeholder="预期伤害" 
                                onChange={(e)=>{this.handleDamageChange(e)}} 
                                value={this.state.damage}
                                />
                        </Form.Item>
                        <Form.Item label="作业类型" >
                            <Button name='image' disabled onClick={(e)=>{this.handleType(e.target.name)}}>图片</Button> 
                            <Button name='url' onClick={(e)=>{this.handleType(e.target.name)}}>链接</Button> 
                            <Button name='text' onClick={(e)=>{this.handleType(e.target.name)}}>文字轴</Button> 
                        </Form.Item>
                        {
                            this.state.workType === 'image'
                            ?
                            <ImageUploader handleWork={(workMessage)=>{this.handleWork(workMessage)}} />
                            :
                            this.state.workType === 'url'
                            ?
                            <Form.Item >
                                <Input placeholder="作业地址" 
                                    value={this.state.workMessage}
                                    onChange={(e)=>{this.handleWork(e.target.value)}} 
                                    />
                            </Form.Item>
                            :
                            this.state.workType === 'text'
                            ?
                            <div className="textWork">
                                <Input.TextArea autoSize 
                                    placeholder="请输入文字轴" 
                                    value={this.state.workMessage}
                                    onChange={(e)=>{this.handleWork(e.target.value)}} ></Input.TextArea>
                            </div>
                            :
                            <div>出bug了，请联系手捧初梦（管理人）</div>
                        }
                        <Form.Item >
                            <Button type="primary" 
                                htmlType="submit"
                                onClick={()=>{this.onSubmit()}}>
                            提交
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
            )
    }
}



export default AddWork