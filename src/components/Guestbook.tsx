import { useState, useEffect } from 'react';
import { Wand2 } from 'lucide-react';
import { invitation } from '../config/invitation';
import Reveal from './Reveal';

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const LocalStore = {
  async list(): Promise<Wish[]> {
    try {
      const data = localStorage.getItem('wedding_guestbook_wishes');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  async add(newWish: { name: string; message: string }): Promise<void> {
    const list = await this.list();
    const wish: Wish = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: newWish.name,
      message: newWish.message,
      createdAt: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
    };
    localStorage.setItem('wedding_guestbook_wishes', JSON.stringify([wish, ...list]));
  },
};

const prewrittenWishes = [
  'Wishing you both a lifetime of love, laughter, and endless happiness!',
  'May your marriage be filled with all the right ingredients: love, humor, understanding, and joy.',
  'Warmest congratulations to the wonderful couple! So thrilled to celebrate with you.',
  'May the love you share today grow stronger as you grow old together!',
  'Wishing you an extraordinary adventure together as husband and wife.',
];

export default function Guestbook() {
  const { guestbook } = invitation;
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    LocalStore.list().then(setWishes);
  }, []);

  const handleMagicWand = () => {
    const random = prewrittenWishes[Math.floor(Math.random() * prewrittenWishes.length)];
    setMessage(random);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await LocalStore.add({ name: trimmedName, message: trimmedMessage });
      const updated = await LocalStore.list();
      setWishes(updated);
      setName('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full pt-12 md:pt-18 pb-24 md:pb-28 overflow-visible">
      {/* Right-edge authentic baroque scroll */}
      <img
        src="/assets/scroll.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10px] sm:top-[-20px] right-0 w-[30%] sm:w-[26%] md:w-[24%] h-auto object-contain opacity-85 z-0 max-w-none"
        style={{ transform: 'translateX(52%) scaleX(-1)' }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-4 text-center overflow-visible">
        {/* Section Heading: GUESTBOOK */}
        <Reveal variant="fadeUp" delay={0.1}>
          <h2 className="font-times font-bold text-[20px] md:text-[24px] tracking-[0.06em] text-gold uppercase mb-7 md:mb-8">
            {guestbook.heading}
          </h2>
        </Reveal>

        {/* Card Container with lower-left floral sitting behind the card */}
        <div className="relative overflow-visible max-w-[440px] sm:max-w-lg md:max-w-xl mx-auto">
          {/* Lower-left floral sitting BEHIND and below the card */}
          <img
            src="/assets/flower.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 sm:-left-16 -bottom-6 sm:-bottom-10 w-32 sm:w-44 md:w-52 h-auto object-contain z-0 opacity-80"
            style={{ transform: 'rotate(35deg)' }}
          />

          {/* Guestbook card with thin rounded gold border */}
          <Reveal variant="fadeUp" delay={0.2}>
            <div className="relative z-10 rounded-2xl bg-white/45 backdrop-blur-xs border border-[#B97D3E]/30 p-4 sm:p-6 md:p-7 shadow-[0_4px_24px_rgba(185,125,62,0.06)] text-left">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name Input */}
                <input
                  type="text"
                  required
                  maxLength={60}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={guestbook.namePlaceholder}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white/60 border border-[#B97D3E]/30 rounded-xl text-olive placeholder:text-olive/40 focus:outline-none focus:border-gold transition-colors font-baskerville"
                />

                {/* Wishes Textarea */}
                <textarea
                  required
                  maxLength={300}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={guestbook.wishPlaceholder}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/60 border border-[#B97D3E]/30 rounded-xl text-olive placeholder:text-olive/40 focus:outline-none focus:border-gold transition-colors resize-none font-baskerville min-h-[90px]"
                />

                {/* Action Buttons: Wand (bottom-left) and Send (bottom-right) */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleMagicWand}
                    title="Insert a sample wish"
                    className="p-2 rounded-xl border border-[#B97D3E]/35 bg-white/70 text-gold hover:bg-[#B97D3E]/10 transition-colors cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: '#B97D3E',
                      boxShadow: '0 4px 14px rgba(185, 125, 62, 0.35)',
                    }}
                    className="px-6 sm:px-7 py-2 rounded-full text-white font-lora font-semibold text-[11px] sm:text-xs tracking-wider uppercase shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? 'Sending...' : guestbook.send}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Wishes List / Empty State */}
        <Reveal variant="fadeUp" delay={0.3} className="mt-5 text-center">
          {wishes.length === 0 ? (
            <p className="font-baskerville italic text-[11px] sm:text-xs text-olive/70">
              {guestbook.empty}
            </p>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-left mt-5">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-3.5 rounded-xl bg-white/60 border border-[#B97D3E]/20 text-xs text-olive space-y-1 font-baskerville"
                >
                  <div className="flex justify-between items-center font-bold text-gold">
                    <span>{w.name}</span>
                    <span className="text-[10px] text-olive/50 font-normal">
                      {w.createdAt}
                    </span>
                  </div>
                  <p className="text-olive/90 leading-relaxed font-lora">{w.message}</p>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {/* Closing Gold Sentiment Line - fits on one line without music button overlap */}
        <Reveal variant="fadeUp" delay={0.4} className="mt-7">
          <p className="font-baskerville italic text-[11px] sm:text-[13px] md:text-[15px] text-gold text-center tracking-normal sm:tracking-wide whitespace-nowrap px-1">
            {invitation.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
