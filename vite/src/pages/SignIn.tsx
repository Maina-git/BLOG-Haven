import React from 'react'
import SignInComponent from '../components/SignInComponent';
import Landing from '../components/Landing';

const SignIn:React.FC = () => {
  return (
    <div className="w-full h-auto bg-pink-600 flex flex-col items-center justify-center py-10">
<Landing/>
<SignInComponent/>
    </div>
  )
}

export default SignIn;
