import React from 'react'
import Login from './pages/Login';
import { useState } from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
import Sports from './pages/Sports';
import Culture from './pages/Culture';
import Addpost from './pages/Addpost';


const App:React.FC = () => {

const [auth, setAuth]=useState<boolean>(()=>{return localStorage.getItem("isAuth") === "true";})

if(!auth){
  return (
    <div>
      <Login setAuth={setAuth}/>
    </div>
  )
}
return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
       <Route path="/p" element={<Posts/>}/>
       <Route path="/s" element={<Sports/>}/>
       <Route path="/c" element={<Culture/>}/>
       <Route path="/ap" element={<Addpost/>}/>
      </Routes>
    </Router>
)
}

export default App;
