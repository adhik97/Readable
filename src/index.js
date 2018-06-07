import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'react'
import { Provider } from 'react-redux'

//const store=createStore(reducer)


ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
