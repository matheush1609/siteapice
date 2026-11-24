import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ChevronDown,
  Megaphone,
  MessageCircle,
  Phone,
  PlugZap,
  Sparkles,
  Target,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import { ClosingCta, Faq } from '../components/Blocks';
import LightRays from '../components/LightRays';
import { whatsappLink } from '../config';
import { AI_ADDON, adjustPlans, clientOptions, formatPrice, plans, realFeatures } from '../data/plans';

/*
 * Mesma página de planos da main do ApiceFlow: escolha por quantidade de clientes,
 * cobrança mensal ou anual, pacote de IA, Enterprise, formulário e comparação de recursos.
 */

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
        checked ? 'border-mint bg-mint' : 'border-white/[0.15] bg-white/[0.08]'
      }`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-ink shadow transition-transform ${checked ? 'translate-x-6 bg-night' : 'translate-x-1'}`} />
    </button>
  );
}

const faq = [
  { q: 'Como faço para contratar?', a: 'Escolha o plano, preencha seus dados e continue no WhatsApp. A equipe finaliza a contratação por lá.' },
  { q: 'Qual a diferença entre os planos?', a: 'O limite de clientes, o número de usuários e os recursos. Use "Comparar recursos" para ver tudo lado a lado.' },
  { q: 'O que é o pacote de IA?', a: `Um complemento opcional de ${formatPrice(AI_ADDON)} por mês que ativa o assistente operacional.` },
  { q: 'E se a agência tiver mais de 50 clientes?', a: 'Use o plano Enterprise. A equipe configura limites, usuários, integrações e implantação conforme o volume.' },
];

export default function Planos() {
  const [clientLimit, setClientLimit] = useState(10);
  const [annual, setAnnual] = useState(false);
  const [extraAi, setExtraAi] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [checkout, setCheckout] = useState({ name: '', company: '', email: '', phone: '', message: '' });

  const adjustedPlans = useMemo(() => adjustPlans({ annual, extraAi }), [annual, extraAi]);

  const updateField = (field) => (event) => setCheckout((current) => ({ ...current, [field]: event.target.value }));

  const choose = (plan) => {
    setSelectedPlan(plan);
    requestAnimationFrame(() => document.getElementById('contratar')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    const message = [
      'Olá! Quero contratar o ApiceFlow.',
      '',
      `Nome: ${checkout.name}`,
      `Empresa: ${checkout.company}`,
      `E-mail: ${checkout.email}`,
      `Telefone: ${checkout.phone}`,
      `Plano de interesse: ${selectedPlan.name}`,
      `Limite de clientes: até ${selectedPlan.clientLimit}`,
      extraAi ? `Pacote extra de IA: Sim (+R$ ${AI_ADDON}/mês)` : 'Pacote extra de IA: Não',
      annual ? 'Cobrança: Anual' : 'Cobrança: Mensal',
      checkout.message ? `Observações: ${checkout.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.location.href = whatsappLink(message);
  };

  return (
    <>
      <header className="relative -mt-16 overflow-hidden pt-16">
        <div className="absolute inset-x-0 top-0 h-[520px] opacity-60" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent)' }}>
          <LightRays intensity={6} rays={24} reach={10} position={50} speed={6} />
        </div>
        <div className="wrap relative pb-10 pt-20 text-center sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.08] px-3 py-1 text-xs font-bold text-mint">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Planos por quantidade de clientes
          </span>
          <h1 className="display mx-auto mt-5 max-w-3xl text-[2.25rem] leading-[1.05] sm:text-[3.25rem] lg:text-[4rem]">Escolha o plano da sua operação</h1>
          <p className="lead mx-auto mt-5 max-w-2xl">
            Clientes, tarefas, campanhas, marketing, financeiro e inteligência artificial em uma única plataforma.
          </p>
        </div>
      </header>

      <section className="pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-surface/70 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="px-1">
              <p className="text-xs font-medium text-mist">Quantidade de clientes</p>
              <p className="mt-1 text-sm font-semibold">Até {clientLimit} clientes</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.025] p-1" role="group" aria-label="Quantidade de clientes">
                {clientOptions.map((count) => (
                  <button
                    key={count}
                    type="button"
                    aria-pressed={clientLimit === count}
                    onClick={() => {
                      setClientLimit(count);
                      setSelectedPlan(adjustedPlans.find((plan) => plan.clientLimit === count) || plans[0]);
                    }}
                    className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                      clientLimit === count ? 'bg-mint text-night shadow-lg shadow-mint/10' : 'text-mist hover:bg-white/[0.05] hover:text-ink'
                    }`}
                  >
                    Até {count}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2">
                <span className="text-xs text-mist">Mensal</span>
                <Switch checked={annual} onChange={setAnnual} label="Cobrança anual" />
                <span className="text-xs font-bold text-mint">Anual -18%</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {adjustedPlans.map((plan) => {
              const selected = selectedPlan.name === plan.name;
              return (
                <article
                  key={plan.name}
                  className={`relative overflow-hidden rounded-3xl border p-5 transition-colors sm:p-6 ${
                    plan.featured ? 'border-mint/50 bg-mint/[0.055] ring-2 ring-mint/10' : 'border-white/[0.08] bg-surface/75'
                  } ${selected && !plan.featured ? 'border-white/25' : ''}`}
                >
                  {plan.featured && (
                    <span className="absolute right-0 top-0 rounded-bl-xl bg-mint px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-night">
                      Mais escolhido
                    </span>
                  )}
                  <div className="pr-24">
                    <h2 className="font-display text-xl font-bold">{plan.name}</h2>
                    <p className="mt-1 text-xs font-medium text-mint">{plan.subtitle}</p>
                  </div>
                  <div className="mt-5">
                    <p key={plan.finalPrice} className="tab-in font-display text-3xl font-bold tracking-tight">{formatPrice(plan.finalPrice)}</p>
                    <p className="mt-1 text-xs text-mist">por mês · até {plan.clientLimit} clientes</p>
                  </div>
                  <p className="mt-2 text-xs text-mist line-through">{formatPrice(plan.originalPrice)}</p>

                  <button
                    type="button"
                    onClick={() => choose(plan)}
                    className={`${plan.featured ? 'btn-primary' : 'btn-ghost'} mt-5 w-full`}
                  >
                    Escolher {plan.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-5 text-sm">
                    <li className="flex items-center gap-2"><Users className="h-4 w-4 text-mint" aria-hidden="true" />Até {plan.clientLimit} clientes</li>
                    <li className="flex items-center gap-2"><Users className="h-4 w-4 text-mint" aria-hidden="true" />{plan.users} usuário{plan.users > 1 ? 's' : ''}</li>
                    <li className="flex items-center gap-2"><Target className="h-4 w-4 text-mint" aria-hidden="true" />Campanhas e tarefas</li>
                    {plan.clientLimit >= 25 && <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-mint" aria-hidden="true" />Gestão pelo WhatsApp</li>}
                    {plan.clientLimit >= 25 && <li className="flex items-center gap-2"><PlugZap className="h-4 w-4 text-mint" aria-hidden="true" />Integração com CRMs</li>}
                    {plan.clientLimit >= 25 && <li className="flex items-center gap-2"><Megaphone className="h-4 w-4 text-mint" aria-hidden="true" />Marketing</li>}
                    {plan.clientLimit >= 25 && <li className="flex items-center gap-2"><WalletCards className="h-4 w-4 text-mint" aria-hidden="true" />Controle financeiro</li>}
                    {plan.clientLimit === 50 && <li className="flex items-center gap-2"><Bot className="h-4 w-4 text-mint" aria-hidden="true" />IA ApiceFlow</li>}
                  </ul>

                  <div className="mt-5 rounded-2xl border border-mint/15 bg-mint/[0.055] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="flex items-center gap-2 text-sm font-bold"><Bot className="h-4 w-4 text-mint" aria-hidden="true" />Pacote de IA</p>
                        <p className="mt-1 text-xs leading-5 text-mist">
                          {plan.clientLimit === 50 ? 'Ative o assistente operacional por crédito extra.' : 'Disponível como complemento opcional.'}
                        </p>
                      </div>
                      <Switch checked={extraAi} onChange={setExtraAi} label={`Ativar IA no plano ${plan.name}`} />
                    </div>
                    {extraAi && <p className="mt-3 border-t border-mint/15 pt-3 text-xs font-bold text-mint">+R$ {AI_ADDON}/mês</p>}
                  </div>
                </article>
              );
            })}
          </div>

          <article className="mt-5 overflow-hidden rounded-3xl border border-teal/25 bg-gradient-to-r from-surface/90 to-mint/[0.07] p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal/20 bg-teal/[0.08] text-teal">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">Mais de 50 clientes</p>
                  <h2 className="mt-1 font-display text-xl font-bold">Plano Enterprise sob medida</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-mist">
                    Configure limites, usuários, integrações, API própria, webhooks e implantação conforme o volume da sua empresa.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => choose({ name: 'Enterprise', clientLimit: 'acima de 50', key: 'Enterprise' })}
                className="btn-primary shrink-0"
              >
                Solicitar Enterprise
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          <section id="contratar" className="mt-8 scroll-mt-24 rounded-3xl border border-white/[0.08] bg-surface/75 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mint/15 bg-mint/[0.08] text-mint">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-mint">Contratar plano</p>
                <h2 className="mt-1 font-display text-xl font-bold">Preencha seus dados</h2>
                <p className="mt-1 text-sm text-mist" aria-live="polite">
                  Plano selecionado: <strong className="text-ink">{selectedPlan.name}</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="plan-name" className="mb-1.5 block text-sm font-medium">Nome completo</label>
                <input id="plan-name" className="field" autoComplete="name" value={checkout.name} onChange={updateField('name')} placeholder="Seu nome" required />
              </div>
              <div>
                <label htmlFor="plan-company" className="mb-1.5 block text-sm font-medium">Empresa</label>
                <input id="plan-company" className="field" autoComplete="organization" value={checkout.company} onChange={updateField('company')} placeholder="Nome da empresa" required />
              </div>
              <div>
                <label htmlFor="plan-email" className="mb-1.5 block text-sm font-medium">E-mail</label>
                <input id="plan-email" className="field" type="email" autoComplete="email" value={checkout.email} onChange={updateField('email')} placeholder="voce@empresa.com" required />
              </div>
              <div>
                <label htmlFor="plan-phone" className="mb-1.5 block text-sm font-medium">WhatsApp</label>
                <input id="plan-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={checkout.phone} onChange={updateField('phone')} placeholder="(00) 00000-0000" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="plan-message" className="mb-1.5 block text-sm font-medium">Observações</label>
                <textarea
                  id="plan-message"
                  className="field resize-none"
                  rows={3}
                  value={checkout.message}
                  onChange={updateField('message')}
                  placeholder="Conte quantos usuários e integrações sua empresa precisa"
                />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Continuar no WhatsApp
                </button>
              </div>
            </form>
          </section>

          <div className="mt-8 text-center">
            <button
              type="button"
              aria-expanded={showComparison}
              aria-controls="comparar-recursos"
              onClick={() => setShowComparison((value) => !value)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface/70 px-5 py-3 text-sm font-bold text-mint transition-colors hover:border-mint/30"
            >
              {showComparison ? 'Ocultar recursos' : 'Comparar recursos'}
              <ChevronDown className={`h-4 w-4 transition ${showComparison ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </div>

          {showComparison && (
            <section id="comparar-recursos" className="tab-in mt-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/75">
              <div className="relative overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <caption className="sr-only">Recursos incluídos em cada plano</caption>
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th scope="col" className="p-5 text-xs font-bold uppercase tracking-wider text-mist">Funcionalidade</th>
                      {plans.map((plan) => (
                        <th key={plan.name} scope="col" className="p-5 text-sm font-bold">{plan.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {realFeatures.map((feature) => (
                      <tr key={feature.label} className="border-b border-white/[0.06] last:border-0">
                        <th scope="row" className="p-5 font-normal">
                          <p className="text-sm font-medium">{feature.label}</p>
                          <p className="mt-1 text-xs text-mist">{feature.description}</p>
                        </th>
                        {['starter', 'pro', 'premium'].map((key) => (
                          <td key={key} className="p-5">
                            {feature[key] ? (
                              <>
                                <Check className="h-4 w-4 text-mint" aria-hidden="true" />
                                <span className="sr-only">Incluído</span>
                              </>
                            ) : (
                              <>
                                <X className="h-4 w-4 text-red-400" aria-hidden="true" />
                                <span className="sr-only">Não incluído</span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-16 sm:py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
          <h2 className="h2">Dúvidas sobre os planos</h2>
          <Faq items={faq} />
        </div>
      </section>

      <ClosingCta title="Ainda em dúvida sobre o plano?" text="Conte como é a sua agência e o que vocês querem organizar. A equipe indica o plano pelo WhatsApp." />
    </>
  );
}
