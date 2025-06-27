export const BondAILogo = ({ className = "", width = 80, height = 80 }: { className?: string, width?: number, height?: number }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>BondAI Logo</title>
    
    {/* Bond text */}
    <text
      x="10"
      y="40"
      fontSize="32"
      fontWeight="bold"
      fill="hsl(0 0% 20%)"
      fontFamily="ui-sans-serif, system-ui"
    >
      bond
    </text>
    
    {/* AI text in cyan */}
    <text
      x="110"
      y="40"
      fontSize="32"
      fontWeight="bold"
      fill="hsl(194 70% 65%)"
      fontFamily="ui-sans-serif, system-ui"
    >
      AI
    </text>
    
    {/* Underline accent */}
    <path
      d="M10 50 Q50 45 90 50 Q130 55 170 50"
      stroke="hsl(194 70% 65%)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

export const BondAILogoWhite = ({ className = "", width = 80, height = 80 }: { className?: string, width?: number, height?: number }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>BondAI Logo White</title>
    
    {/* Bond text */}
    <text
      x="10"
      y="40"
      fontSize="32"
      fontWeight="bold"
      fill="white"
      fontFamily="ui-sans-serif, system-ui"
    >
      bond
    </text>
    
    {/* AI text in cyan */}
    <text
      x="110"
      y="40"
      fontSize="32"
      fontWeight="bold"
      fill="hsl(194 70% 65%)"
      fontFamily="ui-sans-serif, system-ui"
    >
      AI
    </text>
    
    {/* Underline accent */}
    <path
      d="M10 50 Q50 45 90 50 Q130 55 170 50"
      stroke="hsl(194 70% 65%)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)
