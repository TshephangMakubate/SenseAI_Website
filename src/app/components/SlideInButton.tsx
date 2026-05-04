import { useState } from 'react';

interface SlideInButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'orange';
}

export function SlideInButton({ children, onClick, className = '', variant = 'primary' }: SlideInButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "relative overflow-hidden transition-all duration-300 rounded-full px-8 py-3.5 group cursor-pointer";

  const variantStyles = {
    primary: "bg-[#D22D23] text-white hover:bg-[#B22620]",
    secondary: "bg-white text-[#D22D23] border-2 border-[#D22D23] hover:bg-[#D22D23] hover:text-white",
    orange: "bg-[#E69E3C] text-[#1A1A1A] hover:bg-[#D88E2C]"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">
        <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-[-8px]' : ''}`}>
          {children}
        </span>
        <svg
          className={`transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-[-10px] opacity-0'}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 10H16M16 10L11 5M16 10L11 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Slide-in background effect */}
      <div
        className={`absolute inset-0 transition-transform duration-300 ease-out ${
          isHovered ? 'translate-x-0' : 'translate-x-[-100%]'
        }`}
        style={{
          background: variant === 'primary'
            ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
            : variant === 'orange'
            ? 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
            : 'linear-gradient(90deg, rgba(210,45,35,0.1) 0%, transparent 100%)'
        }}
      />
    </button>
  );
}
