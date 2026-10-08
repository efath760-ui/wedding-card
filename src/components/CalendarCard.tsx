import React from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function CalendarCard() {
  const eventDate = new Date(invitation.eventDateISO);
  const eventDay = eventDate.getDate(); // 23

  // Weekdays Monday first
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // October 2026 starts on Thursday (index 3 with Monday=0)
  const totalDays = 31;
  const startDayOffset = 3;

  const calendarDays = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    calendarDays.push(d);
  }

  // Client-side .ics generator
  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.preventDefault();

    const startUTC = '20261023T130000Z';
    const endUTC = '20261023T160000Z';
    const title = `Wedding: ${invitation.couple.first} & ${invitation.couple.second}`;
    const location = `${invitation.venue.name}, ${invitation.venue.address}`;
    const description = `We joyfully celebrate the wedding of ${invitation.couple.first} & ${invitation.couple.second}.`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${startUTC}`,
      `DTEND:${endUTC}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative w-full py-10 md:py-14 flex flex-col items-center justify-center overflow-visible">
      <div className="relative w-full max-w-xl mx-auto px-4 flex flex-col items-center">
        {/* Ornate Gold Calendar Frame */}
        <Reveal variant="fadeUp" delay={0.15} className="relative w-full flex flex-col items-center">
          <div className="relative mx-auto w-full max-w-[360px] md:max-w-[440px] aspect-[394/307]">
            {/* The Authentic Calendar Frame Image */}
            <img
              src="/assets/calendar-frame.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-fill select-none"
            />

            {/* Interior Grid filling the frame as in the reference */}
            <div className="relative h-full w-full px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 flex flex-col justify-center select-none font-baskerville">
              {/* Month & Year: October 2026 (bold & gold) */}
              <h3 className="font-baskerville font-bold text-base md:text-lg text-gold text-center mb-1.5 tracking-wide">
                October 2026
              </h3>

              {/* Weekday Row (lighter weight) with solid gold line underneath */}
              <div className="grid grid-cols-7 text-center text-xs md:text-sm text-olive/80 font-normal pb-1 border-b border-[#B97D3E]">
                {weekdays.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5 text-center text-xs md:text-sm text-olive pt-2 items-center">
                {calendarDays.map((d, index) => {
                  if (d === null) {
                    return <span key={`empty-${index}`} />;
                  }

                  if (d === eventDay) {
                    return (
                      <div key={d} className="flex items-center justify-center relative">
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-full h-full fill-[#B97D3E] drop-shadow-[0_2px_4px_rgba(185,125,62,0.4)]"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[10px] sm:text-[11px] pb-0.5">
                            {d}
                          </span>
                        </motion.div>
                      </div>
                    );
                  }

                  return (
                    <span key={d} className="py-0.5">
                      {d}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* "Add to Calendar" Link */}
        <Reveal variant="fadeUp" delay={0.3}>
          <a
            href="#add-to-calendar"
            onClick={handleAddToCalendar}
            className="font-baskerville text-sm tracking-wider text-olive underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity mt-4 block text-center cursor-pointer"
          >
            Add to Calendar
          </a>
        </Reveal>

        {/* Authentic Divider Flourish Ornament underneath */}
        <Reveal variant="fadeUp" delay={0.4} className="w-full flex justify-center mt-6 md:mt-8">
          <img
            src="/assets/divider.webp"
            alt=""
            aria-hidden="true"
            className="h-[53px] md:h-[68px] w-auto object-contain opacity-90 pointer-events-none select-none"
          />
        </Reveal>
      </div>
    </section>
  );
}
