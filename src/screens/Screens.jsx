import {
  Activity,
  Bot,
  Braces,
  KeyRound,
  PlugZap,
  ShieldCheck,
  Webhook,
  Zap,
  Building2,
  CircleCheckBig,
  CircleDollarSign,
  Clock,
  Clock3,
  DollarSign,
  FileImage,
  FileText,
  FileVideo,
  Folder,
  MessageCircle,
  Plus,
  Target,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react';
import { AppFrame, Avatar, Badge, Panel, Stat, useMobile } from './AppFrame';

/* Dados de exemplo usados em todas as telas */
const clients = [
  { name: 'Loja Aurora', segment: 'Varejo de moda', status: 'Ativo', plan: 'Meta e Google Ads', owner: 'AS' },
  { name: 'Padaria Trigo Bom', segment: 'Alimentação', status: 'Ativo', plan: 'Meta Ads', owner: 'DL' },
  { name: 'Clínica Vida Plena', segment: 'Saúde', status: 'Pendente', plan: 'Google Ads', owner: 'CM' },
  { name: 'Construtora Prisma', segment: 'Imobiliário', status: 'Ativo', plan: 'Meta e Google Ads', owner: 'RC' },
  { name: 'Pet Feliz', segment: 'Pet shop', status: 'Ativo', plan: 'Meta Ads', owner: 'AS' },
];

const statusTone = { Ativo: 'mint', Pendente: 'amber' };

// Grade dos cartões de números: 4 colunas no computador, 2 no celular
const statGrid = (m) => (m ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-4 gap-4');

export function DashboardScreen() {
  const m = useMobile();
  return (
    <AppFrame active="dashboard" title="Dashboard" subtitle="Terça-feira, 24 de novembro">
      <div className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/80 ${m ? 'p-5' : 'p-7'}`}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/50 to-transparent" />
        <p className={`font-display font-bold tracking-tight ${m ? 'text-[26px]' : 'text-[34px]'}`}>
          Olá, <span className="bg-gradient-to-r from-ink via-mint to-teal bg-clip-text text-transparent">Marina</span>
        </p>
        <p className="mt-2 text-[14px] text-mist">Visão operacional dos clientes, campanhas e tarefas da equipe.</p>
      </div>
      <div className={`mt-5 ${statGrid(m)}`}>
        <Stat label="Total de clientes" value="28" icon={Building2} tone="mint" />
        <Stat label="Clientes ativos" value="24" icon={Users} tone="teal" />
        <Stat label="Pendentes" value="4" icon={TrendingUp} tone="amber" />
        <Stat label="Arquivos enviados" value="312" icon={FileImage} tone="violet" />
      </div>
      <Panel title="Clientes recentes" action="Ver todos" className="mt-5">
        {m ? (
          <ul>
            {clients.slice(0, 4).map((c) => (
              <li key={c.name} className="flex items-center gap-3 border-t border-white/[0.05] px-4 py-3 first:border-t-0">
                <Avatar initials={c.owner} tone={avatarTone[c.owner]} />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium">{c.name}</p>
                  <p className="text-[12.5px] text-mist">{c.segment}</p>
                </div>
                <Badge tone={statusTone[c.status]}>{c.status}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <table className="w-full text-left text-[14px]">
            <thead className="text-[12px] text-mist">
              <tr>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Segmento</th>
                <th className="px-5 py-3 font-medium">Canais</th>
                <th className="px-5 py-3 font-medium">Responsável</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.name} className="border-t border-white/[0.05]">
                  <td className="px-5 py-3.5 font-medium">{c.name}</td>
                  <td className="px-5 py-3.5 text-mist">{c.segment}</td>
                  <td className="px-5 py-3.5 text-mist">{c.plan}</td>
                  <td className="px-5 py-3.5">
                    <Avatar initials={c.owner} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone[c.status]}>{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </AppFrame>
  );
}

const priority = {
  Baixa: 'slate',
  Média: 'sky',
  Alta: 'amber',
  Urgente: 'red',
};

const columns = [
  {
    label: 'A Fazer',
    bar: 'border-l-slate-400/50',
    tasks: [
      { title: 'Roteiro dos Reels de dezembro', client: 'Pet Feliz', who: 'CM', p: 'Média', due: '28/11' },
      { title: 'Ajustar público de remarketing', client: 'Construtora Prisma', who: 'RC', p: 'Baixa', due: '02/12' },
    ],
  },
  {
    label: 'Em Andamento',
    bar: 'border-l-cyan-400/60',
    tasks: [
      { title: 'Campanha de Natal no Meta Ads', client: 'Loja Aurora', who: 'DL', p: 'Alta', due: '25/11' },
      { title: 'Landing page de consultas', client: 'Clínica Vida Plena', who: 'RC', p: 'Urgente', due: 'hoje' },
    ],
  },
  {
    label: 'Em Revisão',
    bar: 'border-l-amber-400/60',
    tasks: [{ title: 'Relatório de outubro', client: 'Padaria Trigo Bom', who: 'CM', p: 'Média', due: '26/11' }],
  },
  {
    label: 'Concluído',
    bar: 'border-l-emerald-400/60',
    tasks: [
      { title: 'Criativos da Black Friday', client: 'Loja Aurora', who: 'AS', p: 'Alta', due: '20/11' },
      { title: 'Pixel de conversão no site', client: 'Pet Feliz', who: 'DL', p: 'Média', due: '18/11' },
    ],
  },
];

const avatarTone = {
  AS: 'from-mint to-teal',
  DL: 'from-sky to-violet',
  CM: 'from-amber to-mint',
  RC: 'from-violet to-sky',
};

function TaskCard({ t, fresh = false }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-surface/80 p-3.5">
      {fresh && (
        <p className="mb-2 flex items-center gap-1.5 text-[11.5px] font-medium text-mint">
          <Bot className="h-3.5 w-3.5" /> Criada pelo assistente no WhatsApp
        </p>
      )}
      <p className="text-[14px] font-medium leading-snug">{t.title}</p>
      <p className="mt-1 text-[12.5px] text-mist">{t.client}</p>
      <div className="mt-3 flex items-center gap-2">
        <Badge tone={priority[t.p]}>{t.p}</Badge>
        <span className="ml-auto flex items-center gap-1 text-[12px] text-mist">
          <Clock className="h-3.5 w-3.5" />
          {t.due}
        </span>
        <Avatar initials={t.who} tone={avatarTone[t.who]} size="h-6 w-6 text-[10px]" />
      </div>
    </div>
  );
}

export const NEW_TASK = { title: 'Revisar criativos da campanha de Natal', client: 'Loja Aurora', who: 'AS', p: 'Alta', due: '27/11' };

export function TasksScreen({ newTask = false, newTaskDelay = 0 }) {
  const m = useMobile();
  const count = (col, i) => col.tasks.length + (newTask && i === 0 ? 1 : 0);

  if (m) {
    // No celular o quadro mostra uma coluna por vez, com as outras em abas
    return (
      <AppFrame
        active="tarefas"
        title="Tarefas"
        subtitle="Quadro da equipe"
        actions={
          <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-mint px-3.5 text-[13px] font-semibold text-night">
            <Plus className="h-4 w-4" /> Nova tarefa
          </span>
        }
      >
        <div className="mb-4 flex gap-1.5 overflow-hidden">
          {columns.map((c, i) => (
            <span
              key={c.label}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] ${
                i === 0 ? 'border-mint/40 bg-mint/10 text-ink' : 'border-white/[0.08] text-mist'
              }`}
            >
              {c.label}
              <span className="text-mist">{count(c, i)}</span>
            </span>
          ))}
        </div>
        <div className="space-y-3">
          {newTask && (
            <div style={{ animationDelay: `${newTaskDelay}s` }} className="row-flash rounded-xl">
              <TaskCard t={NEW_TASK} fresh />
            </div>
          )}
          {columns[0].tasks.map((t) => (
            <TaskCard key={t.title} t={t} />
          ))}
        </div>
      </AppFrame>
    );
  }

  return (
    <AppFrame
      active="tarefas"
      title="Tarefas"
      subtitle="Quadro da equipe"
      actions={
        <span className="flex h-9 items-center gap-1.5 rounded-lg bg-mint px-3.5 text-[13px] font-semibold text-night">
          <Plus className="h-4 w-4" /> Nova tarefa
        </span>
      }
    >
      <div className="grid grid-cols-4 gap-4">
        {columns.map((col, i) => (
          <div key={col.label} className={`rounded-2xl border border-white/[0.06] border-l-2 bg-deep/70 p-3 ${col.bar}`}>
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-[14px] font-semibold">{col.label}</p>
              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[12px] text-mist">{count(col, i)}</span>
            </div>
            <div className="space-y-3">
              {newTask && i === 0 && (
                <div style={{ animationDelay: `${newTaskDelay}s` }} className="row-flash rounded-xl">
                  <TaskCard t={NEW_TASK} fresh />
                </div>
              )}
              {col.tasks.map((t) => (
                <TaskCard key={t.title} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppFrame>
  );
}

const campaigns = [
  { name: 'Natal 2026', client: 'Loja Aurora', ch: 'Meta Ads', status: 'Ativa', spent: 'R$ 6.240', conv: 412, cpa: 'R$ 15,15' },
  {
    name: 'Consultas | Pesquisa',
    client: 'Clínica Vida Plena',
    ch: 'Google Ads',
    status: 'Ativa',
    spent: 'R$ 3.880',
    conv: 186,
    cpa: 'R$ 20,86',
  },
  { name: 'Residencial Alto', client: 'Construtora Prisma', ch: 'Meta Ads', status: 'Ativa', spent: 'R$ 9.150', conv: 97, cpa: 'R$ 94,33' },
  {
    name: 'Encomendas de Natal',
    client: 'Padaria Trigo Bom',
    ch: 'Meta Ads',
    status: 'Pausada',
    spent: 'R$ 1.120',
    conv: 138,
    cpa: 'R$ 8,12',
  },
  { name: 'Ração premium', client: 'Pet Feliz', ch: 'Google Ads', status: 'Ativa', spent: 'R$ 2.460', conv: 221, cpa: 'R$ 11,13' },
];

const series = {
  meta: [22, 26, 24, 31, 35, 33, 41, 38, 44, 49, 46, 53, 58, 55],
  google: [14, 15, 17, 16, 19, 22, 21, 24, 23, 27, 26, 29, 31, 33],
};

function Line({ data, color, max = 64, w = 640, h = 180 }) {
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - (v / max) * h}`).join(' ');
  return (
    <>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={color} opacity="0.08" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </>
  );
}

export function MarketingScreen() {
  const m = useMobile();
  return (
    <AppFrame active="marketing" title="Campanhas" subtitle="Meta Ads e Google Ads, últimos 14 dias">
      <div className={statGrid(m)}>
        <Stat label="Investimento" value="R$ 22.850" icon={DollarSign} tone="mint" />
        <Stat label="Conversões" value="1.054" icon={Target} tone="teal" />
        <Stat label="Custo por conversão" value="R$ 21,68" icon={TrendingUp} tone="sky" />
        <Stat label="Campanhas ativas" value="14" icon={CircleCheckBig} tone="violet" />
      </div>
      <Panel
        title="Conversões por dia"
        action={
          <span className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-full bg-mint" />
              Meta Ads
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-full bg-sky" />
              Google Ads
            </span>
          </span>
        }
        className={m ? 'mt-5' : 'mt-6'}
      >
        <div className={m ? 'px-4 py-4' : 'px-5 py-5'}>
          <svg viewBox="0 0 640 180" className={`w-full ${m ? 'h-[120px]' : 'h-[180px]'}`} preserveAspectRatio="none">
            {[0, 45, 90, 135].map((y) => (
              <line key={y} x1="0" x2="640" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
            ))}
            <Line data={series.google} color="#40B5F5" />
            <Line data={series.meta} color="#34D399" />
          </svg>
        </div>
      </Panel>
      <Panel title="Campanhas" action={m ? null : 'Rastreamento de conversões ativo'} className={m ? 'mt-5' : 'mt-6'}>
        {m ? (
          <ul>
            {campaigns.slice(0, 3).map((c) => (
              <li key={c.name} className="flex items-center gap-3 border-t border-white/[0.05] px-4 py-3 first:border-t-0">
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium">{c.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-mist">{c.client}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[14px] font-semibold">{c.conv} conv.</p>
                  <Badge tone={c.ch === 'Meta Ads' ? 'mint' : 'sky'}>{c.ch}</Badge>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <table className="w-full text-left text-[14px]">
            <thead className="text-[12px] text-mist">
              <tr>
                {['Campanha', 'Cliente', 'Canal', 'Status', 'Investido', 'Conversões', 'Custo/conv.'].map((h) => (
                  <th key={h} className="whitespace-nowrap px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="border-t border-white/[0.05]">
                  <td className="whitespace-nowrap px-5 py-3.5 font-medium">{c.name}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-mist">{c.client}</td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <Badge tone={c.ch === 'Meta Ads' ? 'mint' : 'sky'}>{c.ch}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-mist">{c.status}</td>
                  <td className="whitespace-nowrap px-5 py-3.5">{c.spent}</td>
                  <td className="whitespace-nowrap px-5 py-3.5">{c.conv}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-mist">{c.cpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </AppFrame>
  );
}

const bills = [
  { name: 'Ferramenta de design', cat: 'Software', value: 'R$ 289,00', due: '26/11', status: 'Pendente' },
  { name: 'Freelancer de vídeo', cat: 'Equipe', value: 'R$ 1.800,00', due: '28/11', status: 'Pendente' },
  { name: 'Internet do escritório', cat: 'Infraestrutura', value: 'R$ 199,90', due: '20/11', status: 'Paga' },
  { name: 'Banco de imagens', cat: 'Software', value: 'R$ 149,00', due: '15/11', status: 'Paga' },
];

const categories = [
  ['Equipe', 62, 'bg-mint'],
  ['Software', 21, 'bg-sky'],
  ['Infraestrutura', 11, 'bg-violet'],
  ['Outros', 6, 'bg-amber'],
];

export function FinanceScreen() {
  const m = useMobile();
  return (
    <AppFrame active="financeiro" title="Financeiro" subtitle="Gastos e contas da agência">
      <div className={statGrid(m)}>
        <Stat label="Total de gastos" value="R$ 48.920" icon={WalletCards} tone="mint" />
        <Stat label="Gastos do mês" value="R$ 9.734" icon={CircleDollarSign} tone="teal" />
        <Stat label="Contas pendentes" value="6" icon={Clock3} tone="amber" />
        <Stat label="Contas pagas" value="31" icon={CircleCheckBig} tone="violet" />
      </div>
      <div className={m ? 'mt-5 space-y-5' : 'mt-6 grid grid-cols-[1.5fr_1fr] gap-6'}>
        <Panel title="Próximos pagamentos" action="Novembro">
          <ul>
            {(m ? bills.slice(0, 3) : bills).map((b) => (
              <li
                key={b.name}
                className={`flex items-center border-t border-white/[0.05] text-[14px] first:border-t-0 ${m ? 'gap-3 px-4 py-3' : 'gap-4 px-5 py-3.5'}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{b.name}</p>
                  <p className="text-[12.5px] text-mist">
                    {b.cat}, vence {b.due}
                  </p>
                </div>
                <p className="font-medium">{b.value}</p>
                <Badge tone={b.status === 'Paga' ? 'mint' : 'amber'}>{b.status}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Gastos por categoria">
          <div className="space-y-4 p-5">
            {categories.map(([name, pct, color]) => (
              <div key={name}>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span>{name}</span>
                  <span className="text-mist">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.06]">
                  <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppFrame>
  );
}

const byClient = [
  ['Loja Aurora', 8400, 6240, 'bg-mint'],
  ['Construtora Prisma', 10000, 9150, 'bg-sky'],
  ['Clínica Vida Plena', 5000, 3880, 'bg-teal'],
  ['Pet Feliz', 3000, 2460, 'bg-violet'],
  ['Padaria Trigo Bom', 1500, 1120, 'bg-amber'],
];

export function ReportsScreen() {
  const m = useMobile();
  return (
    <AppFrame active="relatorios" title="Relatórios" subtitle="Novembro de 2026">
      <div className={statGrid(m)}>
        <Stat label="Orçamento total" value="R$ 27.900" icon={DollarSign} tone="mint" />
        <Stat label="Total gasto" value="R$ 22.850" icon={TrendingUp} tone="amber" />
        <Stat label="Conversões" value="1.054" icon={Target} tone="teal" />
        <Stat label="ROI estimado" value="312%" icon={TrendingUp} tone="violet" />
      </div>
      <Panel title="Orçamento e gasto por cliente" className={m ? 'mt-5' : 'mt-6'}>
        <div className={m ? 'space-y-4 p-4' : 'space-y-5 p-5'}>
          {byClient.map(([name, budget, spent, color]) =>
            m ? (
              <div key={name} className="text-[13.5px]">
                <div className="mb-1.5 flex justify-between">
                  <span>{name}</span>
                  <span className="text-mist">R$ {spent.toLocaleString('pt-BR')}</span>
                </div>
                <div className="relative h-2.5 rounded-full bg-white/[0.06]">
                  <div className={`absolute inset-y-0 left-0 rounded-full ${color}`} style={{ width: `${(spent / budget) * 100}%` }} />
                </div>
              </div>
            ) : (
              <div key={name} className="grid grid-cols-[180px_1fr_150px] items-center gap-4 text-[13.5px]">
                <span>{name}</span>
                <div className="relative h-3 rounded-full bg-white/[0.06]">
                  <div className={`absolute inset-y-0 left-0 rounded-full ${color}`} style={{ width: `${(spent / budget) * 100}%` }} />
                </div>
                <span className="text-right text-mist">
                  R$ {spent.toLocaleString('pt-BR')} de {budget.toLocaleString('pt-BR')}
                </span>
              </div>
            ),
          )}
        </div>
      </Panel>
    </AppFrame>
  );
}

const files = [
  {
    name: 'Briefing campanha de Natal.pdf',
    icon: FileText,
    tone: 'text-violet bg-violet/10',
    size: '2,1 MB',
    by: 'Ana Souza',
    via: 'Painel',
    when: 'há 2 dias',
  },
  {
    name: 'Foto vitrine nova coleção.jpg',
    icon: FileImage,
    tone: 'text-sky bg-sky/10',
    size: '4,8 MB',
    by: 'Loja Aurora',
    via: 'WhatsApp',
    when: 'hoje, 09:14',
  },
  {
    name: 'Vídeo depoimento cliente.mp4',
    icon: FileVideo,
    tone: 'text-amber bg-amber/10',
    size: '38 MB',
    by: 'Loja Aurora',
    via: 'WhatsApp',
    when: 'ontem',
  },
  {
    name: 'Contrato 2026 assinado.pdf',
    icon: FileText,
    tone: 'text-violet bg-violet/10',
    size: '640 KB',
    by: 'Marina Rocha',
    via: 'Painel',
    when: '12/11',
  },
  { name: 'Logo versões.zip', icon: Folder, tone: 'text-mint bg-mint/10', size: '12 MB', by: 'Diego Lima', via: 'Painel', when: '03/11' },
];

export function FilesScreen() {
  const m = useMobile();
  const fileTabs = m
    ? ['Visão geral', 'Tarefas', 'Arquivos', 'Financeiro']
    : ['Visão geral', 'Campanhas', 'Tarefas', 'Arquivos', 'Financeiro'];
  return (
    <AppFrame active="clientes" title="Loja Aurora" subtitle="Varejo de moda, cliente desde março de 2025">
      <div className={`flex overflow-hidden ${m ? 'mb-4 gap-1 text-[13px]' : 'mb-6 gap-2 text-[14px]'}`}>
        {fileTabs.map((t) => (
          <span
            key={t}
            className={`shrink-0 rounded-lg ${m ? 'px-2.5 py-1.5' : 'px-3.5 py-2'} ${t === 'Arquivos' ? 'bg-white/[0.07] font-medium text-ink ring-1 ring-white/[0.08]' : 'text-mist'}`}
          >
            {t}
          </span>
        ))}
      </div>
      <Panel title="Pasta no Google Drive" action={m ? null : 'Loja Aurora / Arquivos do cliente'}>
        {m ? (
          <ul>
            {files.slice(0, 4).map((f) => (
              <li key={f.name} className="flex items-center gap-3 border-t border-white/[0.05] px-4 py-3 first:border-t-0">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${f.tone}`}>
                  <f.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium">{f.name}</p>
                  <p className="text-[12px] text-mist">
                    {f.by}, {f.when}
                  </p>
                </div>
                {f.via === 'WhatsApp' && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint/10 text-mint">
                    <MessageCircle className="h-3.5 w-3.5" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <table className="w-full text-left text-[14px]">
            <thead className="text-[12px] text-mist">
              <tr>
                {['Arquivo', 'Tamanho', 'Enviado por', 'Origem', 'Quando'].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.name} className="border-t border-white/[0.05]">
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${f.tone}`}>
                        <f.icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{f.name}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3 text-mist">{f.size}</td>
                  <td className="px-5 py-3 text-mist">{f.by}</td>
                  <td className="px-5 py-3">
                    {f.via === 'WhatsApp' ? (
                      <Badge tone="mint">
                        <MessageCircle className="mr-1 h-3 w-3" /> WhatsApp
                      </Badge>
                    ) : (
                      <Badge>Painel</Badge>
                    )}
                  </td>
                  <td className="px-5 py-3 text-mist">{f.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </AppFrame>
  );
}

export function ClientsScreen() {
  const m = useMobile();
  const list = [...clients, { name: 'Studio Kaya', segment: 'Moda autoral', status: 'Ativo', plan: 'Meta Ads', owner: 'CM' }];
  return (
    <AppFrame
      active="clientes"
      title="Clientes"
      subtitle="28 clientes, 24 ativos"
      actions={
        <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-mint px-3.5 text-[13px] font-semibold text-night">
          <Plus className="h-4 w-4" /> Novo cliente
        </span>
      }
    >
      <div className={m ? 'space-y-3' : 'grid grid-cols-3 gap-4'}>
        {(m ? list.slice(0, 3) : list).map((c) => (
          <div key={c.name} className={`rounded-2xl border border-white/[0.08] bg-surface/75 ${m ? 'p-4' : 'p-5'}`}>
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] font-display text-[15px] font-semibold">
                {c.name
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <Badge tone={statusTone[c.status]}>{c.status}</Badge>
            </div>
            <p className="mt-4 text-[16px] font-semibold">{c.name}</p>
            <p className="text-[13px] text-mist">{c.segment}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[12.5px] text-mist">
              <span>{c.plan}</span>
              <Avatar initials={c.owner} tone={avatarTone[c.owner]} size="h-6 w-6 text-[10px]" />
            </div>
          </div>
        ))}
      </div>
    </AppFrame>
  );
}

// Tela "Parceiros" (central de integrações), nova na main do app
export function PartnersScreen() {
  const tabs = [
    ['Visão geral', Activity],
    ['API keys', KeyRound],
    ['Webhooks', Webhook],
    ['Conexões', Zap],
    ['Documentação', Braces],
  ];
  const cards = [
    [KeyRound, 'API própria', 'Para sistemas externos consultarem e criarem dados no ApiceFlow.', 'Criar API key'],
    [Webhook, 'Webhooks', 'Receba eventos automaticamente em seu CRM, ERP ou automação.', 'Configurar webhook'],
    [PlugZap, 'Conexão direta', 'Envie dados em tempo real para uma URL de integração própria.', 'Conectar sistema'],
  ];
  const m = useMobile();
  return (
    <AppFrame
      active="parceiros"
      title="Parceiros"
      subtitle="Conecte APIs, configure webhooks e envie dados diretamente para outros sistemas."
      actions={
        <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 text-[12px] font-medium text-emerald-200">
          <ShieldCheck className="h-4 w-4" /> Integrações por workspace
        </span>
      }
    >
      <div className={m ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-3 gap-4'}>
        {[
          ['2', KeyRound, 'Credenciais ativas'],
          ['3', Webhook, 'Eventos configurados'],
          ['1', Zap, 'Sistemas conectados'],
        ].map(([value, Icon, label]) => (
          <div
            key={label}
            className={`flex rounded-2xl border border-white/[0.08] bg-surface/75 ${m ? 'flex-col gap-1 p-3' : 'items-center gap-4 p-5'}`}
          >
            {!m && (
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint/15 bg-mint/[0.07] text-mint">
                <Icon className="h-5 w-5" />
              </span>
            )}
            <div>
              <p className="text-[24px] font-bold">{value}</p>
              <p className="text-[12px] text-mist">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={`flex gap-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/55 p-1.5 ${m ? 'mt-4' : 'mt-6'}`}>
        {(m ? tabs.slice(0, 3) : tabs).map(([label, Icon], i) => (
          <span
            key={label}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13px] ${
              i === 0 ? 'bg-mint/[0.1] text-mint ring-1 ring-mint/20' : 'text-mist'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </span>
        ))}
      </div>
      <div className={m ? 'mt-4 space-y-3' : 'mt-6 grid grid-cols-3 gap-5'}>
        {(m ? cards.slice(0, 2) : cards).map(([Icon, title, text, action]) => (
          <div key={title} className={`rounded-2xl border border-white/[0.08] bg-surface/75 ${m ? 'p-5' : 'p-6'}`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-mint/15 bg-mint/[0.07] text-mint">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[17px] font-semibold">{title}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-mist">{text}</p>
            <span className="mt-5 inline-flex h-9 items-center rounded-lg border border-white/[0.1] px-3.5 text-[13px] font-medium">
              {action}
            </span>
          </div>
        ))}
      </div>
    </AppFrame>
  );
}
