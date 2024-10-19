
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Beadcrumbs from '../s-component/Beadcrumbs'

const Header = () => {
  return (
    <div className='w-[100vw] h-[10vh] p-10 bg-gray-950 text-white flex justify-between items-center'>
      <h1 className='text-xl md:text-3xl font-alex'>تَدْوِينْ</h1>
      {/*directory*/}
      <Beadcrumbs /> 
      <UserButton />
    </div>
  )
}

export default Header