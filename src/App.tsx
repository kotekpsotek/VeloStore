import { useState } from 'react'
import AppBar from "./components/AppBar"
import Page from './components/MainPage'
import ProductsPage from './components/ProductPage'
import "./App.css"

function App() {
  return <>
    <AppBar/>
    <Page/>
    <ProductsPage/>
  </>
  
}

export default App
