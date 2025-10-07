import React from 'react'
import Landing from './components/Landing'
import ROI from './components/ROI'
import About from './components/About'
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/route'
// import useStoreQuery from './components/store'

const page = async () => {
  return (
    <div className='gen-cont'>
      <Landing/>
      <ROI/>
      <About/>
    </div>
  )

}

export default page