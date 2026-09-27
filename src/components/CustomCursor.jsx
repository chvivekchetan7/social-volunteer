import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [hoverState, setHoverState] = useState('none'); // 'none', 'button', 'image', 'opportunity', 'link'
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripples, setRipples] = useState([]);

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    // Disable custom 3D cursor on touch screens or reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 1024 || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      setIsMouseDown(true);
      // Spawn subtle 3D orange ripple effect on click
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const oppCard = target.closest('.opportunity-card, [id*="opportunity"]');
      const img = target.closest('.img-hover-zoom, .gallery-item, img');
      const btn = target.closest('button, .btn-orange, .btn-secondary, input[type="submit"]');
      const link = target.closest('a:not(.btn-orange):not(.btn-secondary), .nav-link');
      const cause = target.closest('.cause-card');
      const card = target.closest('.project-card, .plan-card, .story-card');

      if (btn) {
        setHoverState('button');
        setCursorText('');
      } else if (oppCard || cause || card) {
        setHoverState('opportunity');
        setCursorText('EXPLORE');
      } else if (img) {
        setHoverState('image');
        setCursorText('VIEW');
      } else if (link) {
        setHoverState('link');
        setCursorText('');
      } else {
        setHoverState('none');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    let animFrame;
    const render = () => {
      const lerpFactor = 0.22;
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += dx * lerpFactor;
      cursorPos.current.y += dy * lerpFactor;

      velocity.current = { x: dx * 0.08, y: dy * 0.08 };

      const tiltX = Math.max(-10, Math.min(10, velocity.current.y * 1.2));
      const tiltY = Math.max(-10, Math.min(10, -velocity.current.x * 1.2));

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0px) translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (isTouchDevice) return null;

  const isHovered = hoverState === 'opportunity' || hoverState === 'image';
  const isButtonHover = hoverState === 'button';
  const isLinkHover = hoverState === 'link';

  // Calculate size cleanly
  const size = isButtonHover ? '32px' : isLinkHover ? '14px' : isHovered ? '50px' : '18px';

  return (
    <>
      {/* 3D Cursor Container */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999999,
          perspective: '700px',
          willChange: 'transform',
        }}
      >
        {/* Realistic Translucent Orange Glass Orb / Ring */}
        <div
          style={{
            width: size,
            height: size,
            background: isButtonHover
              ? 'rgba(232, 90, 42, 0.12)'
              : isLinkHover
              ? '#E85A2A'
              : isHovered
              ? 'radial-gradient(circle at 30% 30%, rgba(255, 160, 122, 0.95), rgba(232, 90, 42, 0.92) 60%, rgba(184, 58, 18, 0.95) 100%)'
              : 'radial-gradient(circle at 35% 35%, #FF9A76 0%, #E85A2A 65%, #9E2B06 100%)',
            border: isButtonHover ? '2px solid rgba(232, 90, 42, 0.8)' : 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            boxShadow: isButtonHover
              ? '0 0 12px rgba(232, 90, 42, 0.3)'
              : isHovered
              ? '0 10px 24px rgba(232, 90, 42, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.5)'
              : '0 4px 12px rgba(232, 90, 42, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.6)',
            transform: isMouseDown ? 'scale(0.8) translateZ(-10px)' : 'scale(1) translateZ(0px)',
            transition:
              'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s ease, background 0.2s ease',
            backdropFilter: 'blur(3px)',
            userSelect: 'none',
          }}
        >
          {isHovered && (
            <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)', textAlign: 'center', lineHeight: 1 }}>
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Click Orange Light Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: 'fixed',
            top: ripple.y,
            left: ripple.x,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '2px solid rgba(232, 90, 42, 0.85)',
            boxShadow: '0 0 16px rgba(255, 128, 84, 0.6)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 999998,
            animation: 'cursorRippleAnim 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />
      ))}

      <style>{`
        @keyframes cursorRippleAnim {
          0% {
            width: 10px;
            height: 10px;
            opacity: 1;
            border-width: 3px;
          }
          100% {
            width: 60px;
            height: 60px;
            opacity: 0;
            border-width: 1px;
          }
        }
      `}</style>
    </>
  );
}
