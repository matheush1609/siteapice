import { ClosingCta, Faq, PageHeader } from '../components/Blocks';
import { Scaled } from '../screens/AppFrame';
import { FilesScreen } from '../screens/Screens';
import { Bubble, Phone, TaskReply } from '../screens/Chat';

const steps = [
  ['Alguém da equipe escreve', 'No WhatsApp ou no chat dentro do painel, do jeito que escreveria para um colega.'],
  ['O Gemini entende o pedido', 'O assistente identifica o que fazer e os detalhes: cliente, responsável, prazo, prioridade.'],
  ['O ApiceFlow registra e confirma', 'O registro aparece no painel para a equipe, e a resposta mostra exatamente o que foi criado.'],
];

const abilities = [
  { area: 'Clientes', items: ['Cadastrar um cliente novo com os contatos', 'Consultar os dados de um cliente', 'Listar os clientes da agência'] },
  { area: 'Tarefas', items: ['Criar tarefa com responsável, prazo e prioridade', 'Listar as tarefas de alguém ou de um cliente', 'Consultar os detalhes de uma tarefa'] },
  { area: 'Campanhas', items: ['Criar uma campanha no perfil do cliente', 'Listar e consultar campanhas'] },
  { area: 'Arquivos', items: ['Encontrar arquivos na pasta do cliente no Drive', 'Guardar na pasta certa o arquivo que o cliente manda'] },
  { area: 'Equipe', items: ['Cadastrar usuários da agência', 'Listar quem tem acesso'] },
];

const faq = [
  {
    q: 'Preciso instalar algum aplicativo?',
    a: 'Não. A conversa acontece no WhatsApp que a equipe já usa. Dentro do painel, o mesmo assistente atende pelo chat.',
  },
  {
    q: 'O que o assistente cria fica onde?',
    a: 'No ApiceFlow. Clientes, tarefas e campanhas criados por mensagem aparecem no painel na hora, para toda a equipe.',
  },
  {
    q: 'Como o arquivo do cliente vai parar na pasta certa?',
    a: 'O ApiceFlow reconhece o cliente pelo número de WhatsApp cadastrado no perfil dele e salva o arquivo na pasta desse cliente no Google Drive.',
  },
  {
    q: 'Qual IA o assistente usa?',
    a: 'O Gemini, modelo de IA do Google.',
  },
  {
    q: 'Em quais planos o assistente está disponível?',
    a: 'A gestão pelo WhatsApp está nos planos Pro e Premium. A IA ApiceFlow vem no Premium e pode ser adicionada aos outros planos como pacote de IA.',
  },
];

export default function Assistente() {
  return (
    <>
      <PageHeader title="Um assistente que trabalha no WhatsApp da sua equipe">
        Peça por mensagem para criar um cliente, abrir uma tarefa, cadastrar uma campanha ou achar um arquivo. O assistente faz
        no ApiceFlow e responde com o que foi feito.
      </PageHeader>

      <section className="border-t border-white/[0.07] py-16 sm:py-20 lg:py-28">
        <div className="wrap grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-24">
          <div>
            <h2 className="h2">Como funciona</h2>
            <ol className="mt-10 space-y-10">
              {steps.map(([title, text], i) => (
                <li key={title} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="display text-[2.5rem] leading-none text-mint" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="h3">{title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-mist">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="m-0">
            <Phone>
              <Bubble from="me" time="14:02">
                Cria uma tarefa pra Ana: revisar os criativos da campanha de Natal da Loja Aurora, prioridade alta, até sexta
              </Bubble>
              <Bubble from="bot" time="14:02">
                <TaskReply />
              </Bubble>
            </Phone>
            <figcaption className="mt-4 text-center text-sm text-mist">Conversa de exemplo.</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-deep py-16 sm:py-20 lg:py-28">
        <div className="wrap">
          <h2 className="h2 max-w-2xl">O que dá para pedir</h2>
          <div className="mt-12 border-t border-white/[0.08]">
            {abilities.map(({ area, items }) => (
              <div key={area} className="grid gap-3 border-b border-white/[0.08] py-6 md:grid-cols-[14rem_1fr] md:gap-10">
                <h3 className="h3">{area}</h3>
                <ul className="grid gap-x-10 gap-y-2 text-[16px] text-mist sm:grid-cols-2">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-16 sm:py-20 lg:py-28">
        <div className="wrap">
          <div className="max-w-2xl">
            <h2 className="h2">O cliente manda a foto. Ela já está na pasta dele.</h2>
            <p className="lead mt-5">
              Quando um cliente envia imagem, vídeo ou documento pelo WhatsApp, o ApiceFlow identifica quem mandou e guarda o
              arquivo na pasta desse cliente no Google Drive. Ninguém precisa baixar e subir de novo.
            </p>
          </div>
          <figure className="m-0 mt-12">
            <div className="screen">
              <Scaled width={1320}>
                <FilesScreen />
              </Scaled>
            </div>
            <figcaption className="mt-3 text-sm text-mist">Arquivos da Loja Aurora, com os que chegaram pelo WhatsApp marcados. Dados de exemplo.</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-16 sm:py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
          <h2 className="h2">Perguntas sobre o assistente</h2>
          <Faq items={faq} />
        </div>
      </section>

      <ClosingCta title="Quer ver o assistente respondendo?" text="Chame a equipe no WhatsApp e peça uma demonstração com um exemplo da sua agência." />
    </>
  );
}
