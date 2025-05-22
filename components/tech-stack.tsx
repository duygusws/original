"use client"

import styled from "styled-components"
import { motion } from "framer-motion"

const Section = styled.section`
  padding: 6rem 2rem;
  background-color: #0d0c0f;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(to right, #a855f7, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1.5rem;
  }
`

const TechItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`

const TechIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15));
    z-index: -1;
  }

  svg {
    width: 40px;
    height: 40px;
    color: #fff;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`

const TechName = styled.span`
  font-size: 0.875rem;
  color: #d1d5db;
  text-align: center;
`

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "JavaScript", icon: "JS" },
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
  { name: "Git", icon: "📂" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "GraphQL", icon: "◢" },
  { name: "Docker", icon: "🐳" },
]

const TechStack = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <Section id="tech-stack">
      <Container>
        <SectionTitle>Tech Stack</SectionTitle>
        <TechGrid>
          {techStack.map((tech, index) => (
            <TechItem
              key={tech.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <TechIcon>
                <span style={{ fontSize: "24px" }}>{tech.icon}</span>
              </TechIcon>
              <TechName>{tech.name}</TechName>
            </TechItem>
          ))}
        </TechGrid>
      </Container>
    </Section>
  )
}

export default TechStack
