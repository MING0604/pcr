import React, { Component } from 'react'
import { Card, Collapse, Input } from 'antd';
import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import getRecommendList from './algorithm.js'
import './index.css'
const _mm = new MM()
const { Panel } = Collapse;
const { TextArea } = Input
class WorkRecommend extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recommendWorkList: []
        }
    }
    async componentDidMount(){
        // 判断用户是否登陆
        let isUser = _mm.isUser()
        if(!isUser){
            this.props.history.push('/pageLogin')
            return
        }
        const totalWorkList = await _mm.request({
            url:'/getWorkList'
        })
        const recommendWorkList = getRecommendList(totalWorkList)
        // console.log(recommendWorkList)
        _mm.sortOnTotalDamage(recommendWorkList)
        // console.log(recommendWorkList)
        this.setState({
            recommendWorkList
        })
    }
    
    render() {
        const recommendCardList = (
            this.state.recommendWorkList.map((recommendItem,index1)=>{
                let title = (
                    <div className="recommend-item-title">
                        <span>{`三刀Boss： ${recommendItem.workList.map((item)=>{
                            return " " + item.bossName
                        })}`}</span>
                        <span>{`总伤害： ${recommendItem.totalDamage} W`}</span>
                    </div>
                )
                return(
                    <div key={index1} className="recommend-item">
                        <Card title={title} bordered={false}>
                            <Collapse>
                                {
                                    recommendItem.workList.map((workItem,index3)=>{
                                        const { bossName, damage, characterList, workType, workMessage, wid, remark } = workItem
                                        const header = (
                                            <div className="work-item-header">
                                                <div className="bossName">{`boss： ${bossName}`}</div>
                                                <div className="characterList">{`阵容： ${characterList}`}</div>
                                                <div className="damage">{`标伤： ${damage}W`}</div>
                                            </div>
                                        )
                                        return (
                                            <Panel key={index3} header={header} key={wid}>
                                                {
                                                    workType === 'url'
                                                    ?
                                                    <a href={workMessage} target="_blank" >作业链接：{workMessage}</a>
                                                    :
                                                    workType === 'image'
                                                    ?
                                                    <div>
                                                        图片显示器（还没做完）
                                                        {/* <img style={{width:"80px"}} 
                                                            src={workMessage}
                                                            onClick={()=>{this.showImg(workMessage)}}></img>
                                                        <Modal
                                                        visible={this.state.previewVisible}
                                                        onCancel={()=>{this.handleCancel()}}
                                                        >
                                                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImg} />
                                                        </Modal> */}
                                                    </div>
                                                    :
                                                    workType === 'text'
                                                    ?
                                                    <Input.TextArea className="textMsg" autoSize disabled value={workMessage}/>
                                                    :
                                                    null
                                                }
                                                <div className="remark">
                                                    <label>备注</label>
                                                    <TextArea
                                                        autoSize
                                                        disabled
                                                        placeholder="无备注~"
                                                        value={remark}></TextArea>
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }
                            </Collapse>
                        </Card>
                    </div>
                )
            })
        )
        // console.log(recommendCardList)
        return (
            <div className="work-recommend-page">
                <div className='background'></div>
                <DropDownMenu />
                <div className="recommend-wrapper">
                    {
                        recommendCardList
                    }
                </div>
            </div>
        )
    }
}

export default WorkRecommend