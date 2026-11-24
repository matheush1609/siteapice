export const SALES_WHATSAPP_NUMBER = (import.meta.env.VITE_SALES_WHATSAPP_NUMBER || '5591984125519').replace(/\D/g, '');

export function whatsappLink(text) {
  const base = `https://wa.me/${SALES_WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const DEFAULT_WHATSAPP_TEXT = 'Olá! Vim pelo site e quero conhecer o ApiceFlow para a minha agência.';

// Link da assinatura "Desenvolvido por Vylos" no rodapé. Troque pelo site da Vylos quando estiver no ar.
export const VYLOS_URL = import.meta.env.VITE_VYLOS_URL || 'https://www.instagram.com/vylos.oficial/';
