import React from 'react'
import TravelHeader from './_shared/TravelHeader'
import Chats from './_shared/Chats'
import Display from './_shared/Display'

function page() {
  return (
    <div>
      <TravelHeader/>
      <div className='flex justify-between gap-15'>
        <Chats/>
        <Display/>
      </div>
    </div>
  )
}

export default page
