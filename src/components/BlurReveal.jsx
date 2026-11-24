import { createElement } from 'react';

/*
 * Adaptado do Blur Reveal do Spell UI (spell.sh/docs/blur-reveal), em CSS puro.
 * Cada letra entra desfocada; leitores de tela recebem o texto inteiro.
 */
export default function BlurReveal({ children, as = 'h1', className = '', delay = 0, stagger = 0.018 }) {
  let index = 0;
  const lines = children.split('\n');

  return createElement(
    as,
    { className },
    <>
      <span className="sr-only">{children.replace(/\n/g, ' ')}</span>
      {lines.map((line, l) => {
        const words = line.split(' ');
        return (
          <span key={l} aria-hidden="true" className="block">
            {words.map((word, w) => (
              <span key={w} className="inline-block whitespace-nowrap">
                {word.split('').map((char, c) => {
                  const style = { animationDelay: `${delay + index++ * stagger}s` };
                  return (
                    <span key={c} className="blur-char" style={style}>
                      {char}
                    </span>
                  );
                })}
                {w < words.length - 1 && <span className="blur-char">&nbsp;</span>}
              </span>
            ))}
          </span>
        );
      })}
    </>,
  );
}
