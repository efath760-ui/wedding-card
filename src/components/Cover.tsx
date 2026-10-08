import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../config/invitation';

interface CoverProps {
  onOpen: () => void;
  onStartMusic: () => void;
}

// 12 authentic ambient particles from reference
const particles = [
  { id: 1, left: '46.7%', color: '#d8af87', size: 13, sway: 6, dur: 22.8, delay: -17 },
  { id: 2, left: '20.6%', color: '#8D8F58', size: 15, sway: 8, dur: 21.1, delay: -20 },
  { id: 3, left: '86.2%', color: '#B97D3E', size: 22, sway: -5, dur: 19.8, delay: -10 },
  { id: 4, left: '85.9%', color: '#e8d2b0', size: 18, sway: 19, dur: 18.0, delay: -4 },
  { id: 5, left: '75.0%', color: '#8D8F58', size: 17, sway: -13, dur: 23.2, delay: -11 },
  { id: 6, left: '24.4%', color: '#e8d2b0', size: 22, sway: -24, dur: 23.0, delay: -11 },
  { id: 7, left: '45.4%', color: '#ffffff', size: 21, sway: 23, dur: 22.0, delay: -20 },
  { id: 8, left: '23.2%', color: '#d8af87', size: 18, sway: -1, dur: 22.9, delay: -19 },
  { id: 9, left: '47.3%', color: '#8D8F58', size: 21, sway: 6, dur: 19.4, delay: -11 },
  { id: 10, left: '37.4%', color: '#8D8F58', size: 13, sway: 8, dur: 20.9, delay: -10 },
  { id: 11, left: '46.1%', color: '#e8d2b0', size: 11, sway: -27, dur: 19.3, delay: -8 },
  { id: 12, left: '48.1%', color: '#B97D3E', size: 19, sway: 13, dur: 19.9, delay: -12 },
];

export default function Cover({ onOpen, onStartMusic }: CoverProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  // Lock body scroll while cover is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 24 radial burst petal particles
  const burstParticles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * 2 * Math.PI + (Math.random() * 0.3 - 0.15);
      const dist = 70 + Math.random() * 150;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        color: i % 2 === 0 ? '#B97D3E' : '#e8d2b0',
        size: 14 + Math.random() * 10,
        rotStart: Math.random() * 30,
        rotEnd: 180 + Math.random() * 180,
      };
    });
  }, []);

  const handleOpenClick = () => {
    if (isOpening) return;

    // Start music synchronously in the user gesture for reliable mobile playback
    onStartMusic();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTimeout(onOpen, 300);
      return;
    }

    setIsOpening(true);

    // 0.6s: trigger radial particle burst
    setTimeout(() => {
      setShowBurst(true);
    }, 600);

    // 1.5s: transition to main invitation page
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom right, rgba(138,90,42,0.9), rgba(185,125,62,0.9), rgba(216,175,135,0.9)), url(/assets/page-bg.webp) center / 1200px repeat',
      }}
    >
      {/* Falling 6-petal ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              left: p.left,
              top: '-30px',
              color: p.color,
              fontSize: `${p.size}px`,
              // @ts-ignore
              '--sway': `${p.sway}px`,
              animation: `ambient-fall ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
            className="absolute"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.45" />
            </svg>
          </div>
        ))}
      </div>

      {/* Opening particle burst */}
      {showBurst && (
        <div className="absolute inset-0 pointer-events-none z-[100] flex items-center justify-center">
          {burstParticles.map((bp) => (
            <motion.div
              key={bp.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
              animate={{
                x: bp.x,
                y: bp.y,
                opacity: [1, 0.9, 0],
                scale: 0.8,
                rotate: bp.rotEnd,
              }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                color: bp.color,
                fontSize: `${bp.size}px`,
                textShadow: `0 0 10px ${bp.color}`,
              }}
              className="absolute"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
                <g>
                  <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
                  <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
                  <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
                  <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
                  <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
                </g>
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Card wrapper with envelope-away animation */}
      <div
        className="relative z-10"
        style={{
          animation: isOpening ? 'envelope-away 0.8s ease-in 0.6s forwards' : undefined,
        }}
      >
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px] overflow-visible">
          {/* Top faint ring ornament (replacing solid badge as requested) */}
          <div
            style={{
              top: '50px',
              width: '56px',
              height: '56px',
              transform: 'translate(-50%, -50%)',
              border: '2px solid rgba(185, 125, 62, 0.4)',
              boxShadow: '0 4px 18px rgba(185, 125, 62, 0.25), inset 0 1px 3px rgba(255,255,255,0.4)',
              backgroundColor: 'rgba(251, 248, 241, 0.6)',
              backdropFilter: 'blur(2px)',
              zIndex: 30,
              animation: isOpening
                ? 'seal-break 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                : 'seal-pulse 2s ease-in-out infinite',
            }}
            onClick={handleOpenClick}
            className="absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
          >
            {/* Subtle inner ring and delicate heart ornament */}
            <div className="w-10 h-10 rounded-full border border-[#B97D3E]/30 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#B97D3E]/70">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Opening seal ring pulse on click */}
          {isOpening && (
            <div
              style={{
                top: '50px',
                width: '56px',
                height: '56px',
                transform: 'translate(-50%, -50%)',
                border: '3px solid #B97D3E',
                zIndex: 29,
                animation: 'seal-ring 0.6s ease-out forwards',
              }}
              className="absolute left-1/2 rounded-full pointer-events-none"
            />
          )}

          {/* The Ivory Card Container */}
          <div
            style={{
              boxShadow:
                '0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(185, 125, 62, 0.15)',
              background: 'rgba(251, 248, 241, 0.98)',
              border: '1px solid rgba(185, 125, 62, 0.15)',
            }}
            className="relative rounded-lg overflow-visible"
          >
            {/* Top-Left Corner Floral - OVERFLOWING card edges */}
            <img
              src="/assets/flower.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute w-[44%] max-w-[230px] top-0 left-0 -translate-x-[26%] -translate-y-[26%] opacity-70 rotate-[8deg] drop-shadow-[0_4px_16px_rgba(185,125,62,0.18)] z-20"
            />

            {/* Bottom-Right Corner Floral - OVERFLOWING card edges */}
            <img
              src="/assets/flower.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute w-[44%] max-w-[230px] bottom-0 right-0 translate-x-[26%] translate-y-[26%] opacity-70 scale-x-[-1] rotate-[8deg] drop-shadow-[0_4px_16px_rgba(185,125,62,0.18)] z-20"
            />

            {/* Card Content */}
            <div className="relative z-10 text-center px-6 pt-24 pb-12 md:pt-24 md:pb-10 select-none">
              {/* Couple Names in Viaoda Libre with Alex Brush & */}
              <h1 className="mb-2 flex flex-col items-center leading-tight">
                <span className="block w-full text-center font-viaoda text-[23px] sm:text-[29px] md:text-[35px] text-[#B97D3E] tracking-normal">
                  {invitation.couple.first}
                </span>
                <span className="block w-full text-center font-alex text-xl sm:text-2xl text-[#B97D3E] leading-none my-1">
                  &amp;
                </span>
                <span className="block w-full text-center font-viaoda text-[21px] sm:text-[27px] md:text-[33px] text-[#B97D3E] tracking-normal">
                  {invitation.couple.second}
                </span>
              </h1>

              {/* Thin divider line with center ornament */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <div
                  style={{ background: 'linear-gradient(to right, transparent, #B97D3E)' }}
                  className="w-10 h-px"
                />
                <span style={{ color: '#B97D3E', opacity: 0.7 }} className="text-sm">
                  ❦
                </span>
                <div
                  style={{ background: 'linear-gradient(to left, transparent, #B97D3E)' }}
                  className="w-10 h-px"
                />
              </div>

              {/* Date text in Olive */}
              <div className="text-[17px] sm:text-[18px] text-[#8D8F58]/85 font-lora mb-4 flex flex-col items-center">
                <span>{invitation.displayDate}</span>
              </div>

              {/* Cordially Invites */}
              <div className="mb-6">
                <p className="text-[17px] sm:text-[18px] text-[#8D8F58]/85 font-lora font-light mb-2">
                  <span>{invitation.cover.line}</span>
                </p>
              </div>

              {/* Gold Pill "Open" Button with shine animation */}
              <button
                type="button"
                onClick={handleOpenClick}
                style={{
                  backgroundColor: '#B97D3E',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(185, 125, 62, 0.35)',
                }}
                className="relative px-8 py-2.5 text-base sm:text-lg font-semibold sm:font-medium rounded-full shadow-lg no-underline cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden font-lora transition-transform hover:scale-105 active:scale-95"
              >
                <span>{invitation.cover.button}</span>
                <div
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shine 3s ease-in-out infinite',
                  }}
                  className="absolute top-0 h-full w-8 pointer-events-none"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
