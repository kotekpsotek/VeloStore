import { useState } from 'react'
import AppBar from "./components/AppBar"
import Page from './components/MainPage'
import ProductsPage from './components/ProductPage'
import "./App.css"
import { useSelector } from 'react-redux'
import { ReducerProducPagesAction } from './states'

function App() {
  const pageState = useSelector<ReducerProducPagesAction, string | null>(c => c.type);
  
  return <>
    <AppBar/>
    {!pageState ? <Page/> : <ProductsPage/>}
  </>  
}

export default App
