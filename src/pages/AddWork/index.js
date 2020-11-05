import React, { Component } from 'react'
import { Form, Select, Button,Input  } from 'antd';
import { Link } from 'react-router-dom';
import ImageUploader from './ImageUpload';
import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import axios from 'axios'

import './index.css'

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
            bossData:[]
        }
        
    }

    // 异步请求角色和boss数据
    async componentDidMount(){
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
    onSubmit(){
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
        }else{

            // 进行异步请求，将作业信息发到后端 
            
            delete data.bossData
            delete data.characterData
            _mm.request({
                type:'post',
                url:'/addWork',
                data
            })
            alert('添加成功！')
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
            <div>
                <DropDownMenu />
                <div className="addWork">
                    <Form  name="nest-messages" className="addWorkFrom" >
                        <Form.Item label="boss" >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeho lder="选择作业boss"
                            onChange={(bossName)=>{this.handleBossChange(bossName)}}
                            
                        >
                            {
                                this.state.bossData.map((bossItem,index)=>{
                                    let stage = String.fromCharCode(65+bossItem.stage-1)
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
                            >
                                {
                                    this.state.characterData.map((characterItem,index)=>{
                                        return <Option key={index} value={characterItem.name}>{characterItem.name}</Option>
                                    })
                                }
                            </Select>
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
                        </Form.Item>
                        {
                            this.state.workType == 'image'
                            ?
                            <ImageUploader handleWork={(workMessage)=>{this.handleWork(workMessage)}} />
                            :
                            <Form.Item >
                                <Input placeholder="作业地址" 
                                    onChange={(e)=>{this.handleWork(e.target.value)}} 
                                    />
                            </Form.Item>
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