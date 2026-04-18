import { useEffect } from 'react';
import GraciasHero from '../sections/gracias/GraciasHero.jsx';
import GraciasBooking from '../sections/gracias/GraciasBooking.jsx';

export default function GraciasPage() {
  useEffect(() => {
    document.title = 'Gracias · Insights Software';
  }, []);

  return (
    <main style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <GraciasHero />
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />
      <GraciasBooking />
      <footer
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: '#8a8a8a',
          fontSize: 13,
          letterSpacing: '0.02em',
        }}
      >
        © {new Date().getFullYear()} Insights Software — Creamos tu software a medida
      </footer>
    </main>
  );
}
