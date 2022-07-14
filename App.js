import logo from './logo.svg';
import React,{useState , useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import {BrowserRouter as Router , Route , Routes } from 'react-router-dom';
function App() {
  
  return (
    <div className="App">
      <Router>  
        <div>  
           
          <Routes>
            <Route exact path="/" element={<Login/>} />  
            <Route path="/register" element={<Register/>} />  
            <Route path="/home" element={<Home/>} /> 
          </Routes> 
        </div>  
      </Router>  
    </div>
  );
}

export default App;
