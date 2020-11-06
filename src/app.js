import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Home from 'pages/Home'
import AddWork from 'pages/AddWork'
import WorkList from 'pages/WorkList'
import BaseDataList from 'pages/BaseDataList'
import Login from 'pages/Login'
import Register from 'pages/Register'
import UserControl from 'pages/UserControl'
import './index.css'

import 'antd/dist/antd.css'
ReactDom.render(
    <Router>
        <Switch>
            <Route path='/' render={()=>{
                return(
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/newWork' component={AddWork}/>
                        <Route path='/workList' component={WorkList}/>
                        <Route path='/baseDataList' component={BaseDataList}/>
                        <Route path='/pageLogin' component={Login}/>
                        <Route path='/pageRegister' component={Register}/>
                        <Route path='/userControl' component={UserControl}/>
                    </Switch>
                )
            }}/>
        </Switch>
    </Router>,
    document.querySelector('#app')
)