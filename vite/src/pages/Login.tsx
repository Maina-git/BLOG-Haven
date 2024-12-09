import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useEffect } from "react";

const Login: React.FC = () => {

const [fadeAway, setFadeAway]=useState<Boolean>(false);


  useEffect(()=>{
    const timer=setTimeout(()=>{
      setFadeAway(true)
    }, 15000)
    return ()=>clearTimeout(timer);
  },[]);


  const {
    email,
    password,
    confirmPassword,
    showPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    login,
  } = useAuth();

  if(!fadeAway)
    return (
  <div className="w-full h-screen bg-white flex flex-col gap-10 items-center justify-center">
    <h1 className="text-pink-600 text-5xl">Generation Now</h1>
    <img className="w-[400px]" src="/images/generationnow.jpg" alt="" />
    <p className="text-pink-600 text-xl">BLOG Haven</p>
    <span className="text-xs text-pink-600">Loading....</span>
  </div>
    )
else 
  return (
    <div   style={{
      backgroundImage:"url('/images/generationnow.jpg')",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center"
    }} className="w-full h-screen  flex flex-col items-center justify-center">
      <form onSubmit={login} className="p-5 bg-white flex flex-col shadow-lg rounded">
        <h1 className="text-2xl text-center my-3 text-pink-600">
          BLOG Haven
        </h1>
        <div className="flex flex-col my-1">
          <label htmlFor="" className="text-pink-600  text-xs">Email:</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-[300px] border border-pink-600 outline-none rounded"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="" className="text-pink-600 text-xs">Password:</label>
          <div className="p-2 w-[300px] border border-pink-600 rounded flex justify-between">
            <input
              value={password}
              type={!showPassword ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-black outline-none"
              placeholder="Enter Password"
            />
            {!showPassword ? (
              <FaEye onClick={toggleShowPassword} />
            ) : (
              <FaEyeSlash onClick={toggleShowPassword} />
            )}
          </div>
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="" className="text-pink-600 text-xs">Confirm Password:</label>
          <div className="p-2 w-[300px] border border-pink-600 rounded flex justify-between">
            <input
              value={confirmPassword}
              type={!showPassword ? "password" : "text"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent text-black outline-none"
              placeholder="Confirm Password"
            />
            {!showPassword ? (
              <FaEye onClick={toggleShowPassword} />
            ) : (
              <FaEyeSlash onClick={toggleShowPassword} />
            )}
          </div>
        </div>
        <button
          className="w-full my-5 p-1 rounded bg-pink-600 text-white"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
