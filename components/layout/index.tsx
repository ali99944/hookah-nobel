import React from 'react'
import { Header } from './header'
import { Footer } from './footer'

interface MainLayoutProps {
    children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout