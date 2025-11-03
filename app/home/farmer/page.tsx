'use client'
import React from 'react'
import Products from './products'
import Dashboard from '@/app/components/Dashboard'
import useStoreQuery from '@/app/components/store';
import EmptyPage from '@/app/components/EmptyPage';


const page = () => {
  const main = useStoreQuery((s) => s.main);

  return (
    <div>
      {main === 'Dashboard' && <Dashboard/>}
      {main === 'My Products' && <Products/>}
      {main === 'Sales' && <EmptyPage>The {main} page is still in progress...</EmptyPage> }
      {main === 'Profile' && <EmptyPage>The {main} page is still in progress...</EmptyPage> }
      {main === 'Help' && <EmptyPage>The {main} page is still in progress...</EmptyPage> }
      {main === 'Manage' && <EmptyPage>The {main} page is still in progress...</EmptyPage> }
    </div>
  )
}

export default page