import React from 'react'
import SportsPost from '../components/SportsPost';

const Sports:React.FC = () => {
  return (
    <div className="h-auto w-full">
         <h1 className="text-yellow-100 font-bold text-6xl text-center py-5">Sports</h1>
      <SportsPost/>
    </div>
  )
}

export default Sports;
