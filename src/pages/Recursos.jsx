import { Check } from 'lucide-react';
import { ClosingCta, PageHeader } from '../components/Blocks';
import { Scaled } from '../screens/AppFrame';
import { ClientsScreen, FilesScreen, FinanceScreen, MarketingScreen, ReportsScreen, TasksScreen } from '../screens/Screens';

const modules = [
  {
    id: 'clientes',
    title: 'Clientes',
    text: 'Cada cliente da agência tem um perfil. Tudo o que a equipe faz para ele fica ligado ali.',
    points: ['Segmento, contato e responsável na agência', 'Status ativo ou pendente', 'Campanhas, tarefas e arquivos no mesmo perfil'],
    Screen: ClientsScreen,
  },
  {
    id: 'campanhas',
    title: 'Campanhas',
    text: 'Meta Ads e Google Ads no mesmo painel, separados por cliente, com as conversões rastreadas.',
    points: ['Investimento, conversões e custo por conversão', 'Gráfico diário por canal', 'Rastreamento de conversões do Google Ads'],
    Screen: MarketingScreen,
  },
  {
    id: 'tarefas',
    title: 'Tarefas',
    text: 'Um quadro para a equipe inteira, do pedido do cliente à entrega.',
    points: ['Colunas A Fazer, Em Andamento, Em Revisão e Concluído', 'Prioridade baixa, média, alta ou urgente', 'Responsável e prazo em cada tarefa'],
    Screen: TasksScreen,
  },
  {
    id: 'arquivos',
    title: 'Arquivos',
    text: 'A pasta de cada cliente no Google Drive, aberta dentro do perfil dele.',
    points: ['Briefings, criativos e contratos num só lugar', 'Arquivo enviado pelo cliente no WhatsApp cai direto na pasta dele', 'O assistente encontra e envia arquivos por mensagem'],
    Screen: FilesScreen,
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    text: 'Os gastos da agência organizados, com o que já foi pago e o que ainda vence.',
    points: ['Total de gastos e gastos do mês', 'Contas pendentes e pagas', 'Gastos por categoria e próximos pagamentos'],
    Screen: FinanceScreen,
  },
  {
    id: 'relatorios',
    title: 'Relatórios',
    text: 'O resultado do mês por cliente, pronto para a reunião.',
    points: ['Orçamento total e total gasto', 'Conversões e ROI estimado', 'Orçamento e gasto de cada cliente'],
    Screen: ReportsScreen,
  },
];

export default function Recursos() {
  return (
    <>
      <PageHeader title="Tudo o que a agência precisa acompanhar, sem planilha paralela">
        Seis áreas que conversam entre si. O cliente é o centro: campanhas, tarefas, arquivos e números ficam ligados a ele.
      </PageHeader>

      <nav aria-label="Áreas do ApiceFlow" className="sticky top-16 z-20 border-y border-white/[0.07] bg-night/85 backdrop-blur-md">
        <ul className="wrap flex gap-1 overflow-x-auto py-2">
          {modules.map((m) => (
            <li key={m.id}>
              <a href={`#${m.id}`} className="block whitespace-nowrap rounded-md px-3 py-2 text-[15px] text-mist hover:text-ink">
                {m.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {modules.map(({ id, title, text, points, Screen }) => (
        <section key={id} id={id} className="scroll-mt-32 border-b border-white/[0.07] py-20 lg:py-28">
          <div className="wrap grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-14">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <h2 className="h2">{title}</h2>
              <p className="lead mt-4">{text}</p>
              <ul className="mt-8 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="m-0">
              <div className="screen">
                <Scaled width={1180}>
                  <Screen />
                </Scaled>
              </div>
              <figcaption className="mt-3 text-sm text-mist">Tela de {title.toLowerCase()} do ApiceFlow, com dados de exemplo.</figcaption>
            </figure>
          </div>
        </section>
      ))}

      <section className="border-b border-white/[0.07] py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-14">
          <h2 className="h2">Equipe e acessos</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="h3">Um acesso por pessoa</h3>
              <p className="mt-2 leading-relaxed text-mist">Cada pessoa da agência entra com o próprio login e vê as tarefas que estão com ela.</p>
            </div>
            <div>
              <h3 className="h3">Administradores</h3>
              <p className="mt-2 leading-relaxed text-mist">Quem administra cadastra os usuários da agência e configura o assistente de IA.</p>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
