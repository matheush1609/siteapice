import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Nav, { Logo, pages } from './Nav';
import { DEFAULT_WHATSAPP_TEXT, VYLOS_URL, whatsappLink } from '../config';
import vylosLogo from '../assets/vylos-logo.webp';
import vylosText from '../assets/vylos-text.webp';

const meta = {
  '/': ['ApiceFlow | Gestão para agências de marketing', 'Clientes, campanhas de Meta Ads e Google Ads, tarefas, arquivos e financeiro da agência em um só painel, com um assistente de IA no WhatsApp.'],
  '/recursos': ['Recursos | ApiceFlow', 'Clientes, campanhas, tarefas, arquivos no Google Drive, financeiro e relatórios: veja cada área do ApiceFlow.'],
  '/assistente': ['Assistente no WhatsApp | ApiceFlow', 'Peça por mensagem e o assistente do ApiceFlow cria clientes, tarefas e campanhas e encontra arquivos dos clientes.'],
  '/planos': ['Planos | ApiceFlow', 'Planos do ApiceFlow cobrados pelo número de clientes da agência. Escolha a faixa e veja o valor mensal.'],
  '/contato': ['Contato | ApiceFlow', 'Fale com a equipe do ApiceFlow pelo WhatsApp e peça uma demonstração.'],
};

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const [title, description] = meta[pathname] ?? ['Página não encontrada | ApiceFlow', meta['/'][1]];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

// Assinatura de quem desenvolveu o site, no estilo marca d'água: discreta, acende no hover.
function VylosSignature() {
  return (
    <a
      href={VYLOS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Desenvolvido pela Vylos: software, agentes de IA e automação"
      className="group flex flex-col items-start gap-2 rounded-lg opacity-75 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 sm:flex-row sm:items-center sm:gap-3"
    >
      <span className="whitespace-nowrap text-xs text-mist">Desenvolvido por</span>
      <span className="flex items-center gap-3">
        <img src={vylosLogo} alt="" width="34" height="26" className="h-[26px] w-auto" />
        <span className="flex flex-col leading-none">
          <img src={vylosText} alt="" width="54" height="21" className="h-[21px] w-auto self-start" />
          <span className="mt-1 whitespace-nowrap text-[11px] text-mist">Software • Agentes de IA • Automação</span>
        </span>
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-mist">
            Clientes, campanhas, tarefas e financeiro da agência em um painel, com um assistente que atende pelo WhatsApp.
          </p>
        </div>
        <nav aria-label="Páginas">
          <p className="text-sm font-medium text-ink">Páginas</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li><Link to="/" className="text-mist hover:text-ink">Início</Link></li>
            {pages.map((page) => (
              <li key={page.to}><Link to={page.to} className="text-mist hover:text-ink">{page.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-medium text-ink">Atendimento</p>
          <p className="mt-4 text-[15px] leading-relaxed text-mist">A contratação e o suporte são feitos com a nossa equipe pelo WhatsApp.</p>
          <a href={whatsappLink(DEFAULT_WHATSAPP_TEXT)} target="_blank" rel="noopener noreferrer" className="link mt-4 inline-block text-[15px]">
            Abrir conversa
          </a>
        </div>
      </div>
      <div className="wrap flex flex-col gap-6 border-t border-white/[0.06] pb-28 pt-7 sm:flex-row sm:items-center sm:justify-between sm:pb-7 sm:pr-24 2xl:pr-8">
        <p className="text-sm text-mist">© {new Date().getFullYear()} ApiceFlow</p>
        <VylosSignature />
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(DEFAULT_WHATSAPP_TEXT)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a equipe no WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] bg-surface text-mint shadow-[0_12px_40px_-8px_rgba(0,0,0,0.8)] transition-colors hover:border-mint/50"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-lg bg-mint px-4 py-2 font-medium text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <RouteEffects />
      <Nav />
      <main id="conteudo">
        {/* A chave pela rota remonta o conteúdo e dispara a animação de entrada a cada troca de página */}
        <div key={pathname} className="page-in">
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
