import React, { Component } from 'react'
import { Collapse, Modal } from 'antd';

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import './index.css'

const _mm = new MM()
class WorkList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            previewVisible: false,
            workList:[]
        }
    }
    // 异步请求作业列表
    async componentDidMount(){
        let workList = await _mm.request({
            url:'/getWork'
        })
        console.log(workList)
        this.setState({
            workList
        })
    }
    // 显示图片
    showImg(previewImg){
        this.setState({
            previewVisible:true,
            previewImg
        },()=>{
            console.log(this.state)
        })  
    }
    // 隐藏图片
    handleCancel(){
        this.setState({ previewVisible: false });  
    }

    render() {
        const { Panel } = Collapse;
        return (
            <div>
                <DropDownMenu />
                <div className="work-list">
                    <Collapse >
                        {
                            this.state.workList.map((workItem)=>{
                                let characterList = workItem.characterList.toString(),
                                    bossName = workItem.bossName,
                                    damage = workItem.damage,
                                    workMessage = workItem.workMessage,
                                    workType = workItem.workType,
                                    wid = workItem.wid
                                let header = (
                                    <div className="work-item">
                                        <div>{`boss： ${bossName}`}</div>
                                        <div>{`阵容： ${characterList}`}</div>
                                        <div>{`标伤： ${damage}`}</div>
                                    </div>
                                )
                                return (
                                    <Panel key={wid} header={header}>
                                        {
                                            workType == 'url'
                                            ?
                                            <a href={workMessage} target="_blank" >作业链接：{workMessage}</a>
                                            :
                                            <div>
                                                <img style={{width:"80px"}} 
                                                    src={workMessage}
                                                    onClick={()=>{this.showImg(workMessage)}}></img>
                                                <Modal
                                                visible={this.state.previewVisible}
                                                onCancel={()=>{this.handleCancel()}}
                                                >
                                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImg} />
                                                </Modal>
                                            </div>
                                        }
                                    </Panel>
                                )
                                
                            })
                        }
                    </Collapse>
                </div>

            </div>
        )
    }
}


export default WorkList