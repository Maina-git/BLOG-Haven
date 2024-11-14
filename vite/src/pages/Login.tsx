import React from 'react'
import { auth } from '../config/Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaBlog } from "react-icons/fa6";


interface Props{
    setAuth:React.Dispatch<React.SetStateAction<boolean>>
}

const Login:React.FC<Props>= ({setAuth}) => {
const [email, setEmail]=useState<string>("");
const [pass, setPass]=useState<string>("");
const [confrim , setConfirm]=useState<string>("");
const [showpass, setShowPass]=useState<boolean>(false);

const login=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, pass);
setAuth(true);
    if(!email || !pass || !confirm){
alert("Please  fill in the  required  details");
setAuth(false);
    }
   else if(pass !== confrim){
      alert("Passwords do not match");
      setAuth(false);
    }
    else{
    setAuth(true);
    }
}
const showpassword=()=>{
  setShowPass(prev=>!prev);
}
return (
<div className="w-full h-screen bg-pink-600 flex flex-col items-center justify-center"> 
<FaBlog className="text-white text-5xl my-10"/>
  <form onSubmit={login} className="p-5 bg-white flex flex-col rounded">
    <h1 className="font-bold text-2xl text-center my-3 text-pink-600">DOJO BLOG</h1>

<div className="flex flex-col my-1">
    <label htmlFor="" className="text-pink-600">Email:</label>
    <input value={email} type="email" onChange={(e)=>setEmail(e.target.value)} className="p-2 w-[300px] border border-pink-600 outline-none  rounded" placeholder='Enter Email'/>
</div>
<div className="flex flex-col my-5">
    <label htmlFor="" className="text-pink-600">Password:</label>
  <div className="p-2 w-[300px] border border-pink-600  rounded flex justify-between">
    <input value={pass} type={ !showpass ? "password" : "text "} onChange={(e)=>setPass(e.target.value)} className="w-full bg-transparent text-black outline-none"  placeholder='Enter Password'/>
{ !showpass ? <FaEye onClick={showpassword}/> : <FaEyeSlash onClick={showpassword}/>}
</div>
</div>
<div className="flex flex-col my-5">
    <label htmlFor="" className="text-pink-600">Confirm Password:</label>
      <div className="p-2 w-[300px] border border-pink-600  rounded flex justify-between">
    <input value={confrim}   type={!showpass ? "password" : "text"} onChange={(e)=>setConfirm(e.target.value)} className="w-full bg-transparent text-black outline-none"   placeholder='Confirm Password'/>
{ !showpass ? <FaEye onClick={showpassword}/> : <FaEyeSlash onClick={showpassword}/>}
</div>
</div>
<button className="w-full my-5 p-1 rounded bg-pink-600 text-white" type='submit'>Sign In</button>
  </form>
  </div>
  )
}
export default Login;

