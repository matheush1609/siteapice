import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="wrap py-32">
      <h1 className="display text-[2.75rem] leading-tight sm:text-[4rem]">Esta página não existe</h1>
      <p className="lead mt-5 max-w-lg">O endereço pode ter mudado. Volte para o início ou veja os planos.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn-primary">Ir para o início</Link>
        <Link to="/planos" className="btn-ghost">Ver planos</Link>
      </div>
    </section>
  );
}
