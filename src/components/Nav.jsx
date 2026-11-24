import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, MessageCircle, X } from 'lucide-react';
import logoSm from '../assets/apiceflow-mark-sm.webp';
import { DEFAULT_WHATSAPP_TEXT, whatsappLink } from '../config';

export const pages = [
  { to: '/recursos', label: 'Recursos' },
  { to: '/assistente', label: 'Assistente no WhatsApp' },
  { to: '/planos', label: 'Planos' },
  { to: '/contato', label: 'Contato' },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="ApiceFlow, página inicial">
      <img src={logoSm} alt="" width="40" height="26" className="h-[26px] w-10" />
      <span className="font-display text-[17px] font-medium tracking-[-0.01em] text-ink">ApiceFlow</span>
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => setOpen(false), [pathname]);

  useLayoutEffect(() => {
    const place = () => {
      const list = listRef.current;
      const link = list?.querySelector(`[data-nav="${pathname}"]`);
      if (!list || !link) {
        setIndicator((current) => ({ ...current, width: 0 }));
        return;
      }
      const l = list.getBoundingClientRect();
      const r = link.getBoundingClientRect();
      // a linha fica sob o texto, sem o padding do link
      setIndicator({ left: r.left - l.left + 12, width: r.width - 24 });
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled || open ? 'border-b border-white/[0.07] bg-night/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Principal" className="wrap flex h-16 items-center gap-8">
        <Logo />

        <ul ref={listRef} className="relative hidden h-16 items-center gap-1 lg:flex">
          {pages.map((page) => (
            <li key={page.to}>
              <NavLink
                to={page.to}
                data-nav={page.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-[15px] transition-colors duration-300 ${isActive ? 'text-ink' : 'text-mist hover:text-ink'}`
                }
              >
                {page.label}
              </NavLink>
            </li>
          ))}
          {/* Linha que desliza até a aba ativa */}
          <span
            aria-hidden="true"
            className="nav-indicator absolute bottom-0 left-0 h-px bg-mint"
            style={{ width: indicator.width, transform: `translateX(${indicator.left}px)`, opacity: indicator.width ? 1 : 0 }}
          />
        </ul>

        <a
          href={whatsappLink(DEFAULT_WHATSAPP_TEXT)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary ml-auto hidden min-h-10 px-4 text-sm sm:inline-flex"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar no WhatsApp
        </a>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-white/[0.05] sm:ml-0 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movel"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="menu-movel" className="border-t border-white/[0.06] lg:hidden">
          <ul className="wrap py-3">
            <li>
              <NavLink to="/" end className={({ isActive }) => `block py-3 text-lg ${isActive ? 'text-mint' : 'text-ink'}`}>
                Início
              </NavLink>
            </li>
            {pages.map((page) => (
              <li key={page.to}>
                <NavLink to={page.to} className={({ isActive }) => `block py-3 text-lg ${isActive ? 'text-mint' : 'text-ink'}`}>
                  {page.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="wrap border-t border-white/[0.06] py-4 sm:hidden">
            <a href={whatsappLink(DEFAULT_WHATSAPP_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
