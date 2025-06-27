"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface BondRobotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
  showLightBulb?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
}

export function BondRobot({ 
  size = 'md', 
  className, 
  animate = true,
  showLightBulb = false 
}: BondRobotProps) {
  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeClasses[size],
        animate && "animate-float",
        className
      )}
    >
      {/* Robot SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="BondAI Robot Mascot"
      >
        <title>BondAI Robot Assistant</title>
        {/* Robot Head */}
        <ellipse 
          cx="50" 
          cy="35" 
          rx="22" 
          ry="20" 
          fill="white" 
          stroke="hsl(194 70% 65%)" 
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        
        {/* Headphones */}
        <path
          d="M25 25 Q15 25 15 35 Q15 45 25 45"
          stroke="hsl(194 70% 65%)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M75 25 Q85 25 85 35 Q85 45 75 45"
          stroke="hsl(194 70% 65%)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M30 25 Q50 15 70 25"
          stroke="hsl(194 70% 65%)"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Face Screen - Dark background */}
        <rect 
          x="35" 
          y="25" 
          width="30" 
          height="20" 
          rx="5" 
          fill="#0f172a"
          className="drop-shadow-sm"
        />
        
        {/* Eyes */}
        <circle 
          cx="42" 
          cy="33" 
          r="3" 
          fill="hsl(194 70% 65%)"
          className={animate ? "animate-pulse-soft" : ""}
        />
        <circle 
          cx="58" 
          cy="33" 
          r="3" 
          fill="hsl(194 70% 65%)"
          className={animate ? "animate-pulse-soft" : ""}
        />
        
        {/* Smile */}
        <path
          d="M45 38 Q50 42 55 38"
          stroke="hsl(194 70% 65%)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Robot Body */}
        <ellipse 
          cx="50" 
          cy="65" 
          rx="18" 
          ry="25" 
          fill="white" 
          stroke="hsl(194 70% 65%)" 
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        
        {/* Body stripes */}
        <ellipse 
          cx="50" 
          cy="60" 
          rx="15" 
          ry="3" 
          fill="hsl(194 70% 65%)"
          opacity="0.3"
        />
        <ellipse 
          cx="50" 
          cy="70" 
          rx="15" 
          ry="3" 
          fill="hsl(194 70% 65%)"
          opacity="0.3"
        />
        
        {/* Arms */}
        <circle 
          cx="25" 
          cy="60" 
          r="6" 
          fill="white" 
          stroke="hsl(194 70% 65%)" 
          strokeWidth="2"
        />
        <circle 
          cx="75" 
          cy="60" 
          r="6" 
          fill="white" 
          stroke="hsl(194 70% 65%)" 
          strokeWidth="2"
        />
        
        {/* Hands */}
        <circle 
          cx="20" 
          cy="70" 
          r="4" 
          fill="hsl(194 70% 65%)"
        />
        <circle 
          cx="80" 
          cy="70" 
          r="4" 
          fill="hsl(194 70% 65%)"
        />
        
        {/* Base/Hover effect */}
        <ellipse 
          cx="50" 
          cy="92" 
          rx="12" 
          ry="4" 
          fill="hsl(194 70% 65%)"
          opacity="0.6"
          className={animate ? "animate-pulse-soft" : ""}
        />
      </svg>
      
      {/* Light bulb for ideas */}
      {showLightBulb && (
        <div className="absolute -top-2 -right-2">
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className={animate ? "animate-glow" : ""}
              aria-label="Light bulb idea icon"
            >
              <title>Light bulb idea</title>
              <path
                d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.1-.8 4-2.1 5.2-.3.3-.9.8-.9.8h-6s-.6-.5-.9-.8C7 16 6.2 14.1 6.2 12A6 6 0 0 1 12 3Z"
                stroke="hsl(45 100% 55%)"
                strokeWidth="2"
                fill="hsl(45 100% 55%)"
                fillOpacity="0.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default BondRobot
