import { useLayoutEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bell,
  Bot,
  CheckSquare,
  ChevronLeft,
  Command,
  Handshake,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Shield,
  Sparkles,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react';
import logoSm from '../assets/apiceflow-mark-sm.webp';

/*
 * Renderiza uma tela do app em largura fixa e escala para caber no espaço,
 * como um screenshot nítido em qualquer tamanho de tela.
 */
export function Scaled({ width = 1320, cropFrom = 256, cropTo = 620, children, className = '' }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(1);
  const [shift, setShift] = useState(0);
  const [height, setHeight] = useState(undefined);

  useLayoutEffect(() => {
    const update = () => {
      if (!outer.current || !inner.current) return;
      // Em celulares, esconde o menu lateral do app e mostra só o conteúdo, maior,
      // em vez da tela inteira minúscula
      const w = outer.current.clientWidth;
      const crop = w < 480;
      const s = crop ? w / cropTo : w / width;
      setScale(s);
      setShift(crop ? -cropFrom * s : 0);
      setHeight(inner.current.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer.current);
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [width, cropFrom, cropTo]);

  return (
    <div ref={outer} className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      <div ref={inner} className="absolute left-0 top-0 origin-top-left" style={{ width, transform: `translateX(${shift}px) scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

// Menu lateral igual ao da main do ApiceFlow (front-end/src/components/layout/Sidebar.jsx, perfil admin)
const nav = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'clientes', icon: Users, label: 'Clientes' },
  { id: 'marketing', icon: BarChart3, label: 'Marketing' },
  { id: 'tarefas', icon: CheckSquare, label: 'Tarefas' },
  { id: 'relatorios', icon: BarChart3, label: 'Relatorios' },
  { id: 'financeiro', icon: WalletCards, label: 'Financeiro' },
  { id: 'config', icon: Settings, label: 'Configurações' },
  { id: 'parceiros', icon: Handshake, label: 'Parceiros' },
  { id: 'usuarios', icon: Shield, label: 'Usuarios' },
  { id: 'ia', icon: Bot, label: 'IA Agents' },
];

const chip = 'flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 text-[12px] font-medium text-mist';

export function AppFrame({ active, title, subtitle, actions, children, minHeight = 700 }) {
  return (
    <div className="flex text-ink" style={{ minHeight }} aria-hidden="true">
      <aside className="flex w-64 shrink-0 flex-col border-r border-white/[0.05] bg-sidebar">
        <div className="flex h-[88px] items-center gap-3 border-b border-white/[0.06] px-5">
          <img src={logoSm} alt="" className="h-9 w-14 object-contain drop-shadow-[0_0_10px_rgba(52,211,153,0.18)]" />
          <div className="min-w-0">
            <span className="block font-display text-lg font-extrabold tracking-tight">ApiceFlow</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-mist">Command SaaS</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1.5 px-3 py-5">
          {nav.map(({ id, icon: Icon, label }) => {
            const on = id === active;
            return (
              <div
                key={id}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium ${
                  on ? 'bg-white/[0.07] text-ink shadow-md shadow-black/10 ring-1 ring-white/[0.08]' : 'text-mist'
                }`}
              >
                {on && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-mint/80" />}
                <Icon className={`h-5 w-5 ${on ? 'text-mint' : 'text-mist/80'}`} />
                {label}
              </div>
            );
          })}
        </nav>
        <div className="space-y-1.5 border-t border-white/[0.06] p-3 text-[14px] text-mist">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5"><ChevronLeft className="h-5 w-5" />Recolher</div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5"><LogOut className="h-5 w-5" />Sair</div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-night">
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-[360px] items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 text-[13px] text-mist">
              <Search className="h-4 w-4 text-mint/70" />
              <span className="flex-1">Buscar clientes, campanhas, tarefas...</span>
              <span className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[11px]">
                <Command className="h-3 w-3" /> K
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[12px] font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-mint" />
              Operational
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={chip}><Zap className="h-4 w-4 text-teal" />Quick action</span>
            <span className={chip}><Sparkles className="h-4 w-4 text-mint" />AI activity</span>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-mist">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(52,211,153,0.65)]" />
            </span>
            <span className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] py-1 pl-2 pr-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-mint to-teal text-[12px] font-black text-night">M</span>
              <span className="leading-tight">
                <span className="block text-[12px] font-semibold">Marina Rocha</span>
                <span className="block text-[11px] text-mist">admin</span>
              </span>
            </span>
          </div>
        </header>
        <div className="p-8">
          {title && (
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[30px] font-bold tracking-tight">{title}</p>
                {subtitle && <p className="mt-1 text-[14px] text-mist">{subtitle}</p>}
              </div>
              {actions}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

const tones = {
  mint: 'text-mint bg-mint/10 border-mint/20',
  teal: 'text-teal bg-teal/10 border-teal/20',
  sky: 'text-sky bg-sky/10 border-sky/20',
  amber: 'text-amber bg-amber/10 border-amber/20',
  violet: 'text-violet bg-violet/10 border-violet/20',
  red: 'text-red-300 bg-red-400/10 border-red-400/20',
  slate: 'text-slate-300 bg-slate-400/10 border-slate-400/20',
};

export function Stat({ label, value, icon: Icon, tone = 'mint', hint }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface/75 p-5">
      <div className="flex items-start justify-between">
        <p className="text-[13px] text-mist">{label}</p>
        {Icon && (
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${tones[tone]}`}>
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
      </div>
      <p className="mt-2 text-[28px] font-bold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-[12px] text-mist">{hint}</p>}
    </div>
  );
}

export function Badge({ tone = 'slate', children }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${tones[tone]}`}>{children}</span>;
}

export function Panel({ title, action, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/[0.08] bg-surface/75 ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <p className="text-[15px] font-semibold">{title}</p>
          {action && <span className="text-[13px] text-mist">{action}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

export function Avatar({ initials, tone = 'from-teal to-sky', size = 'h-7 w-7 text-[11px]' }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-night ${tone} ${size}`}>
      {initials}
    </span>
  );
}
