import logoSm from '../assets/apiceflow-mark-sm.webp';

/*
 * Diagrama das integrações: tudo chega ao painel do ApiceFlow.
 * Os pontos que correm pelas linhas param com prefers-reduced-motion.
 */

const CENTER = { x: 500, y: 220 };

const nodes = [
  { id: 'whatsapp', name: 'WhatsApp', text: 'Pedidos da equipe e arquivos dos clientes', x: 250, y: 110, side: 'left' },
  { id: 'gemini', name: 'Gemini', text: 'Entende o que foi pedido', x: 250, y: 330, side: 'left' },
  { id: 'meta', name: 'Meta Ads', text: 'Campanhas e conversões', x: 750, y: 70, side: 'right' },
  { id: 'google', name: 'Google Ads', text: 'Conversões rastreadas', x: 750, y: 220, side: 'right' },
  { id: 'drive', name: 'Google Drive', text: 'Uma pasta por cliente', x: 750, y: 370, side: 'right' },
];

const path = (n) => {
  const midX = (n.x + CENTER.x) / 2;
  return `M ${n.x} ${n.y} C ${midX} ${n.y}, ${midX} ${CENTER.y}, ${CENTER.x} ${CENTER.y}`;
};

export default function IntegrationHub() {
  return (
    <>
      {/* Computador e tablet: diagrama */}
      <div className="relative mx-auto hidden aspect-[1000/440] w-full max-w-5xl md:block" aria-hidden="true">
        <svg viewBox="0 0 1000 440" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="hub-line" x1="0" x2="1">
              <stop offset="0" stopColor="#34D399" stopOpacity="0.05" />
              <stop offset="0.5" stopColor="#34D399" stopOpacity="0.35" />
              <stop offset="1" stopColor="#34D399" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {nodes.map((n, i) => (
            <g key={n.id}>
              <path id={`hub-${n.id}`} d={path(n)} fill="none" stroke="url(#hub-line)" strokeWidth="1.5" />
              <circle r="3" fill="#45F0B0" className="hub-dot">
                <animateMotion dur={`${3.2 + i * 0.45}s`} repeatCount="indefinite">
                  <mpath href={`#hub-${n.id}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>

        <div
          className="absolute flex h-[22%] w-[13%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-mint/30 bg-deep shadow-[0_0_60px_-10px_rgba(52,211,153,0.45)]"
          style={{ left: `${CENTER.x / 10}%`, top: `${(CENTER.y / 440) * 100}%` }}
        >
          <img src={logoSm} alt="" className="w-[55%]" />
          <span className="mt-1.5 font-display text-[clamp(11px,1.2vw,15px)] font-medium text-ink">ApiceFlow</span>
        </div>

        {nodes.map((n) => (
          <div
            key={n.id}
            // Os cartões encostam nas bordas do diagrama e as linhas saem da lateral deles
            className="absolute w-[25%] -translate-y-1/2 rounded-xl border border-white/[0.09] bg-surface/80 px-4 py-3 backdrop-blur"
            style={{ [n.side]: 0, top: `${(n.y / 440) * 100}%` }}
          >
            <p className="font-display text-[clamp(14px,1.5vw,18px)] font-medium text-ink">{n.name}</p>
            <p className="mt-0.5 text-[clamp(12px,1.1vw,14px)] leading-snug text-mist">{n.text}</p>
          </div>
        ))}
      </div>

      {/* Celular: lista */}
      <ul className="grid gap-px overflow-hidden rounded-[14px] border border-white/[0.09] bg-white/[0.06] md:hidden">
        {nodes.map((n) => (
          <li key={n.id} className="flex items-center justify-between gap-4 bg-night px-5 py-4">
            <p className="font-display text-[17px] font-medium text-ink">{n.name}</p>
            <p className="text-right text-[14px] text-mist">{n.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
