import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'
import './style.less';
import 'survey-react/modern.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';

ReactGA.initialize('G-10200MK17G', { debug: true });
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

hotjar.initialize(2353561, 6);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
