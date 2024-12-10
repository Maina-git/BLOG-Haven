import React from 'react'
import { auth } from '../config/Firebase';
import { useAuth } from '../context/useAuth';
import { useEffect } from 'react';

const  SignInComponent:React.FC=()=> {

useEffect(()=>{
   alert("Scroll down  to sign Out");
}, []);

  const {
    logMeOut
  } = useAuth();

  return (
    <div className="w-full h-auto bg-white flex flex-col items-center justify-center py-10">

 <h1 className="text-white  text-xl">BLOG Haven</h1>
<p className="text-white  bg-green rounded p-5">Scroll to  sign Out</p>
<span 
className="w-[50px] h-[50px] bg-yellow-400 rounded-[100%] text-white  font-bold absolute top-20 left-10 flex items-center justify-center">
  {auth.currentUser?.email.charAt(0)}
</span>
    <p className="text-blue-900">You are  Signed in as {auth.currentUser?.email}</p>
    <button onClick={logMeOut} className="px-5 py-2 my-10 bg-pink-600 rounded-[20px]  text-white">Sign Out</button>
      <h2 className="text-pink-600 text-2xl py-5">Genaration Now</h2>
      <img className="w-[500px]" src="/images/generationnow.jpg" alt="" />
      <p className="p-10 text-pink-600 text-xs">Generation Now, often referred to as Gen Z (born roughly between 1997 and 2012),
         is characterized by their deep integration with technology, adaptability, and a strong
        focus on individuality and social justice. They are digital natives, having grown up
        with the internet, smartphones, and social media, which makes them highly skilled 
        in navigating and leveraging digital platforms. This generation values diversity,
        inclusivity, and authenticity, often challenging societal norms and advocating 
        for meaningful change in areas such as climate action, mental health, and equality.
        Despite being sometimes stereotyped as overly reliant on technology, they are
        entrepreneurial, innovative, and deeply aware of global issues, 
        making them a force for positive transformation in the modern world. </p>
        </div> 
  )
}
export default SignInComponent;
