import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Plus } from 'lucide-react';
import { DEFAULT_WHATSAPP_TEXT, whatsappLink } from '../config';
import LightRays from './LightRays';
import { plans } from '../data/plans';

export function PageHeader({ title, children }) {
  return (
    <header className="relative -mt-16 overflow-hidden pt-16">
      <div className="absolute inset-x-0 top-0 h-[520px] opacity-60" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent)' }}>
        <LightRays intensity={6} rays={24} reach={10} position={18} speed={6} />
      </div>
      <div className="wrap relative pb-16 pt-20 sm:pt-28">
        <h1 className="display max-w-4xl text-[2.25rem] leading-[1.05] sm:text-[3.25rem] lg:text-[4.25rem]">{title}</h1>
        {children && <p className="lead mt-6 max-w-2xl">{children}</p>}
      </div>
    </header>
  );
}

export function Faq({ items }) {
  return (
    <div className="border-t border-white/[0.08]">
      {items.map(({ q, a }) => (
        <details key={q} className="faq border-b border-white/[0.08]">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[17px] font-medium text-ink hover:text-mint">
            {q}
            <Plus className="faq-icon h-5 w-5 shrink-0 text-mist transition-transform duration-200" aria-hidden="true" />
          </summary>
          <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-mist">{a}</p>
        </details>
      ))}
    </div>
  );
}

export function ClosingCta({ title = 'Quer ver o ApiceFlow com os clientes da sua agência?', text }) {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07]">
      {/* Mesmo brilho do topo, vindo de baixo: fecha a página como ela abriu */}
      <div className="absolute inset-0 -scale-y-100 opacity-70" style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 85%)' }}>
        <LightRays intensity={8} rays={26} reach={12} position={50} speed={6} />
      </div>
      <div className="wrap relative flex flex-col items-center py-20 text-center sm:py-28 lg:py-36">
        <h2 className="h2 max-w-3xl sm:text-[3.25rem]">{title}</h2>
        <p className="lead mt-5 max-w-2xl">
          {text ?? 'Chame a equipe no WhatsApp. A gente mostra o painel funcionando e indica o plano certo para o tamanho da agência.'}
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a href={whatsappLink(DEFAULT_WHATSAPP_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-primary px-6">
            <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
            Falar no WhatsApp
          </a>
          <Link to="/planos" className="btn-ghost px-6">
            Ver planos
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ContactForm({ compact = false }) {
  const [form, setForm] = useState({ name: '', agency: '', phone: '', plan: 'Ainda não sei', message: '' });
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = [
      'Olá! Quero conhecer o ApiceFlow.',
      '',
      `Nome: ${form.name.trim()}`,
      `Agência: ${form.agency.trim()}`,
      `WhatsApp: ${form.phone.trim()}`,
      `Plano de interesse: ${form.plan}`,
      form.message.trim() ? `Mensagem: ${form.message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.location.href = whatsappLink(text);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 rounded-[14px] border border-white/[0.09] bg-deep ${compact ? 'p-6' : 'p-6 sm:p-8'}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Seu nome</label>
          <input id="c-name" className="field" autoComplete="name" value={form.name} onChange={update('name')} required />
        </div>
        <div>
          <label htmlFor="c-agency" className="mb-1.5 block text-sm font-medium">Agência</label>
          <input id="c-agency" className="field" autoComplete="organization" value={form.agency} onChange={update('agency')} required />
        </div>
      </div>
      <div>
        <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium">WhatsApp</label>
        <input id="c-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="(91) 91234-5678" value={form.phone} onChange={update('phone')} required />
      </div>
      <div>
        <label htmlFor="c-plan" className="mb-1.5 block text-sm font-medium">Plano de interesse</label>
        <select id="c-plan" className="field" value={form.plan} onChange={update('plan')}>
          <option>Ainda não sei</option>
          {plans.map((plan) => (
            <option key={plan.name} value={plan.name}>{plan.name} (até {plan.clientLimit} clientes)</option>
          ))}
          <option value="Enterprise">Enterprise (mais de 50 clientes)</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">
          Mensagem <span className="font-normal text-mist">(opcional)</span>
        </label>
        <textarea
          id="c-message"
          className="field resize-none"
          rows={3}
          placeholder="O que vocês querem organizar primeiro?"
          value={form.message}
          onChange={update('message')}
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
        Continuar no WhatsApp
      </button>
      <p className="text-center text-xs leading-5 text-mist">Seus dados vão só na mensagem do WhatsApp. Este site não guarda nada.</p>
    </form>
  );
}
