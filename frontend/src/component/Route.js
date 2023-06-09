import React from "react";
import Product from "./Product";
import Admin from "./Admin";
import Header from "./Header";
import { BrowserRouter,Route,Routes } from "react-router-dom";
export default class My_Route extends React.Component {
  render(){
    return(
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Product/>}/>
          </Routes>
          <Routes>
            <Route path="/admin" element={<Admin/>}/>
          </Routes>
        </BrowserRouter>
    )
  }
}