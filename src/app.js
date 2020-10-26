import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import store from 'store'
import Home from 'pages/Home'
import AddWork from 'pages/AddWork'
import WorkList from 'pages/WorkList'
import BaseDataList from 'pages/BaseDataList'
import Login from 'pages/Login'
import './index.css'

import 'antd/dist/antd.css'
ReactDom.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/' render={()=>{
                    return(
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/addWork' component={AddWork}/>
                            <Route path='/workList' component={WorkList}/>
                            <Route path='/baseDataList' component={BaseDataList}/>
                            <Route path='/login' component={Login}/>
                        </Switch>
                    )
                }}/>
            </Switch>
        </Router>
    </Provider>,
    document.querySelector('#app')
)