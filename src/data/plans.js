/*
 * Cobrança por número de clientes da agência, em faixas.
 * VALORES A CONFIRMAR: a faixa "até 5" usa os preços atuais do app (R$ 150 e R$ 300);
 * as demais são uma proposta com desconto progressivo. Edite só esta tabela.
 */
export const RANGES = [5, 10, 15, 20, 30, 50];
export const OVER_LIMIT = 'mais';

export const PRICES = {
  basico: { 5: 150, 10: 270, 15: 375, 20: 465, 30: 630, 50: 900 },
  profissional: { 5: 300, 10: 540, 15: 750, 20: 930, 30: 1260, 50: 1800 },
};

export const plans = [
  {
    id: 'basico',
    name: 'Básico',
    description: 'Para começar a organizar a operação da agência.',
    includes: ['Gestão de clientes e tarefas', 'Painel com a visão geral da operação', 'Relatórios essenciais'],
    notes: ['Recursos avançados de campanhas não incluídos', 'Suporte em horário comercial'],
  },
  {
    id: 'profissional',
    name: 'Profissional',
    description: 'Para equipes que precisam de mais controle sobre as campanhas.',
    highlighted: true,
    includes: ['Tudo do plano Básico', 'Integração com Meta Ads', 'Análises e relatórios avançados', 'Suporte prioritário'],
    notes: ['Limites de uso dependem do volume contratado'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para operações maiores ou com necessidades específicas.',
    includes: ['Tudo do plano Profissional', 'Mais usuários e maior volume', 'Configuração personalizada', 'Atendimento dedicado'],
    notes: ['Proposta montada depois de uma conversa com a equipe'],
  },
];

// Comparação por recurso, com o que consta nos planos do app (true = incluído)
export const comparison = [
  ['Gestão de clientes e tarefas', true, true, true],
  ['Painel com a visão geral da operação', true, true, true],
  ['Relatórios essenciais', true, true, true],
  ['Integração com Meta Ads', false, true, true],
  ['Análises e relatórios avançados', false, true, true],
  ['Mais usuários e maior volume', false, false, true],
  ['Configuração personalizada', false, false, true],
  ['Suporte', 'Horário comercial', 'Prioritário', 'Dedicado'],
];

export const brl = (value, decimals = 0) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export function rangeLabel(range) {
  return range === OVER_LIMIT ? `Mais de ${RANGES[RANGES.length - 1]}` : `Até ${range}`;
}

export function quote(planId, range) {
  const monthly = PRICES[planId]?.[range];
  if (!monthly) return null;
  const perClient = monthly / range;
  return { monthly, perClient: brl(perClient, Number.isInteger(perClient) ? 0 : 2) };
}

export const STARTING_PRICE = PRICES.basico[RANGES[0]];
