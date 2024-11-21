import React from 'react'
import Blogs from '../components/Blogs'
import Landing from '../components/Landing'

const Home:React.FC = () => {
  return (
    <div className="w-full h-screen bg-white">
    <Landing/>
    <Blogs/>
    </div>
  )
}

export default Home
