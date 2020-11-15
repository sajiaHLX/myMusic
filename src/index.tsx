import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes/index';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'http://localhost:9000';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter><App />{renderRoutes(routes)}</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
