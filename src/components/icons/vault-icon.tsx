interface VaultIconProps {
  className?: string
  size?: number | string
}

export function VaultIcon({ className = '', size = 16 }: VaultIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Vault/Safe body */}
      <rect
        x="4"
        y="6"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Vault door */}
      <rect
        x="8"
        y="8"
        width="8"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        opacity="0.8"
      />
      
      {/* Door handle */}
      <circle
        cx="14"
        cy="13"
        r="0.5"
        fill="currentColor"
      />
      
      {/* Circuit lines on left */}
      <path
        d="M2 8 L2 10 M2 12 L2 14"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Circuit lines on right */}
      <path
        d="M22 8 L22 10 M22 12 L22 14"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Circuit dots */}
      <circle cx="2" cy="8" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="2" cy="14" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="22" cy="8" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="22" cy="14" r="1" fill="currentColor" opacity="0.6" />
      
      {/* Circuit connections */}
      <path
        d="M4 6 L2 8 M20 6 L22 8 M4 20 L2 14 M20 20 L22 14"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Lock indicator */}
      <rect
        x="10"
        y="11"
        width="4"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  )
}
