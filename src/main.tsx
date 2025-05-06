import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store.ts';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </CssBaseline>
    </Provider>
  </React.StrictMode>
)