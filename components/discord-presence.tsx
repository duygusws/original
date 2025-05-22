"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

// Discord status colors
const STATUS_COLORS = {
  online: "#43b581",
  idle: "#faa61a",
  dnd: "#f04747",
  offline: "#747f8d",
}

type DiscordStatus = "online" | "idle" | "dnd" | "offline"

interface DiscordPresence {
  discord_status: DiscordStatus
  discord_user: {
    id: string
    username: string
    avatar: string | null
    discriminator: string
    public_flags: number
  }
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  listening_to_spotify: boolean
  spotify?: {
    album_art_url: string
    song: string
    artist: string
  }
  activities: any[]
}

const PresenceContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;

  @media (max-width: 1024px) {
    width: 180px;
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.5);
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StatusIndicator = styled.div<{ status: DiscordStatus }>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => STATUS_COLORS[props.status]};
  border: 4px solid #0d0c0f;
  
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    border-width: 3px;
  }
`

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  text-align: center;
`

const Username = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const StatusTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 0.25rem;
`

const StatusText = styled.div`
  font-size: 14px;
  color: #b9bbbe;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const StatusDot = styled.div<{ status: DiscordStatus }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => STATUS_COLORS[props.status]};
  box-shadow: 0 0 5px ${(props) => STATUS_COLORS[props.status]}80;
  
  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`

const ActivityText = styled.div`
  font-size: 12px;
  color: #a855f7;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`

const DiscordButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  background: linear-gradient(to right, #5865f2, #4752c4);
  color: white;
  border: none;
  font-size: 14px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(88, 101, 242, 0.4);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 12px;
  }
`

const DiscordLogo = styled.div`
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #b9bbbe;
  text-align: center;
`

const LoadingDots = styled.div`
  display: flex;
  margin-top: 10px;
  
  span {
    width: 8px;
    height: 8px;
    margin: 0 3px;
    background-color: #b9bbbe;
    border-radius: 50%;
    animation: loadingDots 1.4s infinite ease-in-out both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
  
  @keyframes loadingDots {
    0%, 80%, 100% { 
      transform: scale(0);
    }
    40% { 
      transform: scale(1.0);
    }
  }
`

const FallbackImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.5);

  @media (max-width: 1024px) {
    width: 180px;
    height: 180px;
    font-size: 42px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    font-size: 36px;
  }
`

const DiscordPresenceWidget = ({ discordId }: { discordId: string }) => {
  const [presence, setPresence] = useState<DiscordPresence | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }

        if (data.success && data.data) {
          setPresence(data.data)
          setError(null)
        } else {
          throw new Error("No data returned from API")
        }
      } catch (err) {
        console.error("Error fetching Discord presence:", err)
        setError(err instanceof Error ? err.message : "Unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchPresence()

    // Set up WebSocket for real-time updates
    let ws: WebSocket | null = null

    try {
      ws = new WebSocket("wss://api.lanyard.rest/socket")

      ws.onopen = () => {
        ws?.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_ids: [discordId],
            },
          }),
        )
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.op === 0 && data.t === "PRESENCE_UPDATE" && data.d.user_id === discordId) {
          setPresence(data.d)
          setError(null)
        }
      }
    } catch (wsError) {
      console.error("WebSocket connection failed:", wsError)
    }

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [discordId])

  const getStatusText = (status: DiscordStatus) => {
    switch (status) {
      case "online":
        return "Online"
      case "idle":
        return "Idle"
      case "dnd":
        return "Do Not Disturb"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  if (loading) {
    return (
      <PresenceContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FallbackImage>
          <DiscordLogo style={{ fontSize: "48px" }}>ﾃ</DiscordLogo>
        </FallbackImage>
        <LoadingContainer>
          <div>Loading Discord...</div>
          <LoadingDots>
            <span></span>
            <span></span>
            <span></span>
          </LoadingDots>
        </LoadingContainer>
      </PresenceContainer>
    )
  }

  if (error || !presence) {
    return (
      <PresenceContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FallbackImage>
          <DiscordLogo style={{ fontSize: "48px" }}>ﾃ</DiscordLogo>
        </FallbackImage>
        <StatusContainer>
          <Username>badclause</Username>
          <StatusText>Discord Status Unavailable</StatusText>
        </StatusContainer>
        <DiscordButton
          href={`https://discord.com/users/${discordId}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Discord Profile
          <DiscordLogo>ﾃ</DiscordLogo>
        </DiscordButton>
      </PresenceContainer>
    )
  }

  const avatarUrl = presence.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${discordId}/${presence.discord_user.avatar}.png?size=512`
    : `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(presence.discord_user.discriminator) % 5}.png`

  return (
    <PresenceContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ProfileImageWrapper>
        <ProfileImage
          src={avatarUrl}
          alt={presence.discord_user.username}
          onError={(e) => {
            e.currentTarget.src = `https://cdn.discordapp.com/embed/avatars/0.png`
          }}
        />
        <StatusIndicator status={presence.discord_status} />
      </ProfileImageWrapper>

      <StatusContainer>
        <Username>{presence.discord_user.username}</Username>
        <StatusTextContainer>
          <StatusDot status={presence.discord_status} />
          <StatusText>{getStatusText(presence.discord_status)}</StatusText>
        </StatusTextContainer>
        {presence.listening_to_spotify && presence.spotify && (
          <ActivityText>
            🎵 {presence.spotify.song} by {presence.spotify.artist}
          </ActivityText>
        )}
        {presence.activities && presence.activities.length > 0 && !presence.listening_to_spotify && (
          <ActivityText>🎮 {presence.activities[0].name}</ActivityText>
        )}
      </StatusContainer>

      <DiscordButton
        href={`https://discord.com/users/${discordId}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Discord Profile
        <DiscordLogo>ﾃ</DiscordLogo>
      </DiscordButton>
    </PresenceContainer>
  )
}

export default DiscordPresenceWidget
