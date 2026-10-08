import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function Schedule() {
  return (
    <section className="relative w-full py-12 md:py-18 overflow-visible">
      {/* Right-edge authentic flower and scroll repositioned beside rows, clear of title */}
      <img
        src="/assets/flower.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[75px] sm:top-[70px] md:top-[65px] right-0 w-[28%] sm:w-[26%] md:w-[24%] h-auto object-contain z-0 max-w-none"
        style={{ transform: 'translateX(35%) scaleX(-1)' }}
      />
      <img
        src="/assets/scroll.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[180px] sm:top-[190px] md:top-[210px] right-0 w-[30%] sm:w-[26%] md:w-[24%] h-auto object-contain opacity-90 z-0 max-w-none"
        style={{ transform: 'translateX(45%) scaleX(-1)' }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 text-center">
        {/* Section Heading: WEDDING DAY SCHEDULE */}
        <Reveal variant="fadeUp" delay={0.1}>
          <h2 className="font-times font-bold text-[20px] md:text-[24px] tracking-[0.06em] text-gold uppercase mb-10 md:mb-12">
            WEDDING DAY SCHEDULE
          </h2>
        </Reveal>

        {/* Timeline Container with Stacked Left Ornaments */}
        <div className="relative max-w-[320px] sm:max-w-sm md:max-w-md mx-auto flex flex-col items-center">
          {/* Two authentic stacked filigree ornaments on the left */}
          <div className="absolute -left-6 sm:-left-10 md:-left-14 top-1 bottom-1 flex flex-col justify-around pointer-events-none select-none z-10">
            <img
              src="/assets/filigree.webp"
              alt=""
              aria-hidden="true"
              className="w-5 sm:w-7 md:w-9 h-auto object-contain opacity-80"
              style={{ transform: 'rotate(90deg) scaleX(-1)' }}
            />
            <img
              src="/assets/filigree.webp"
              alt=""
              aria-hidden="true"
              className="w-5 sm:w-7 md:w-9 h-auto object-contain opacity-80"
              style={{ transform: 'rotate(90deg)' }}
            />
          </div>

          {/* Continuous vertical gold line connecting from top circle to bottom circle */}
          <div className="absolute top-[13px] bottom-[13px] left-1/2 -translate-x-1/2 w-[1.5px] bg-[#B97D3E]/70 pointer-events-none z-0" />

          <div className="w-full space-y-7 md:space-y-9 relative z-10">
            {invitation.schedule.map((item, idx) => (
              <Reveal key={idx} variant="fadeUp" delay={0.15 + idx * 0.1}>
                <div className="grid grid-cols-[1fr_28px_1fr] items-center gap-2 sm:gap-4 select-none">
                  {/* Time: right-aligned, bold gold */}
                  <span className="font-baskerville font-bold text-sm sm:text-base text-gold text-right tracking-wide">
                    {item.time}
                  </span>

                  {/* Center Dot */}
                  <div className="flex items-center justify-center relative z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B97D3E] ring-2 ring-cream shadow-[0_0_6px_rgba(185,125,62,0.5)]" />
                  </div>

                  {/* Label: left-aligned, olive */}
                  <span className="font-baskerville font-medium text-sm sm:text-base text-olive text-left tracking-wide">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
