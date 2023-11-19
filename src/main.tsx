import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { productsPage } from './states.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={productsPage}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  </Provider>
)
