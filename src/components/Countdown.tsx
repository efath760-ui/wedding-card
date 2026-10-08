import { invitation } from '../config/invitation';
import { useCountdown } from '../hooks/useCountdown';
import Reveal from './Reveal';

export default function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(invitation.eventDateISO);

  return (
    <section className="relative w-full py-8 md:py-10 text-center overflow-visible">
      <div className="max-w-md mx-auto px-4">
        {/* Section Heading: COUNTDOWN */}
        <Reveal variant="fadeUp" delay={0.1}>
          <h2 className="font-baskerville font-semibold text-[14px] md:text-[17px] tracking-[0.08em] text-gold uppercase mb-3">
            {invitation.countdownLabel}
          </h2>
        </Reveal>

        {/* Live Ticking String with tabular-nums so no layout jump occurs */}
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="font-baskerville text-[15px] md:text-[18px] text-olive tracking-wide tabular-nums font-normal">
            {isPast ? (
              <span>Today is the special day!</span>
            ) : (
              <span>
                {days} days {hours} hours {minutes} min {seconds} sec
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
