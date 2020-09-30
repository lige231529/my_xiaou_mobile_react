import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from "./App"

import { HashRouter } from "react-router-dom"

import "./assets/css/style.css"
import store from "./store"
Component.prototype.$store = store;

ReactDOM.render(<HashRouter><App /></HashRouter>,document.getElementById('root'));

