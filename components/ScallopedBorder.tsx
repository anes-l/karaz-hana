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
        className="block w-full h-[12px] md:h-[20px]"
        viewBox="0 0 1200 20" // Aspect ratio adjusted for a repeating look
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0  
             Q10,20 20,0 
             Q30,20 40,0 
             Q50,20 60,0 
             Q70,20 80,0 
             Q90,20 100,0
             Q110,20 120,0
             Q130,20 140,0
             Q150,20 160,0
             Q170,20 180,0
             Q190,20 200,0
             Q210,20 220,0
             Q230,20 240,0
             Q250,20 260,0
             Q270,20 280,0
             Q290,20 300,0
             Q310,20 320,0
             Q330,20 340,0
             Q350,20 360,0
             Q370,20 380,0
             Q390,20 400,0
             Q410,20 420,0
             Q430,20 440,0
             Q450,20 460,0
             Q470,20 480,0
             Q490,20 500,0
             Q510,20 520,0
             Q530,20 540,0
             Q550,20 560,0
             Q570,20 580,0
             Q590,20 600,0
             Q610,20 620,0
             Q630,20 640,0
             Q650,20 660,0
             Q670,20 680,0
             Q690,20 700,0
             Q710,20 720,0
             Q730,20 740,0
             Q750,20 760,0
             Q770,20 780,0
             Q790,20 800,0
             Q810,20 820,0
             Q830,20 840,0
             Q850,20 860,0
             Q870,20 880,0
             Q890,20 900,0
             Q910,20 920,0
             Q930,20 940,0
             Q950,20 960,0
             Q970,20 980,0
             Q990,20 1000,0
             Q1010,20 1020,0
             Q1030,20 1040,0
             Q1050,20 1060,0
             Q1070,20 1080,0
             Q1090,20 1100,0
             Q1110,20 1120,0
             Q1130,20 1140,0
             Q1150,20 1160,0
             Q1170,20 1180,0
             Q1190,20 1200,0
             V20 H0 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};