import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function Announcement() {
  return (
    <section className="relative isolate w-full px-3 md:px-6 pt-10 md:pt-16 pb-12 md:pb-20 z-10 overflow-visible text-center">
      {/* Left Baroque Scroll Ornament - mirrored with right scroll */}
      <img
        src="/assets/scroll.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[150px] sm:top-[170px] md:top-[190px] left-0 w-[34%] md:w-[26%] h-auto object-contain opacity-90 -z-0 max-w-none"
        style={{ transform: 'translateX(-62%)' }}
      />

      {/* Right Baroque Scroll Ornament */}
      <img
        src="/assets/scroll.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[150px] sm:top-[170px] md:top-[190px] right-0 w-[34%] md:w-[26%] h-auto object-contain opacity-90 -z-0 max-w-none"
        style={{ transform: 'translateX(62%) scaleX(-1)' }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-4">
        {/* "WE JOYFULLY ANNOUNCE THE WEDDING OF OUR CHILDREN" */}
        <Reveal variant="fadeUp" delay={0.1}>
          <div className="font-baskerville text-[14px] md:text-[18px] text-gold uppercase tracking-[0.14em] font-normal leading-relaxed mb-12 sm:mb-16">
            <p>{invitation.announce[0]}</p>
            <p>{invitation.announce[1]}</p>
          </div>
        </Reveal>

        {/* Stacked Names with large vertical gaps - sized to fit on one line on mobile */}
        <div className="flex flex-col items-center select-none w-full px-2">
          <Reveal variant="fadeUp" delay={0.25}>
            <h3 className="font-ebGaramond text-olive text-[25px] sm:text-[39px] md:text-[54px] font-normal leading-none tracking-wide whitespace-nowrap">
              {invitation.couple.first}
            </h3>
          </Reveal>

          {/* Small, calligraphic gold ampersand matching reference */}
          <Reveal variant="fadeUp" delay={0.35}>
            <span className="font-alex text-gold text-[26px] sm:text-[36px] md:text-[44px] my-5 sm:my-8 block leading-none">
              &amp;
            </span>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.45}>
            <h3 className="font-ebGaramond text-olive text-[23px] min-[360px]:text-[25px] sm:text-[38px] md:text-[54px] font-normal leading-none tracking-wide whitespace-nowrap">
              {invitation.couple.second}
            </h3>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
