import { useLayoutEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bell,
  CheckSquare,
  LayoutDashboard,
  LineChart,
  Search,
  Settings,
  Users,
  WalletCards,
} from 'lucide-react';
import logoSm from '../assets/apiceflow-mark-sm.webp';

/*
 * Renderiza uma tela do app em largura fixa e escala para caber no espaço,
 * como um screenshot nítido em qualquer tamanho de tela.
 */
export function Scaled({ width = 1180, cropTo = 780, children, className = '' }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(undefined);

  useLayoutEffect(() => {
    const update = () => {
      if (!outer.current || !inner.current) return;
      // Em telas estreitas, mostra só a parte da esquerda maior, em vez da tela inteira minúscula
      const w = outer.current.clientWidth;
      const s = w < 640 ? w / cropTo : w / width;
      setScale(s);
      setHeight(inner.current.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer.current);
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [width, cropTo]);

  return (
    <div ref={outer} className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      <div ref={inner} className="absolute left-0 top-0 origin-top-left" style={{ width, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

const nav = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'clientes', icon: Users, label: 'Clientes' },
  { id: 'marketing', icon: LineChart, label: 'Marketing' },
  { id: 'tarefas', icon: CheckSquare, label: 'Tarefas' },
  { id: 'relatorios', icon: BarChart3, label: 'Relatórios' },
  { id: 'financeiro', icon: WalletCards, label: 'Financeiro' },
  { id: 'config', icon: Settings, label: 'Configurações' },
];

export function AppFrame({ active, title, subtitle, actions, children, minHeight = 660 }) {
  return (
    <div className="flex text-ink" style={{ minHeight }} aria-hidden="true">
      <aside className="flex w-[232px] shrink-0 flex-col border-r border-white/[0.05] bg-sidebar">
        <div className="flex h-[76px] items-center gap-3 border-b border-white/[0.06] px-5">
          <img src={logoSm} alt="" className="h-7 w-11 object-contain" />
          <span className="font-display text-[17px] font-semibold tracking-tight">ApiceFlow</span>
        </div>
        <nav className="space-y-1 px-3 py-5">
          {nav.map(({ id, icon: Icon, label }) => {
            const on = id === active;
            return (
              <div
                key={id}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium ${
                  on ? 'bg-white/[0.07] text-ink ring-1 ring-white/[0.08]' : 'text-mist'
                }`}
              >
                {on && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-mint/80" />}
                <Icon className={`h-[18px] w-[18px] ${on ? 'text-mint' : 'text-mist/80'}`} />
                {label}
              </div>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky text-[13px] font-semibold text-night">MR</span>
            <div className="leading-tight">
              <p className="text-[13px] font-medium">Marina Rocha</p>
              <p className="text-[12px] text-mist">Administradora</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-night">
        <header className="flex h-[76px] items-center gap-4 border-b border-white/[0.06] px-8">
          <div className="min-w-0">
            <p className="text-[22px] font-bold tracking-tight">{title}</p>
            {subtitle && <p className="text-[13px] text-mist">{subtitle}</p>}
          </div>
          <div className="ml-auto flex items-center gap-3">
            {actions}
            <div className="flex h-9 w-60 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 text-[13px] text-mist">
              <Search className="h-4 w-4" />
              Buscar
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-mist">
              <Bell className="h-4 w-4" />
            </span>
          </div>
        </header>
        <div className="p-8">{children}</div>
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
