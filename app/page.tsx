import React from 'react'
import Landing from './components/Landing'
import ROI from './components/ROI'
import About from './components/About'

const page = () => {
  return (
    <div className='gen-cont'>
      <Landing/>
      <ROI/>
      <About/>
    </div>
  )
}

export default page