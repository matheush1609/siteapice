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

      <MobileHub />
    </>
  );
}

/*
 * Celular: o mesmo diagrama na vertical. Entradas em cima (WhatsApp e Gemini),
 * o ApiceFlow no meio e as conexões de anúncios e arquivos embaixo.
 * Coordenadas num viewBox de 360 x 560; cartões e linhas usam a mesma escala.
 */
const M = { w: 360, h: 560, cardH: 84, center: { x: 180, top: 210, bottom: 306 } };

const mobileNodes = [
  { id: 'whatsapp', name: 'WhatsApp', text: 'Pedidos e arquivos', x: 0, y: 0, w: 170, edge: 'bottom' },
  { id: 'gemini', name: 'Gemini', text: 'Entende os pedidos', x: 190, y: 0, w: 170, edge: 'bottom' },
  { id: 'meta', name: 'Meta Ads', text: 'Campanhas e conversões', x: 0, y: 384, w: 170, edge: 'top' },
  { id: 'google', name: 'Google Ads', text: 'Conversões rastreadas', x: 190, y: 384, w: 170, edge: 'top' },
  { id: 'drive', name: 'Google Drive', text: 'Uma pasta por cliente', x: 95, y: 476, w: 170, edge: 'top' },
];

const mobilePath = (n) => {
  const ax = n.x + n.w / 2;
  const ay = n.edge === 'bottom' ? n.y + M.cardH : n.y;
  const cy = n.edge === 'bottom' ? M.center.top : M.center.bottom;
  const midY = (ay + cy) / 2;
  return `M ${ax} ${ay} C ${ax} ${midY}, ${M.center.x} ${midY}, ${M.center.x} ${cy}`;
};

const pct = (v, total) => `${(v / total) * 100}%`;

function MobileHub() {
  return (
    <div className="relative mx-auto aspect-[360/560] w-full max-w-[420px] md:hidden" aria-hidden="true">
      <svg viewBox={`0 0 ${M.w} ${M.h}`} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="hub-line-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#34D399" stopOpacity="0.08" />
            <stop offset="0.5" stopColor="#34D399" stopOpacity="0.4" />
            <stop offset="1" stopColor="#34D399" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {mobileNodes.map((n, i) => (
          <g key={n.id}>
            <path id={`hub-m-${n.id}`} d={mobilePath(n)} fill="none" stroke="url(#hub-line-v)" strokeWidth="1.5" />
            <circle r="3" fill="#45F0B0" className="hub-dot">
              <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite">
                <mpath href={`#hub-m-${n.id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </svg>

      <div
        className="absolute flex -translate-x-1/2 flex-col items-center justify-center rounded-2xl border border-mint/30 bg-deep shadow-[0_0_50px_-8px_rgba(52,211,153,0.5)]"
        style={{
          left: '50%',
          top: pct(M.center.top, M.h),
          width: pct(110, M.w),
          height: pct(M.center.bottom - M.center.top, M.h),
        }}
      >
        <img src={logoSm} alt="" className="w-[56%]" />
        <span className="mt-1 font-display text-[14px] font-medium text-ink">ApiceFlow</span>
      </div>

      {mobileNodes.map((n) => (
        <div
          key={n.id}
          className="absolute flex flex-col justify-center rounded-xl border border-white/[0.09] bg-surface/85 px-3.5 backdrop-blur"
          style={{ left: pct(n.x, M.w), top: pct(n.y, M.h), width: pct(n.w, M.w), height: pct(M.cardH, M.h) }}
        >
          <p className="font-display text-[15px] font-medium leading-tight text-ink">{n.name}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-mist">{n.text}</p>
        </div>
      ))}
    </div>
  );
}
