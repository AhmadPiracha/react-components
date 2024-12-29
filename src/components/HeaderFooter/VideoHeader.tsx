'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import logoBw from '../../../.storybook/public/cortex-reply-bw.png'

// import styles from './video.module.css'
import { HeaderDesktop } from './HeaderDesktop'

export function VideoHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderVisible(true)
        setIsMenuOpen(false)
      } else {
        setIsHeaderVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video className="object-cover w-full h-full" autoPlay loop muted playsInline>
          <source src="/assets/videos/background.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-primary-900/50" />
      </div>
      {!isScrolled && (
        <button
          className="fixed top-4 right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      )}
      <HeaderDesktop isMenuOpen={isMenuOpen} />
      {/* <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'translate-y-0 bg-primary' : '-translate-y-full bg-transparent'
        }`}
      >
        <nav className="bg-primary/80 backdrop-blur-sm text-white p-6">
          <ul className="flex justify-center space-x-8 text-lg">
            <li>
              <a href="#" className="hover:text-primary-300 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-300 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-300 transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-300 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header> */}
      <div
        className={`fixed top-4 left-4 z-50 transition-all duration-300 ${
          isHeaderVisible || isMenuOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* <Image
          src={logoBw}
          //   src="../../../../public/assets/images/brand/cortex-reply.png"
          alt="Cortex Reply Logo"
          width={180}
          height={80}
          className="h-auto w-auto"
        /> */}
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4">
        <Image
          src={logoBw}
          //   src="../../../../public/assets/images/brand/cortex-reply.png"
          alt="Cortex Reply Logo"
          width={720}
          height={320}
          className="h-auto w-auto"
        />
        <h1 className="text-4xl font-bold mb-4">We are Cortex Reply.</h1>
        <p className="text-2xl mb-8 max-w-2xl">Efficiency through technology.</p>

        <div
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:text-primary"
          onClick={scrollToNextSection}
        >
          <ChevronDown size={64} />
        </div>
      </div>
    </>
  )
}
