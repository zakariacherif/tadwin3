import React from 'react'
import LiveBlocksComp from '../b-component/LiveBlocksComp'

const PageLayout = ({children}: {
    children: React.ReactNode
}) => {
  return (
    
    <LiveBlocksComp>{children}</LiveBlocksComp>
  )
}

export default PageLayout