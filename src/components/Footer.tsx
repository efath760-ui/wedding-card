import { invitation } from '../config/invitation';
import Reveal from './Reveal';

export default function Footer() {
  return (
    <footer
      className="relative w-full pt-10 text-center select-none"
      style={{
        paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 20px))',
      }}
    >
      <div className="max-w-md mx-auto px-6">
        <Reveal variant="fadeUp" delay={0.1}>
          <p className="font-lora text-xs sm:text-sm text-goldText tracking-wide leading-relaxed">
            {invitation.footer}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
