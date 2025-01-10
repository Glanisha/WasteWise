import React from 'react'
import Dustbin from './Dustbin'


const Simulation = () => {
  return (
    <div>
        <h1 className='flex justify-center font-semibold mt-10 text-3xl'>Put waste in the bin to earn 20 points!</h1>
      <Dustbin/>
    </div>
  )
}

export default Simulation
