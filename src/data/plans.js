/*
 * Planos do ApiceFlow: cópia fiel da aba de planos da main do app
 * (apiceflow/front-end/src/pages/Plans.jsx), com os mesmos nomes de campos e o mesmo cálculo.
 * Quando o site e o app forem conectados, estes dados passam a vir de lá.
 */
export const clientOptions = [10, 25, 50];

export const plans = [
  {
    key: 'Starter',
    name: 'Starter',
    subtitle: 'Ideal para começar',
    price: 52.45,
    originalPrice: 62.54,
    clientLimit: 10,
    users: 1,
    ai: 'Opcional',
    featured: false,
  },
  {
    key: 'Profissional',
    name: 'Pro',
    subtitle: 'Operação em crescimento',
    price: 76.51,
    originalPrice: 91.08,
    clientLimit: 25,
    users: 3,
    ai: 'Opcional',
    featured: true,
  },
  {
    key: 'Premium',
    name: 'Premium',
    subtitle: 'Mais recursos e escala',
    price: 139,
    originalPrice: 167.17,
    clientLimit: 50,
    users: 10,
    ai: 'Opcional',
    featured: false,
  },
];

export const realFeatures = [
  { label: 'Gestão de clientes', description: 'Cadastro, status, contatos e histórico', starter: true, pro: true, premium: true },
  { label: 'Tarefas e responsáveis', description: 'Criação, prioridade e acompanhamento', starter: true, pro: true, premium: true },
  { label: 'Campanhas', description: 'Campanhas vinculadas aos clientes', starter: true, pro: true, premium: true },
  { label: 'Gestão pelo WhatsApp', description: 'Consulta e operação do sistema por conversa', starter: false, pro: true, premium: true },
  { label: 'Integração com CRMs', description: 'Conexão com plataformas externas por API', starter: false, pro: true, premium: true },
  { label: 'Integrações ampliadas de CRM', description: 'Mais parceiros e conexões simultâneas', starter: false, pro: false, premium: true },
  { label: 'Marketing', description: 'Visitantes, leads, conversões e indicadores', starter: false, pro: true, premium: true },
  { label: 'Meta Ads', description: 'Conexão e consulta de campanhas', starter: false, pro: true, premium: true },
  { label: 'Google Ads', description: 'Tracking e configurações de conversão', starter: false, pro: false, premium: true },
  { label: 'Financeiro', description: 'Gastos, vencimentos e categorias', starter: false, pro: true, premium: true },
  { label: 'Arquivos', description: 'Envio e organização de arquivos dos clientes', starter: true, pro: true, premium: true },
  { label: 'Relatórios', description: 'Painéis e relatórios operacionais', starter: false, pro: true, premium: true },
  { label: 'IA ApiceFlow', description: 'Assistente operacional com Gemini', starter: false, pro: false, premium: true },
  { label: 'Parceiros e API', description: 'API keys, webhooks e conexões diretas', starter: false, pro: false, premium: true },
];

export const AI_ADDON = 49;
export const ANNUAL_DISCOUNT = 0.82;

export const formatPrice = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Mesmo cálculo da página do app
export function adjustPlans({ annual = false, extraAi = false } = {}) {
  return plans.map((plan) => {
    const scale = plan.clientLimit === 25 ? 1 : plan.clientLimit === 50 ? 1.7 : 1;
    const aiAddon = extraAi ? AI_ADDON : 0;
    const annualDiscount = annual ? ANNUAL_DISCOUNT : 1;
    return {
      ...plan,
      finalPrice: (plan.price * scale + aiAddon) * annualDiscount,
      originalPrice: (plan.originalPrice * scale + aiAddon) * annualDiscount,
    };
  });
}

export const STARTING_PRICE = formatPrice(adjustPlans()[0].finalPrice);
