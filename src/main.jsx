import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from "react-redux"
// persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


import  store  from './app/store.js'

import { BrowserRouter } from "react-router-dom"

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter >
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ BrowserRouter >,
  // </React.StrictMode>,
)
