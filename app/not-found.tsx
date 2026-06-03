import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="app-main container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscas no existe.</p>
      <Link href="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Volver al inicio</Link>
    </div>
  );
}
