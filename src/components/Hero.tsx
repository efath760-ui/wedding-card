import { motion } from 'framer-motion';
import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="relative isolate w-full overflow-visible">
      {/* Top-Right Cropped Flower Bloom Watermark */}
      <img
        src="/assets/flower.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[63%] md:w-[51%] h-auto object-contain z-0 max-w-none origin-center"
        style={{ opacity: 0.2, transform: 'translate(42%, -42%) rotate(45deg)' }}
      />

      {/* Left Bottom Floral overlapping frame exactly as in reference */}
      <img
        src="/assets/flower.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[380px] sm:top-[420px] md:top-[500px] w-[32%] md:w-[28%] h-auto object-contain z-30 max-w-none"
        style={{ transform: 'translateX(-40%) rotate(45deg)' }}
      />

      {/* Header Container */}
      <header className="relative z-20 flex w-full flex-col items-center px-4 sm:px-5 pt-[64px] md:pt-[96px] pb-4 md:pb-8">
        {/* "WELCOME TO OUR WEDDING" */}
        <Reveal variant="fadeUp" delay={0.1}>
          <p className="relative z-30 uppercase text-center text-[15px] md:text-[20px] tracking-[0.18em] whitespace-pre font-cormorant font-bold text-gold">
            {invitation.welcome}
          </p>
        </Reveal>

        {/* Centered Baroque Gold Floral Frame with idle vertical float */}
        <Reveal variant="fadeUp" delay={0.25} className="relative w-full flex justify-center mt-6 md:mt-9">
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[92%] max-w-[370px] sm:max-w-[420px] md:max-w-[480px]"
          >
            {/* The Authentic 3D Baroque Floral Frame */}
            <img
              src="/assets/frame-floral.webp"
              alt=""
              aria-hidden="true"
              className="relative block w-full h-auto object-contain z-10 select-none pointer-events-none drop-shadow-[0_8px_24px_rgba(185,125,62,0.18)]"
            />

            {/* Couple names inside the frame */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center leading-none uppercase font-viaoda text-gold px-2">
              <div className="flex w-[64%] sm:w-[60%] justify-center">
                <span className="whitespace-nowrap text-[13.5px] min-[360px]:text-[14.5px] sm:text-[18.5px] md:text-[23px] font-normal tracking-[0.025em] leading-[1.25]">
                  {invitation.couple.first}
                </span>
              </div>
              <span className="my-1 sm:my-2 md:my-2.5 font-alex text-sm sm:text-base md:text-xl text-gold lowercase leading-none opacity-90">
                &amp;
              </span>
              <div className="flex w-[64%] sm:w-[60%] justify-center">
                <span className="whitespace-nowrap text-[12px] min-[360px]:text-[13px] sm:text-[17px] md:text-[21px] font-normal tracking-[0.02em] leading-[1.25]">
                  {invitation.couple.second}
                </span>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </header>
    </section>
  );
}
