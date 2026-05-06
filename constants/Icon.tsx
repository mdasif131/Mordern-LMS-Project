import React from "react"

interface LmsLogoProps {
  width?: number
  height?: number
  className?: string
}


export const LmsLogo: React.FC<LmsLogoProps> = ({
  width = 250,
  height = 90,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 90"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="MD ASIF Learning System Logo"
    >
      <defs>
        {/* Main text gradient – vibrant blue to indigo */}
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        {/* Accent shine */}
        <linearGradient id="accentShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>

      {/* Wordmark – bold & gradient */}
      <text
        x="78"
        y="43"
        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
        fontSize="32"
        fontWeight="800"
        letterSpacing="5"
        fill="url(#textGrad)"
      >
        MD ASIF
      </text>

      {/* Tagline – softer, modern gray */}
      <text
        x="78"
        y="62"
        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="7"
        fill="#64748B"
      >
        LEARNING SYSTEM
      </text>

      {/* Accent dash – brighter and with a gradient */}
      <rect
        x="78"
        y="70"
        width="20"
        height="2"
        rx="1"
        fill="url(#accentShine)"
      />
    </svg>
  )
}
