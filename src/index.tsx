import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from 'axios';

import App from './App.tsx';
import MusicPlayer from "./components/music-player/music-player.tsx";
import Main from "./components/main/main.tsx";

import loadersCol from "./routes-loaders.ts";

import { BASE_API_URL } from "./api/endpoints.ts";
import { ROUTES } from "./const/routes.ts";

import './index.css'

axios.defaults.baseURL = BASE_API_URL;
// @ts-expect-error Will be added lately
axios.defaults.headers.get["X-RapidAPI-Key"] = __RAPID_API_KEY__;
// @ts-expect-error Will be added lately
axios.defaults.headers.get["X-RapidAPI-Host"] = __RAPID_API_HOST__;

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
    children: [
      {
        path: ROUTES.MAIN,
        element: <Main />,
      },
      {
        path: ROUTES.SEARCH_RESULT,
        element: <MusicPlayer />,
        loader: loadersCol[ROUTES.SEARCH_RESULT].loader,
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
