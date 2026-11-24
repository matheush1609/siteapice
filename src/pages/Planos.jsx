import { useState } from 'react';
import { Check, Minus, MessageCircle } from 'lucide-react';
import { ClosingCta, Faq, PageHeader } from '../components/Blocks';
import { whatsappLink } from '../config';
import { OVER_LIMIT, RANGES, brl, comparison, plans, quote, rangeLabel } from '../data/plans';

function RangePicker({ value, onChange }) {
  return (
    <fieldset>
      <legend className="text-[15px] font-medium text-ink">Quantos clientes a agência atende?</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {[...RANGES, OVER_LIMIT].map((option) => (
          <label
            key={option}
            className="cursor-pointer rounded-full border border-white/[0.12] px-3.5 py-2 text-[15px] text-mist transition-colors hover:border-white/30 hover:text-ink has-[:checked]:border-mint has-[:checked]:bg-mint has-[:checked]:font-medium has-[:checked]:text-night has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-mint"
          >
            <input type="radio" name="faixa" value={option} checked={value === option} onChange={() => onChange(option)} className="sr-only" />
            {rangeLabel(option)}
            <span className="sr-only"> clientes</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function message(plan, range) {
  const clients = range === OVER_LIMIT ? `mais de ${RANGES[RANGES.length - 1]} clientes` : `até ${range} clientes`;
  const q = plan.id === 'enterprise' ? null : quote(plan.id, range);
  return `Olá! Tenho interesse no plano ${plan.name} do ApiceFlow para ${clients}${q ? `, ${brl(q.monthly)} por mês` : ''}.`;
}

function Price({ plan, range }) {
  const q = plan.id === 'enterprise' ? null : quote(plan.id, range);
  if (!q) {
    return (
      <div className="mt-8">
        <p className="display text-[2.5rem] leading-none">Sob consulta</p>
        <p className="mt-3 text-sm text-mist">
          {plan.id === 'enterprise' ? 'Valor definido conforme a operação.' : `Acima de ${RANGES[RANGES.length - 1]} clientes, a equipe monta uma proposta.`}
        </p>
      </div>
    );
  }
  return (
    <div className="mt-8" aria-live="polite">
      <p className="flex items-baseline gap-2">
        <span className="display text-[3.25rem] leading-none">{brl(q.monthly)}</span>
        <span className="text-mist">por mês</span>
      </p>
      <p className="mt-3 text-sm text-mist">{q.perClient} por cliente, até {range} clientes</p>
    </div>
  );
}

const faq = [
  { q: 'O que conta como cliente?', a: 'Cada empresa ou marca que a agência atende e cadastra no ApiceFlow.' },
  { q: 'E se a agência ganhar clientes no meio do mês?', a: 'Fale com a equipe no WhatsApp para mudar de faixa.' },
  { q: 'Como faço para contratar?', a: 'Pelo WhatsApp, com a nossa equipe. Use os botões desta página ou o formulário de contato.' },
  { q: 'Posso trocar de plano depois?', a: 'Pode. Se a agência precisar de outros recursos, a equipe faz a mudança de plano.' },
];

export default function Planos() {
  const [range, setRange] = useState(10);

  return (
    <>
      <PageHeader title="Planos pelo tamanho da sua carteira">
        O valor depende de quantos clientes a agência atende. Quanto mais clientes, menor o preço por cliente.
      </PageHeader>

      <section className="pb-20">
        <div className="wrap">
          <RangePicker value={range} onChange={setRange} />

          <div className="mt-10 grid overflow-hidden rounded-[14px] border border-white/[0.09] lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`relative flex flex-col p-7 sm:p-9 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-white/[0.09] lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-t-0 ${
                  plan.highlighted ? 'bg-white/[0.035]' : ''
                }`}
              >
                {plan.highlighted && <span className="absolute inset-x-0 top-0 h-px bg-mint" aria-hidden="true" />}
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="h3 text-[1.625rem]">{plan.name}</h2>
                  {plan.highlighted && <span className="rounded-full border border-mint/40 px-2.5 py-0.5 text-xs text-mint">Recomendado</span>}
                </div>
                <p className="mt-2 text-mist lg:min-h-[3rem]">{plan.description}</p>
                <Price plan={plan} range={range} />
                <ul className="mt-9 space-y-3" aria-label={`O que o plano ${plan.name} inclui`}>
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 space-y-2 border-t border-white/[0.07] pt-6" aria-label={`Observações do plano ${plan.name}`}>
                  {plan.notes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-mist">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="min-h-9 flex-1" aria-hidden="true" />
                <a
                  href={whatsappLink(message(plan, range))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${plan.highlighted ? 'btn-primary' : 'btn-ghost'} w-full`}
                >
                  <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
                  {plan.id === 'enterprise' ? 'Pedir proposta' : `Quero o ${plan.name}`}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-mist">Valores mensais. A contratação é feita com a nossa equipe pelo WhatsApp.</p>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 lg:py-28">
        <div className="wrap">
          <h2 className="h2">Comparar planos</h2>
          <div className="relative mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <caption className="sr-only">Recursos incluídos em cada plano</caption>
              <thead>
                <tr className="border-b border-white/[0.12]">
                  <th scope="col" className="w-2/5 py-4 font-normal text-mist">Recurso</th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className="py-4 font-medium">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, ...values]) => (
                  <tr key={label} className="border-b border-white/[0.07]">
                    <th scope="row" className="py-4 pr-6 font-normal">{label}</th>
                    {values.map((v, i) => (
                      <td key={i} className="py-4">
                        {v === true ? (
                          <>
                            <Check className="h-4 w-4 text-mint" aria-hidden="true" />
                            <span className="sr-only">Incluído</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Minus className="h-4 w-4 text-mist/60" aria-hidden="true" />
                            <span className="sr-only">Não incluído</span>
                          </>
                        ) : (
                          <span className="text-mist">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
          <h2 className="h2">Dúvidas sobre os planos</h2>
          <Faq items={faq} />
        </div>
      </section>

      <ClosingCta title="Ainda em dúvida sobre o plano?" text="Conte quantos clientes a agência atende e o que vocês querem organizar. A equipe indica o plano pelo WhatsApp." />
    </>
  );
}
