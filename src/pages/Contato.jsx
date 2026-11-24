import { Link } from 'react-router-dom';
import { ContactForm, Faq } from '../components/Blocks';
import LightRays from '../components/LightRays';
import { DEFAULT_WHATSAPP_TEXT, SALES_WHATSAPP_NUMBER, whatsappLink } from '../config';

function formatPhone(digits) {
  const m = digits.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : digits;
}

const faq = [
  {
    q: 'Preciso instalar alguma coisa?',
    a: 'Não. O painel funciona no navegador e o assistente responde no próprio WhatsApp.',
  },
  {
    q: 'Quais contas de anúncio posso conectar?',
    a: 'Meta Ads (Facebook e Instagram) e Google Ads.',
  },
  {
    q: 'A equipe toda pode usar?',
    a: 'Sim. Cada pessoa da agência tem o próprio acesso.',
  },
];

export default function Contato() {
  return (
    <>
      <section className="relative -mt-16 overflow-hidden pt-16">
        <div
          className="absolute inset-x-0 top-0 h-[520px] opacity-60"
          style={{
            maskImage: 'linear-gradient(to bottom, black 30%, transparent)',
          }}
        >
          <LightRays intensity={6} rays={24} reach={10} position={18} speed={6} />
        </div>
        <div className="wrap relative grid gap-14 pb-24 pt-20 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_32rem] lg:gap-20">
          <div>
            <h1 className="display text-[2.25rem] leading-[1.05] sm:text-[3.25rem] lg:text-[4rem]">Fale com a equipe</h1>
            <p className="lead mt-6 max-w-lg">
              Preencha e continue no WhatsApp. A mensagem já chega pronta, e a equipe responde com uma demonstração e o plano certo para a
              agência.
            </p>
            <dl className="mt-12 space-y-6 border-t border-white/[0.08] pt-8">
              <div>
                <dt className="text-sm text-mist">WhatsApp da equipe</dt>
                <dd className="mt-1">
                  <a href={whatsappLink(DEFAULT_WHATSAPP_TEXT)} target="_blank" rel="noopener noreferrer" className="link text-xl">
                    {formatPhone(SALES_WHATSAPP_NUMBER)}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mist">Antes de conversar</dt>
                <dd className="mt-1 text-[15px]">
                  Veja os{' '}
                  <Link to="/recursos" className="link">
                    recursos
                  </Link>{' '}
                  e os{' '}
                  <Link to="/planos" className="link">
                    planos
                  </Link>
                  .
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
          <h2 className="h2">Perguntas frequentes</h2>
          <Faq items={faq} />
        </div>
      </section>
    </>
  );
}
