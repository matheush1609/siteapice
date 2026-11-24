import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Check,
  CheckSquare,
  FolderOpen,
  Handshake,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
  Users,
  WalletCards,
} from 'lucide-react';
import { ClosingCta, PageHeader } from '../components/Blocks';
import { Scaled } from '../screens/AppFrame';
import {
  ClientsScreen,
  DashboardScreen,
  FilesScreen,
  FinanceScreen,
  MarketingScreen,
  PartnersScreen,
  ReportsScreen,
  TasksScreen,
} from '../screens/Screens';

// Mesma ordem do menu lateral do app (main). Arquivos (dentro do perfil do cliente) e Equipe vêm no fim.
const modules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    text: 'A primeira tela ao entrar: como está a carteira de clientes e o que chegou de novo.',
    points: ['Total de clientes, ativos e pendentes', 'Arquivos recebidos dos clientes', 'Clientes recentes com responsável e status'],
    Screen: DashboardScreen,
  },
  {
    id: 'clientes',
    title: 'Clientes',
    icon: Users,
    text: 'Cada cliente da agência tem um perfil. Tudo o que a equipe faz para ele fica ligado ali.',
    points: ['Segmento, contato e responsável na agência', 'Status ativo ou pendente', 'Campanhas, tarefas e arquivos no mesmo perfil'],
    Screen: ClientsScreen,
  },
  {
    id: 'campanhas',
    title: 'Campanhas',
    icon: LineChart,
    text: 'Meta Ads e Google Ads no mesmo painel, separados por cliente, com as conversões rastreadas.',
    points: ['Investimento, conversões e custo por conversão', 'Gráfico diário por canal', 'Rastreamento de conversões do Google Ads'],
    Screen: MarketingScreen,
  },
  {
    id: 'tarefas',
    title: 'Tarefas',
    icon: CheckSquare,
    text: 'Um quadro para a equipe inteira, do pedido do cliente à entrega.',
    points: ['Colunas A Fazer, Em Andamento, Em Revisão e Concluído', 'Prioridade baixa, média, alta ou urgente', 'Responsável e prazo em cada tarefa'],
    Screen: TasksScreen,
  },
  {
    id: 'relatorios',
    title: 'Relatórios',
    icon: BarChart3,
    text: 'O resultado do mês por cliente, pronto para a reunião.',
    points: ['Orçamento total e total gasto', 'Conversões e ROI estimado', 'Orçamento e gasto de cada cliente'],
    Screen: ReportsScreen,
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    icon: WalletCards,
    text: 'Os gastos da agência organizados, com o que já foi pago e o que ainda vence.',
    points: ['Total de gastos e gastos do mês', 'Contas pendentes e pagas', 'Gastos por categoria e próximos pagamentos'],
    Screen: FinanceScreen,
  },
  {
    id: 'parceiros',
    title: 'Parceiros',
    icon: Handshake,
    text: 'A central de integrações: conecte o ApiceFlow ao CRM, ao ERP ou à automação que a agência já usa.',
    points: ['API própria com API keys para outros sistemas', 'Webhooks que avisam o seu CRM ou ERP a cada evento', 'Conexão direta enviando dados para uma URL sua'],
    Screen: PartnersScreen,
  },
  {
    id: 'arquivos',
    title: 'Arquivos',
    icon: FolderOpen,
    text: 'A pasta de cada cliente no Google Drive, aberta dentro do perfil dele.',
    points: ['Briefings, criativos e contratos num só lugar', 'Arquivo enviado pelo cliente no WhatsApp cai direto na pasta dele', 'O assistente encontra e envia arquivos por mensagem'],
    Screen: FilesScreen,
  },
  {
    id: 'equipe',
    title: 'Equipe e acessos',
    icon: ShieldCheck,
    text: 'Cada pessoa da agência entra com o próprio login. Quem administra controla quem tem acesso.',
    points: ['Um acesso por pessoa, com as tarefas dela', 'Administradores cadastram os usuários da agência', 'Administradores configuram o assistente de IA'],
    Screen: null,
  },
];

export default function Recursos() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const activeId = modules.some((m) => m.id === hash.slice(1)) ? hash.slice(1) : modules[0].id;
  const index = modules.findIndex((m) => m.id === activeId);
  const current = modules[index];

  // A aba fica no endereço (#tarefas), então dá para mandar o link de uma aba específica
  const select = (id, focus = false) => {
    navigate({ hash: id }, { replace: true, state: { tab: true } });
    if (focus) requestAnimationFrame(() => document.getElementById(`tab-${id}`)?.focus());
  };

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      select(modules[event.key === 'Home' ? 0 : modules.length - 1].id, true);
      return;
    }
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(modules[(index + keys[event.key] + modules.length) % modules.length].id, true);
  };

  // Em telas pequenas, ao trocar de aba, traz o conteúdo para a vista
  useEffect(() => {
    if (!hash || window.innerWidth >= 1024) return;
    const top = panelRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.6) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <>
      <PageHeader title="Tudo o que a agência precisa acompanhar, sem planilha paralela">
        Cada área do ApiceFlow em uma aba. O cliente é o centro: campanhas, tarefas, arquivos e números ficam ligados a ele.
      </PageHeader>

      <section className="border-t border-white/[0.07] pb-24 pt-10 lg:pt-14">
        <div className="wrap grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <div
            role="tablist"
            aria-label="Áreas do ApiceFlow"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:sticky lg:top-24 lg:flex lg:flex-col lg:gap-1 lg:self-start"
          >
            {modules.map(({ id, title, icon: Icon }) => {
              const on = id === activeId;
              return (
                <button
                  key={id}
                  id={`tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="recurso-painel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(id)}
                  className={`group flex min-h-12 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-[15px] transition-colors duration-200 lg:w-full lg:gap-3 lg:px-3.5 lg:py-3 ${
                    on
                      ? 'border-mint/40 bg-white/[0.06] text-ink lg:border-white/[0.1]'
                      : 'border-white/[0.08] text-mist hover:bg-white/[0.03] hover:text-ink lg:border-transparent'
                  }`}
                >
                  <Icon className={`h-[18px] w-[18px] shrink-0 transition-colors ${on ? 'text-mint' : 'text-mist/80 group-hover:text-ink'}`} aria-hidden="true" />
                  <span className="leading-tight lg:whitespace-nowrap">{title}</span>
                </button>
              );
            })}
          </div>

          <div ref={panelRef} id="recurso-painel" role="tabpanel" aria-labelledby={`tab-${activeId}`} className="min-w-0 scroll-mt-20">
            <div key={activeId} className="tab-in">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:items-end xl:gap-10">
                <div>
                  <h2 className="h2">{current.title}</h2>
                  <p className="lead mt-4 max-w-xl">{current.text}</p>
                </div>
                <ul className="space-y-2.5">
                  {current.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {current.Screen ? (
                <figure className="m-0 mt-10">
                  <div className="screen">
                    <Scaled width={1320}>
                      <current.Screen />
                    </Scaled>
                  </div>
                  <figcaption className="mt-3 text-sm text-mist">Tela de {current.title.toLowerCase()} do ApiceFlow, com dados de exemplo.</figcaption>
                </figure>
              ) : (
                <div className="mt-10 grid gap-px overflow-hidden rounded-[14px] border border-white/[0.09] bg-white/[0.06] sm:grid-cols-2">
                  {[
                    ['Usuário', 'Entra com o próprio login, vê os clientes e as tarefas que estão com ele e usa o assistente.'],
                    ['Administrador', 'Tudo o que o usuário faz, e também cadastra pessoas, define quem é administrador e configura o assistente de IA.'],
                  ].map(([role, desc]) => (
                    <div key={role} className="bg-night p-7">
                      <h3 className="h3">{role}</h3>
                      <p className="mt-2 leading-relaxed text-mist">{desc}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-white/[0.07] pt-6 text-[15px]">
                {index > 0 ? (
                  <button type="button" onClick={() => select(modules[index - 1].id)} className="text-mist hover:text-ink">
                    Anterior: {modules[index - 1].title}
                  </button>
                ) : (
                  <span />
                )}
                {index < modules.length - 1 && (
                  <button type="button" onClick={() => select(modules[index + 1].id)} className="link">
                    Próxima: {modules[index + 1].title}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
