import React from 'react';

interface ScallopedBorderProps {
  position: 'top' | 'bottom';
  className?: string;
  color?: string;
}

export const ScallopedBorder: React.FC<ScallopedBorderProps> = ({
  position,
  className = '',
  color = '#F9F7F2' // Default to cream background
}) => {
  const isTop = position === 'top';

  return (
    <div className={`w-full overflow-hidden leading-none ${isTop ? 'rotate-180' : ''} ${className}`}>
      <svg
        className="block w-full h-[25px] md:h-[35px]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="scallop-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0,0 Q10,20 20,0 V20 H0 Z"
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#scallop-pattern)`} />
      </svg>
    </div>
  );
};