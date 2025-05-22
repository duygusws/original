"use client"

import styled from "styled-components"
import { motion } from "framer-motion"
import { Github, Instagram } from "lucide-react"
import DiscordPresenceWidget from "./discord-presence"

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(rgba(13, 12, 15, 0.9), rgba(13, 12, 15, 0.9)),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23a855f7' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: -1;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    padding-top: 5rem;
    text-align: center;
  }
`

const ContentContainer = styled.div`
  flex: 1;
  max-width: 600px;
  z-index: 1;

  @media (max-width: 1024px) {
    margin-bottom: 3rem;
  }
`

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #a855f7, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #d1d5db;
  margin-bottom: 1rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.125rem;
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`

const Button = styled(motion.a)<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  
  background: ${(props) => (props.$primary ? "linear-gradient(to right, #a855f7, #3b82f6)" : "transparent")};
  color: white;
  border: ${(props) => (props.$primary ? "none" : "1px solid rgba(255, 255, 255, 0.2)")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.3);
  }
`

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SocialIconLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: linear-gradient(to right, #a855f7, #3b82f6);
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.3);
  }
`

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-right: 2rem;

  @media (max-width: 1024px) {
    justify-content: center;
    padding-right: 0;
  }
`

const Hero = () => {
  return (
    <HeroSection>
      <ContentContainer>
        <Title initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Hello, I'm BadClause
        </Title>
        <Subtitle>Full Stack Developer from Azerbaijan</Subtitle>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I'm Sait, 18 years old, studying Language and Literature Education at Baku State University. I'm also
          passionate about software development.
        </Description>
        <ButtonContainer>
          <Button
            href="https://github.com/badclause"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
            GitHub Profile
          </Button>
        </ButtonContainer>
        <SocialIconsContainer>
          <SocialIconLink
            href="https://instagram.com/badclause"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Instagram Profile"
          >
            <Instagram size={20} />
          </SocialIconLink>
        </SocialIconsContainer>
      </ContentContainer>
      <ImageContainer>
        <DiscordPresenceWidget discordId="599189960725364747" />
      </ImageContainer>
    </HeroSection>
  )
}

export default Hero
