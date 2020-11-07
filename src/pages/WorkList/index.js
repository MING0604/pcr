import React, { Component } from 'react'
import { Collapse, Modal, Button, Empty } from 'antd';
import { Link } from 'react-router-dom';

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'
import SelectHeader from 'modules/SelectHeader';

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
            url:'/getWorkList'
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
    async deleteWork(wid){
        let flag = window.confirm('确定要删除这个作业吗')
        if(!flag) return
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
    // 筛选出想要的作业
    async handleWorkSelect(selectObj){
        await this.getWorkList()
        let workList = this.state.workList
        workList = _mm.selectWorkList(workList,selectObj)
        this.setState({
            workList
        })

    }
    render() {
        const { Panel } = Collapse;
        const listDom = this.state.workList.map((workItem)=>{
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
            const managerBtn = (
                <div className="managerBtn">
                    <Button  >
                        <Link to={`/newWork/${wid}`}>编辑该作业</Link>
                    </Button>
                    <Button type="danger" onClick={()=>{this.deleteWork(wid)}}>删除该作业</Button>
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
                            managerBtn
                        :
                        null

                    }
                </Panel>
            )
            
        })
        return (
            <div>
                <DropDownMenu />
                <div className="select-header">
                    <SelectHeader 
                        handleWorkSelect={(selectObj)=>{this.handleWorkSelect(selectObj)}}/>
                </div>
                <div className="work-list">
                    <Collapse >
                        {
                            listDom
                        }
                    </Collapse>
                    {
                        this.state.workList.length
                        ?
                        null
                        :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </div>

            </div>
        )
    }
}


export default WorkList