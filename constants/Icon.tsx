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
      className={`m-0 p-0! ${className}`}
      role="img"
      aria-label="MD ASIF Learning System Logo"
    >
      <defs>
        {/* Primary Gradient - From your OKLCH Green to a deeper Forest Green */}
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ADE80" />{" "}
          {/* Primary OKLCH equivalent */}
          <stop offset="100%" stopColor="#166534" /> {/* Darker contrast */}
        </linearGradient>

        {/* Accent Shine - A lighter version of your primary color */}
        <linearGradient id="accentShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>
      </defs>

      {/* Wordmark */}
      <text
        x="78"
        y="43"
        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
        fontSize="31"
        fontWeight="800"
        letterSpacing="5"
        fill="url(#textGrad)"
      >
        MD ASIF
      </text>

      {/* Tagline - Adjusted to a slate-gray that complements green */}
      <text
        x="82"
        y="62"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="12"
        fontWeight="500"
        letterSpacing="7"
        fill="#94A3B8"
      >
        LEARNING SYSTEM
      </text>

      {/* Accent dash */}
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



