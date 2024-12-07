import React from 'react'
import { auth } from '../config/Firebase';

function SignInComponent() {
  return (
    <div className="w-full h-auto bg-pink-600 flex flex-col items-center justify-center py-10">
    <h1 className="text-white  font-bold  text-xl">BLOG Haven</h1>
    <p className="text-blue-900">You are  Signed in as {auth.currentUser?.email}</p>
    <button className="px-5 py-2 my-10 bg-white rounded-[20px]  text-pink-600">Sign Out</button>
        </div> 
  )
}

export default SignInComponent;
