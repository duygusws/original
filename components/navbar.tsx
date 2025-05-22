"use client"

import { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(13, 12, 15, 0.8);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #a855f7, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    background: rgba(13, 12, 15, 0.95);
    padding: 6rem 2rem;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
  }
`

const NavLink = styled(motion.a)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 101;

  @media (max-width: 768px) {
    display: block;
  }
`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const linkVariants = {
    hover: {
      y: -2,
      color: "#a855f7",
      transition: { duration: 0.2 },
    },
  }

  return (
    <NavContainer>
      <Logo>badclause</Logo>
      <MenuButton onClick={toggleMenu}>{isOpen ? <X size={24} /> : <Menu size={24} />}</MenuButton>
      <NavLinks isOpen={isOpen}>
        <NavLink href="#projects" variants={linkVariants} whileHover="hover" onClick={() => setIsOpen(false)}>
          Projects
        </NavLink>
        <NavLink href="#blog" variants={linkVariants} whileHover="hover" onClick={() => setIsOpen(false)}>
          Blog
        </NavLink>
        <NavLink href="#social" variants={linkVariants} whileHover="hover" onClick={() => setIsOpen(false)}>
          Social
        </NavLink>
      </NavLinks>
    </NavContainer>
  )
}

export default Navbar
