import { CheckCheck, FileText } from 'lucide-react';
import logoSm from '../assets/apiceflow-mark-sm.webp';

export function Bubble({ from, time, children, delay }) {
  const mine = from === 'me';
  const anim = delay !== undefined ? { className: 'pop-in', style: { animationDelay: `${delay}s` } } : {};
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'} ${anim.className ?? ''}`} style={anim.style}>
      <div
        className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${
          mine ? 'rounded-br-md bg-[#134e3a] text-ink' : 'rounded-bl-md border border-white/[0.06] bg-surface text-ink'
        }`}
      >
        {children}
        <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-mist">
          {time}
          {mine && <CheckCheck className="h-3.5 w-3.5 text-teal" />}
        </span>
      </div>
    </div>
  );
}

export function TaskReply() {
  return (
    <>
      Pronto, criei a tarefa no quadro:
      <span className="mt-2 block rounded-xl border border-white/[0.07] bg-night/70 p-3">
        <span className="block font-medium text-ink">Revisar criativos da campanha de Natal</span>
        <span className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[13px]">
          <span className="text-mist">Cliente</span>
          <span>Loja Aurora</span>
          <span className="text-mist">Responsável</span>
          <span>Ana Souza</span>
          <span className="text-mist">Prazo</span>
          <span>sexta, 27/11</span>
          <span className="text-mist">Prioridade</span>
          <span>Alta</span>
        </span>
      </span>
    </>
  );
}

export function FileReply() {
  return (
    <>
      Achei na pasta da Loja Aurora no Drive:
      <span className="mt-2 flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-night/70 p-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/15 text-violet">
          <FileText className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium">Briefing campanha de Natal.pdf</span>
          <span className="block text-[11px] text-mist">PDF, 2,1 MB</span>
        </span>
      </span>
    </>
  );
}

export function Phone({ children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-[30px] border border-white/[0.1] bg-deep shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ${className}`} aria-hidden="true">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-sidebar px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mint/20 bg-night">
          <img src={logoSm} alt="" className="h-3.5 w-5" />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-ink">Assistente ApiceFlow</p>
          <p className="text-[12px] text-mint">online</p>
        </div>
      </div>
      <div className="space-y-3 px-3.5 py-4">{children}</div>
    </div>
  );
}
