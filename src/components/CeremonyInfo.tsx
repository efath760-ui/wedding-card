import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function CeremonyInfo() {
  const { ceremony } = invitation;

  return (
    <section className="relative w-full py-10 md:py-14 text-center overflow-visible">
      <div className="max-w-2xl mx-auto px-4">
        {/* Section Heading: CEREMONY INFO */}
        <Reveal variant="fadeUp">
          <h2 className="font-times font-bold text-[20px] md:text-[24px] tracking-[0.06em] text-gold uppercase mb-8">
            {ceremony.heading}
          </h2>
        </Reveal>

        {/* 2-Column Grid with thin gold center vertical divider */}
        <Reveal variant="fadeUp" delay={0.15}>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 sm:gap-x-5 md:gap-x-8 max-w-lg mx-auto">
            {/* Left Column (Groom's Parents) */}
            <div className="flex flex-col items-center text-center">
              <p className="font-baskerville font-semibold text-[13px] sm:text-[16px] md:text-[18px] text-gold leading-tight">
                {ceremony.left.father}
              </p>
              <p className="font-baskerville text-[10px] sm:text-[12px] md:text-[13px] text-olive leading-snug mt-1.5 sm:mt-2">
                272/27,R-6, Baten Nagar, Mazar<br />Road, Mirpur-1
              </p>
            </div>

            {/* Center 1px thin gold vertical divider */}
            <div className="w-[1px] h-[40px] sm:h-[48px] md:h-[54px] bg-[#B97D3E]/40 self-center" />

            {/* Right Column (Bride's Parents) */}
            <div className="flex flex-col items-center text-center">
              <p className="font-baskerville font-semibold text-[13px] sm:text-[16px] md:text-[18px] text-gold leading-tight">
                {ceremony.right.father}
              </p>
              <p className="font-baskerville text-[10px] sm:text-[12px] md:text-[13px] text-olive leading-snug mt-1.5 sm:mt-2">
                {ceremony.right.address}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
