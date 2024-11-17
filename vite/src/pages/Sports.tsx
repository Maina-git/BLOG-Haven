import React from 'react'
import SportsPost from '../components/SportsPost';

const Sports:React.FC = () => {
  return (
    <div className="bg-orange-300 h-screen w-full">
         <h1 className="text-yellow-100 font-bold text-6xl text-center py-5">Sports</h1>
      <SportsPost/>
    </div>
  )
}

export default Sports;
