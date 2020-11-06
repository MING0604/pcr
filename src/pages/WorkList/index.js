import React, { Component } from 'react'
import { Collapse, Modal, Button } from 'antd';

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import './index.css'

const _mm = new MM()
class WorkList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            previewVisible: false,
            workList:[],
            isManager:false
        }
    }
    // 初始化列表
    componentDidMount(){
        // 判断用户是否登陆
        let isUser = _mm.isUser()
        if(!isUser){
            this.props.history.push('/pageLogin')
            return
        }
        // 查看用户权限
        let isManager = _mm.getCookie('isManager')
        this.setState({
            isManager
        })
        this.getWorkList()
    }
    // 异步并同步请求作业列表
    async getWorkList(){
        let workList = await _mm.request({
            url:'/getWork'
        })
        _mm.sortOnBossAndDamage(workList)
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
    // 删除作业
    async deleteWork(e){
        let flag = window.confirm('确定要删除这个作业吗')
        if(!flag) return
        let targetNode = e.target.parentNode.parentNode.parentNode
        let arr = targetNode.className.split(' ')
        let wid = parseInt(arr[arr.length - 1])
        let res = await _mm.request({
            type:'post',
            url:'/deleteWork',
            data:wid
        })
        if(res.status === 200){
            alert('删除成功')
        }else{
            alert('在删除的过程中出现了bug，请联系手捧初梦(管理人)')
        }
        this.getWorkList()
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
                                    <div className="work-item-header">
                                        <div className="bossName">{`boss： ${bossName}`}</div>
                                        <div className="characterList">{`阵容： ${characterList}`}</div>
                                        <div className="damage">{`标伤： ${damage}W`}</div>
                                    </div>
                                )
                                return (
                                    <Panel key={wid} header={header} data-wid={wid} className={wid}>
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
                                        {
                                            this.state.isManager
                                            ?
                                            <Button type="danger" className="delete-work-btn" onClick={(e)=>{this.deleteWork(e)}}>删除该作业</Button>
                                            :
                                            null

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