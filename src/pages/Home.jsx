import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import LightRays from '../components/LightRays';
import BlurReveal from '../components/BlurReveal';
import { ClosingCta } from '../components/Blocks';
import { Scaled } from '../screens/AppFrame';
import {
  ClientsScreen,
  DashboardScreen,
  FinanceScreen,
  MarketingScreen,
  ReportsScreen,
  TasksScreen,
} from '../screens/Screens';
import { Bubble, FileReply, Phone, TaskReply } from '../screens/Chat';
import { DEFAULT_WHATSAPP_TEXT, whatsappLink } from '../config';
import { STARTING_PRICE, brl } from '../data/plans';

function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16">
      <div className="absolute inset-x-0 top-0 h-[880px]" style={{ maskImage: 'linear-gradient(to bottom, black 40%, transparent)' }}>
        <LightRays intensity={10} rays={30} reach={14} position={50} />
      </div>

      <div className="wrap relative pt-20 text-center sm:pt-28">
        <BlurReveal className="display mx-auto max-w-4xl text-[2.25rem] leading-[1.04] min-[400px]:text-[2.6rem] sm:text-[4.5rem] lg:text-[5.25rem]">
          {'Sua agência inteira\nem um só painel.'}
        </BlurReveal>
        <p className="rise lead mx-auto mt-7 max-w-2xl" style={{ animationDelay: '0.5s' }}>
          O ApiceFlow é o sistema de gestão para agências de marketing: clientes, campanhas de Meta Ads e Google Ads,
          tarefas, arquivos e financeiro. E um assistente de IA que registra tudo isso a partir de uma mensagem.
        </p>
        <div className="rise mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.65s' }}>
          <a href={whatsappLink(DEFAULT_WHATSAPP_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-primary px-6">
            <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
            Falar no WhatsApp
          </a>
          <Link to="/recursos" className="btn-ghost px-6">
            Conhecer os recursos
          </Link>
        </div>
      </div>

      <figure className="wrap relative mt-16 sm:mt-20">
        <div className="rise relative lg:pr-20 xl:pr-28" style={{ animationDelay: '0.8s' }}>
          <div className="screen">
            <Scaled width={1180}>
              <TasksScreen newTask newTaskDelay={3.4} />
            </Scaled>
          </div>
          <div className="relative z-10 mx-auto -mt-10 w-full max-w-[340px] sm:-mt-24 lg:absolute lg:-bottom-12 lg:right-0 lg:mt-0 lg:w-[300px] xl:w-[330px]">
            <Phone>
              <Bubble from="me" time="14:02" delay={1.6}>
                Cria uma tarefa pra Ana: revisar os criativos da campanha de Natal da Loja Aurora, prioridade alta, até sexta
              </Bubble>
              <Bubble from="bot" time="14:02" delay={2.8}>
                <TaskReply />
              </Bubble>
            </Phone>
          </div>
        </div>
        <figcaption className="mt-8 text-center text-sm text-mist lg:mt-16">
          Uma mensagem no WhatsApp vira tarefa no quadro da equipe. Dados de exemplo.
        </figcaption>
      </figure>
    </section>
  );
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', text: 'Clientes ativos, pendentes e arquivos recebidos assim que você entra.', Screen: DashboardScreen },
  { id: 'clientes', label: 'Clientes', text: 'Um perfil por cliente, com campanhas, tarefas, arquivos e responsável.', Screen: ClientsScreen },
  { id: 'campanhas', label: 'Campanhas', text: 'Meta Ads e Google Ads lado a lado, com investimento e conversões rastreadas.', Screen: MarketingScreen },
  { id: 'tarefas', label: 'Tarefas', text: 'Quadro da equipe com prioridade, prazo e responsável em cada card.', Screen: TasksScreen },
  { id: 'financeiro', label: 'Financeiro', text: 'Gastos da agência, contas pendentes e pagas, separados por categoria.', Screen: FinanceScreen },
  { id: 'relatorios', label: 'Relatórios', text: 'Orçamento, gasto, conversões e ROI de cada cliente no mês.', Screen: ReportsScreen },
];

function Tour() {
  const [active, setActive] = useState('campanhas');
  const current = tabs.find((t) => t.id === active);

  const onKey = (event) => {
    const i = tabs.findIndex((t) => t.id === active);
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!next) return;
    event.preventDefault();
    const t = tabs[(i + next + tabs.length) % tabs.length];
    setActive(t.id);
    document.getElementById(`tab-${t.id}`)?.focus();
  };

  return (
    <section className="border-t border-white/[0.07] py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="h2 max-w-2xl">A rotina da agência num lugar só</h2>
          <Link to="/recursos" className="link shrink-0 text-[15px]">Ver todos os recursos</Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
          <div role="tablist" aria-label="Telas do ApiceFlow" aria-orientation="vertical" onKeyDown={onKey} className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {tabs.map((t) => {
              const on = t.id === active;
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="tour-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  className={`shrink-0 rounded-lg border-l-2 px-4 py-3 text-left transition-colors lg:py-4 ${
                    on ? 'border-mint bg-white/[0.04]' : 'border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <span className={`block text-[16px] font-medium ${on ? 'text-ink' : 'text-mist'}`}>{t.label}</span>
                  <span className={`mt-1 hidden text-[14px] leading-snug text-mist lg:block ${on ? '' : 'lg:hidden'}`}>{t.text}</span>
                </button>
              );
            })}
          </div>

          <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
            <p key={`t-${active}`} className="tab-in mb-5 text-[15px] text-mist lg:hidden">{current.text}</p>
            <div key={active} className="screen tab-in">
              <Scaled width={1180}>
                <current.Screen />
              </Scaled>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const asks = [
  ['Cadastra o cliente Padaria Trigo Bom, contato Marcos', 'Cria o cliente com o contato.'],
  ['Abre uma campanha de Google Ads para a Clínica Vida Plena', 'Cria a campanha no perfil do cliente.'],
  ['Quais tarefas estão com o Diego?', 'Lista as tarefas e os prazos.'],
  ['Me manda o briefing da Aurora', 'Procura na pasta do cliente no Drive.'],
];

function Assistant() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-deep py-24 lg:py-32">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-24">
        <div>
          <h2 className="h2 max-w-xl">Sua equipe pede por mensagem. O assistente faz no sistema.</h2>
          <p className="lead mt-5 max-w-xl">
            O assistente usa o Gemini, a IA do Google, para entender o que foi escrito e registrar no ApiceFlow. Funciona no
            WhatsApp e no chat dentro do painel.
          </p>
          <dl className="mt-10 max-w-xl border-t border-white/[0.08]">
            {asks.map(([ask, result]) => (
              <div key={ask} className="grid gap-1 border-b border-white/[0.08] py-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink">“{ask}”</dt>
                <dd className="text-mist">{result}</dd>
              </div>
            ))}
          </dl>
          <Link to="/assistente" className="link mt-8 inline-block text-[15px]">Como o assistente funciona</Link>
        </div>
        <figure className="m-0">
          <Phone>
            <Bubble from="me" time="09:41">Me manda o briefing da Aurora</Bubble>
            <Bubble from="bot" time="09:41">
              <FileReply />
            </Bubble>
            <Bubble from="me" time="09:42">Valeu. Quais tarefas da Aurora vencem essa semana?</Bubble>
            <Bubble from="bot" time="09:42">
              Duas tarefas:
              <span className="mt-1.5 block text-[13px] text-mist">
                Campanha de Natal no Meta Ads, Diego, 25/11
                <br />
                Revisar criativos da campanha de Natal, Ana, 27/11
              </span>
            </Bubble>
          </Phone>
          <figcaption className="mt-4 text-center text-sm text-mist">Conversa de exemplo.</figcaption>
        </figure>
      </div>
    </section>
  );
}

const integrations = [
  ['Meta Ads', 'Campanhas e conversões do Facebook e do Instagram'],
  ['Google Ads', 'Pesquisa, display e YouTube, com rastreamento de conversões'],
  ['Google Drive', 'Uma pasta por cliente, ligada ao perfil dele'],
  ['Gemini', 'A IA por trás do assistente'],
];

function Integrations() {
  return (
    <section className="border-t border-white/[0.07] py-20">
      <div className="wrap">
        <h2 className="text-[15px] font-medium text-mist">Conectado com as ferramentas que a agência já usa</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map(([name, text]) => (
            <li key={name}>
              <p className="display text-[1.75rem] text-ink">{name}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="border-t border-white/[0.07] py-24">
      <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <h2 className="h2">Você paga pelo número de clientes que atende</h2>
          <p className="lead mt-5 max-w-xl">
            Escolha a faixa da agência e o plano. Quanto mais clientes, menor o valor por cliente.
          </p>
        </div>
        <div className="lg:text-right">
          <p className="text-[15px] text-mist">Planos a partir de</p>
          <p className="display mt-1 text-[4rem] leading-none sm:text-[5rem]">
            {brl(STARTING_PRICE)}
            <span className="ml-2 align-baseline text-xl tracking-normal text-mist">por mês</span>
          </p>
          <Link to="/planos" className="btn-ghost mt-8">Calcular o valor da minha agência</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Tour />
      <Assistant />
      <Integrations />
      <PricingTeaser />
      <ClosingCta />
    </>
  );
}
