import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
import Sports from './pages/Sports';
import Culture from './pages/Culture';
import Addpost from './pages/Addpost';
import { AuthProvider } from './context/useAuth';
import { DatabaseProvider } from './context/useDatabase';
import IT from './pages/IT';
import SignIn from './pages/SignIn';


const App: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(() => {
    return localStorage.getItem('isAuth') === 'true';
  });

  if (!auth) {
    return (
      <AuthProvider setAuth={setAuth}>
        <Login/>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider setAuth={setAuth}>
      <DatabaseProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/p" element={<Posts />} />
            <Route path="/s" element={<Sports />} />
            <Route path="/c" element={<Culture />} />
            <Route path="/sn" element={<SignIn/>}/>
            <Route path="/it" element={<IT/>}/>
            <Route path="/ap" element={<Addpost />} />
          </Routes>
        </Router>
      </DatabaseProvider>
    </AuthProvider>
  );
};
export default App;

