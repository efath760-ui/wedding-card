import { motion } from 'framer-motion';

interface MusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicButton({ isPlaying, onToggle }: MusicButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      className="fixed z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold text-cream shadow-[0_4px_16px_rgba(185,125,62,0.45)] hover:shadow-[0_6px_22px_rgba(185,125,62,0.65)] transition-shadow duration-300 focus:outline-none"
      style={{
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Single solid white music note (♪) matching reference */}
      <svg
        viewBox="0 0 24 24"
        className={`w-5 h-5 fill-white ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}
        aria-hidden="true"
      >
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    </motion.button>
  );
}
