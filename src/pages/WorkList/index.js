import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapse, Modal } from 'antd';
import jsonP from 'jsonp'
import MM from 'util/MM'
import './index.css'

const _mm = new MM()
class WorkList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            previewVisible: false
        }
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

    // 测试接口
    testClick(){
        _mm.request({
            type:'post',
            url:'/test',
            data:{
                name:'修改boss数目'
            }
        }).then(res=>{
            console.log(res)
        })
    }

    render() {
        const { Panel } = Collapse;
        return (
            <div>
                <button onClick={()=>{this.testClick()}}>344</button>
                <div className="work-list">
                    <Collapse >
                        {
                            this.props.workList.map((workItem)=>{
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

const mapSateToProps = (state)=>{
    return {
        workList:_mm.sortOnBossAndDamage(state.workList)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(WorkList)