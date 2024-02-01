import React from 'react'
import ReactDOM from 'react-dom/client'

import axios from 'axios';

import App from './App.tsx'

import { BASE_API_URL } from "./api/endpoints.ts";

import './index.css'

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.get["X-RapidAPI-Key"] = __RAPID_API_KEY__;
axios.defaults.headers.get["X-RapidAPI-Host"] = __RAPID_API_HOST__;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
