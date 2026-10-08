import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function ReceptionInfo() {
  const { reception } = invitation;

  return (
    <section className="relative w-full pt-12 md:pt-16 pb-8 md:pb-12 text-center overflow-visible">
      {/* Corinthian Stone Columns on outer edges */}
      <img
        src="/assets/column.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-[7.5%] h-[115%] -left-[12px] md:-left-[24px] w-auto object-contain z-0 max-w-none"
        style={{ transform: 'translateX(-50%)' }}
      />
      <img
        src="/assets/column.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-[7.5%] h-[115%] -right-[12px] md:-right-[24px] w-auto object-contain z-0 max-w-none"
        style={{ transform: 'translateX(50%) scaleX(-1)' }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-6">
        {/* Section Heading: RECEPTION INFO */}
        <Reveal variant="fadeUp" delay={0.1}>
          <h2 className="font-times font-bold text-[20px] md:text-[24px] tracking-[0.06em] text-gold uppercase mb-2">
            {reception.heading}
          </h2>
        </Reveal>

        {/* Sub-line: THE RECEPTION WILL TAKE PLACE AT: */}
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="font-baskerville font-semibold text-[13px] md:text-[15px] tracking-[0.1em] text-gold uppercase mb-5 sm:mb-6">
            {reception.sub}
          </p>
        </Reveal>

        {/* Time: 7:00 PM */}
        <Reveal variant="fadeUp" delay={0.3}>
          <p className="font-baskerville text-[26px] sm:text-[30px] md:text-[34px] font-normal text-olive mb-4 sm:mb-5">
            {reception.time}
          </p>
        </Reveal>

        {/* Date Row: FRIDAY | 23 | OCTOBER on one line */}
        <Reveal variant="fadeUp" delay={0.4}>
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 my-2 select-none">
            <span className="font-baskerville text-[13px] sm:text-[15px] tracking-[0.18em] uppercase text-olive font-normal">
              {reception.weekday}
            </span>

            {/* Solid vertical divider line */}
            <div className="w-[1.5px] h-6 sm:h-7 bg-[#8D8F58]/60 self-center" />

            {/* "23" large, slender, light serif weight in olive */}
            <span className="font-cormorant font-normal text-[46px] sm:text-[54px] md:text-[60px] text-olive leading-none px-1">
              {reception.day}
            </span>

            {/* Solid vertical divider line */}
            <div className="w-[1.5px] h-6 sm:h-7 bg-[#8D8F58]/60 self-center" />

            <span className="font-baskerville text-[13px] sm:text-[15px] tracking-[0.18em] uppercase text-olive font-normal">
              {reception.month}
            </span>
          </div>
        </Reveal>

        {/* Year: 2026 */}
        <Reveal variant="fadeUp" delay={0.5}>
          <p className="font-baskerville text-[16px] sm:text-[18px] text-olive mt-4 sm:mt-5 tracking-[0.2em] font-normal">
            {reception.year}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
