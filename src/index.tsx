import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from 'axios';

import App from './App.tsx';
import ResultPage from "./pages/result-page/result-page.tsx";
import MainPage from "./pages/index-page/main-page.tsx";
import FavoritePage from "@favorite-page/favorite-page.tsx";

import routerLoaders from "./routes-loaders.ts";

import { BASE_API_URL } from "./api/endpoints.ts";
import { ROUTES } from "./const/routes.ts";

import './index.css';

axios.defaults.baseURL = BASE_API_URL;
// @ts-expect-error Will be added lately
axios.defaults.headers.get["X-RapidAPI-Key"] = __RAPID_API_KEY__;
// @ts-expect-error Will be added lately
axios.defaults.headers.get["X-RapidAPI-Host"] = __RAPID_API_HOST__;

const router = createBrowserRouter([
  {
    path: ROUTES.INDEX,
    element: <App />,
    children: [
      {
        path: ROUTES.INDEX,
        element: <MainPage />,
      },
      {
        path: ROUTES.RESULT,
        element: <ResultPage />,
        loader: routerLoaders[ROUTES.RESULT].loader,
      },
      {
        path: ROUTES.FAVORITES,
        element: <FavoritePage />,
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
