import React, { useState, useRef, useEffect } from 'react';

export default function Card3DTilt({
  children,
  className = '',
  style = {},
  maxTilt = 2.5, // Safe 2-3° max tilt to eliminate all clipping
  scale = 1.015,
  glare = true,
  onClick,
  ...props
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50, isHovered: false });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    // Check if device is touch / mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xRatio = (x / rect.width) * 2 - 1; // -1 to 1
    const yRatio = (y / rect.height) * 2 - 1; // -1 to 1

    const clampedTilt = Math.min(3, Math.max(1, maxTilt));
    const rotateY = xRatio * clampedTilt;
    const rotateX = -yRatio * clampedTilt;

    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, lightX, lightY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50, isHovered: false });
  };

  // Separate container styles from card styles so border & background transform together
  const {
    background,
    backgroundColor,
    border,
    borderColor,
    borderWidth,
    borderStyle,
    borderRadius = '20px',
    boxShadow,
    ...outerStyle
  } = style;

  const cardBackground = background || backgroundColor || '#FFFFFF';
  const cardBorder = border || (borderColor ? `${borderWidth || '1px'} ${borderStyle || 'solid'} ${borderColor}` : '1px solid #E5E7EB');

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        perspective: '1200px',
        overflow: 'visible',
        cursor: 'pointer',
        height: '100%',
        ...outerStyle,
      }}
      {...props}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: borderRadius,
          background: cardBackground,
          border: cardBorder,
          overflow: 'visible', // Ensure contents & glows are never clipped
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          transform: !isTouchDevice && tilt.isHovered
            ? `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${scale})`
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
          transition: tilt.isHovered
            ? 'transform 0.15s ease-out, box-shadow 0.15s ease-out'
            : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: tilt.isHovered
            ? (boxShadow ? `${boxShadow}, 0 16px 36px -8px rgba(232, 90, 42, 0.18)` : '0 16px 36px -8px rgba(232, 90, 42, 0.18), 0 6px 16px rgba(0,0,0,0.06)')
            : (boxShadow || '0 4px 16px rgba(0, 0, 0, 0.04)'),
        }}
      >
        {/* Main Card Content */}
        <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>
          {children}
        </div>

        {/* Soft Radial Surface Light Accent (Non-Clipping Glow Overlay) */}
        {glare && !isTouchDevice && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: borderRadius,
              pointerEvents: 'none',
              zIndex: 3,
              background: tilt.isHovered
                ? `radial-gradient(circle at ${tilt.lightX}% ${tilt.lightY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 128, 84, 0.05) 50%, transparent 80%)`
                : 'none',
              opacity: tilt.isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
            }}
          />
        )}
      </div>
    </div>
  );
}
