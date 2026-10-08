import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Cover from './components/Cover';
import Hero from './components/Hero';
import CeremonyInfo from './components/CeremonyInfo';
import Announcement from './components/Announcement';
import ReceptionInfo from './components/ReceptionInfo';
import Countdown from './components/Countdown';
import CalendarCard from './components/CalendarCard';
import Venue from './components/Venue';
import Schedule from './components/Schedule';
import Guestbook from './components/Guestbook';
import MusicButton from './components/MusicButton';
import { useMusic } from './hooks/useMusic';

export default function App() {
  const [isOpen, setIsOpen] = useState(() => {
    // Allows query param ?open=1 for direct inspection & automated tests
    return window.location.search.includes('open=1');
  });

  const { isPlaying, togglePlay, startMusic } = useMusic();

  // If page was loaded directly with ?open=1, attempt initial playback
  useEffect(() => {
    if (window.location.search.includes('open=1')) {
      startMusic();
    }
  }, [startMusic]);

  // Auto-scroll slowly down when card opens
  useEffect(() => {
    if (!isOpen) return;

    let animId: number;
    let isUserInteracting = false;
    let lastTime: number | null = null;
    const pixelsPerSecond = 36; // Calm, elegant wedding scroll speed

    const stopAutoScroll = () => {
      isUserInteracting = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('wheel', stopAutoScroll);
      window.removeEventListener('touchstart', stopAutoScroll);
      window.removeEventListener('pointerdown', stopAutoScroll);
      window.removeEventListener('keydown', stopAutoScroll);
    };

    window.addEventListener('wheel', stopAutoScroll, { passive: true });
    window.addEventListener('touchstart', stopAutoScroll, { passive: true });
    window.addEventListener('pointerdown', stopAutoScroll, { passive: true });
    window.addEventListener('keydown', stopAutoScroll, { passive: true });

    // Small delay after opening so the opening transition settles
    const timer = setTimeout(() => {
      const step = (now: number) => {
        if (isUserInteracting) return;
        if (lastTime !== null) {
          const delta = (now - lastTime) / 1000;
          window.scrollBy(0, delta * pixelsPerSecond);
        }
        lastTime = now;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY < maxScroll - 5) {
          animId = requestAnimationFrame(step);
        }
      };
      animId = requestAnimationFrame(step);
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
      stopAutoScroll();
    };
  }, [isOpen]);

  return (
    <div className="relative min-h-screen w-full bg-cream text-olive overflow-x-clip selection:bg-gold/20">
      {/* Background Subtle Damask Wallpaper for the Opened Page */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.07] z-0"
        style={{
          backgroundImage: 'url(/assets/page-bg.webp)',
          backgroundRepeat: 'repeat',
          backgroundSize: '800px auto',
        }}
      />

      {/* Cover Overlay with Opening Animation */}
      <AnimatePresence>
        {!isOpen && (
          <Cover
            onOpen={() => setIsOpen(true)}
            onStartMusic={startMusic}
          />
        )}
      </AnimatePresence>

      {/* Main Invitation Page Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[680px] mx-auto flex flex-col items-center overflow-visible"
        >
          <Hero />
          <CeremonyInfo />
          <Announcement />
          <ReceptionInfo />
          <Countdown />
          <CalendarCard />
          <Venue />
          <Schedule />
          <Guestbook />

          {/* Floating Music Equalizer Button */}
          <MusicButton isPlaying={isPlaying} onToggle={togglePlay} />
        </motion.div>
      )}
    </div>
  );
}
