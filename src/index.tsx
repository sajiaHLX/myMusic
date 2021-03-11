import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@page/homePage';
import './index.less';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'http://localhost:9001';
axios.interceptors.request.use(
  config => {
    config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 6000
    let token = window.localStorage.getItem('token')
    if (token) {
      config.headers = {
        'access-token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    if (config.url === 'refresh') {
      config.headers = {
        'refresh-token': sessionStorage.getItem('refresh_token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HomePage></HomePage>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
