import React, { useState, useRef } from 'react';

export default function MagneticButton({
  children,
  className = '',
  style = {},
  maxTranslate = 8,
  onClick,
  ...props
}) {
  const [position, setPosition] = useState({ x: 0, y: 0, isHovered: false });
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distRatioX = dx / (rect.width / 2);
    const distRatioY = dy / (rect.height / 2);

    const translateX = distRatioX * maxTranslate;
    const translateY = distRatioY * maxTranslate;

    setPosition({ x: translateX, y: translateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-block',
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition: position.isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
