import React from 'react'
import ReactDOM from 'react-dom'
import App from './web/app'
import './index.css'
import { StateProvider } from './web/store'

const app = (
  <StateProvider>
    <App />
  </StateProvider>
)

ReactDOM.render(app, document.getElementById('root'))
