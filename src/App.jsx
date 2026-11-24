import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recursos from './pages/Recursos';
import Assistente from './pages/Assistente';
import Planos from './pages/Planos';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recursos" element={<Recursos />} />
        <Route path="assistente" element={<Assistente />} />
        <Route path="planos" element={<Planos />} />
        <Route path="contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
