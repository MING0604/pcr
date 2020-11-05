import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Home from 'pages/Home'
import AddWork from 'pages/AddWork'
import WorkList from 'pages/WorkList'
import BaseDataList from 'pages/BaseDataList'
import Login from 'pages/Login'
import Test from './test.js'
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
                        <Route path='/login' component={Login}/>
                        <Route path='/test' component={Test}/>
                    </Switch>
                )
            }}/>
        </Switch>
    </Router>,
    document.querySelector('#app')
)