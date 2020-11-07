import React, { Component } from 'react'
import { Button, Select } from 'antd';
import MM from 'util/MM'

import './index.css'

const { Option } = Select;
const _mm = new MM()

class SelectHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bossSelect: "全部boss",
            characterSelect: [],
            bossList: [],
            characterList: []
        }
    }

    async componentDidMount(){
        // 异步请求，获取boss和角色列表
        let characterList = await _mm.request({
            url: '/getCharacter'
        })
        let bossList = await _mm.request({
            url:'/getBoss'
        })
        characterList = characterList.map((item)=>{
            return item.name
        })
        this.setState({
            characterList,
            bossList
        })
    }
    // 选择筛选boss的type
    async onBossBoxChange(value) {
        await this.setState({
            bossSelect: value
        })
    }
    // 选择不想显示的角色
    async onCharacterBoxChange(characterHideList){
        await this.setState({
            characterSelect:characterHideList
        })
    }
    // 确认筛选
    handleSelectBtn(){
        let selectObj = {
            bossSelect: this.state.bossSelect,
            characterSelect: this.state.characterSelect
        }
        this.props.handleWorkSelect(selectObj)
    }
    render() {
        return (
            <div>
                <label className="select-header-label">boss筛选</label>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    value={this.state.bossSelect}
                    onChange={(value)=>{this.onBossBoxChange(value)}}

                >
                    <Option value="全部boss">全部boss</Option>
                    <Option value="A面boss">A面boss</Option>
                    <Option value="B面boss">B面boss</Option>
                    {
                        this.state.bossList.map((item, index)=>{
                            return (
                                <Option key={index} value={item}>{item}</Option>
                            )
                        })
                    }
                </Select>
                <br/>
                <label className="select-header-label">不想显示的角色</label>
                <Select
                mode="multiple"
                style={{ minWidth: '30%' }}
                allowClear
                placeholder="选择不想显示的角色"
                onChange={(characterHideList)=>{this.onCharacterBoxChange(characterHideList)}}
                value={this.state.characterSelect}
                >
                    {
                        this.state.characterList.map((characterItem,index)=>{
                            return <Option key={index} value={characterItem}>{characterItem}</Option>
                        })
                    }

                </Select>
                <br />
                <Button className="selecter-header-confirm-btn" onClick={()=>{this.handleSelectBtn()}}>确认筛选</Button>

            </div>
        )
    }
}

export default SelectHeader