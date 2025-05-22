import type React from "react"
import { Inter } from "next/font/google"
import StyledComponentsRegistry from "@/lib/registry"
import { ThemeProvider } from "@/components/theme-provider"
import GlobalStyles from "@/components/global-styles"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "badclause | Full Stack Developer",
  description: "Personal portfolio of badclause, a Full Stack Developer from Azerbaijan",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}


import './globals.css'