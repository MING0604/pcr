import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from 'pages/index'
import { Provider } from 'react-redux'
import store from 'store'

ReactDom.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.querySelector('#app')
)