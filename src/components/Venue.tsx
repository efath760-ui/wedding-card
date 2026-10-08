import { Navigation } from 'lucide-react';
import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function Venue() {
  const { venue } = invitation;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.address)}`;

  return (
    <section className="relative w-full pt-8 md:pt-12 pb-10 text-center overflow-visible">
      <div className="max-w-2xl mx-auto px-4 flex flex-col items-center">
        {/* Venue Name */}
        <Reveal variant="fadeUp" delay={0.1}>
          <h2 className="font-times font-bold text-[20px] md:text-[24px] tracking-[0.06em] text-gold uppercase mb-2">
            {venue.name}
          </h2>
        </Reveal>

        {/* Venue Address with bottom border */}
        <Reveal variant="fadeUp" delay={0.18}>
          <p className="font-baskerville text-sm md:text-base text-olive max-w-sm md:max-w-[500px] mx-auto pb-3 border-b border-[#B97D3E]/20">
            {venue.address}
          </p>
        </Reveal>

        {/* Embedded Google Map */}
        <Reveal variant="fadeUp" delay={0.28} className="w-full flex justify-center mt-6">
          <div className="h-[280px] md:h-[380px] w-full max-w-[340px] md:max-w-[560px] rounded-2xl overflow-hidden shadow-sm border border-gold/15">
            <iframe
              src={embedUrl}
              title={venue.name}
              loading="lazy"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </Reveal>

        {/* "Get directions" link with arrow icon */}
        <Reveal variant="fadeUp" delay={0.38}>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-baskerville text-olive hover:text-gold text-xs sm:text-sm mt-4 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 -rotate-45" />
            <span>Get directions</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
