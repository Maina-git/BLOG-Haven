import React from 'react'
import Login from './pages/Login';
import { useState } from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';


const App:React.FC = () => {

const [auth, setAuth]=useState<boolean>(false)

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
      </Routes>
    </Router>
)
}

export default App;
