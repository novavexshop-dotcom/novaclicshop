export default function PrivacidadPage() {
  return (
    <div className="app-main container" style={{ maxWidth: 780, padding: '2rem 1rem', lineHeight: 1.7 }}>
      <h1>Política de Privacidad</h1>
      <p><strong>Última actualización:</strong> Abril 2026</p>

      <h3>Datos que recopilamos</h3>
      <p>Nombre, celular, dirección y número de operación Yape cuando realizas un pedido. Estos datos se usan exclusivamente para procesar, confirmar y entregar tu compra.</p>

      <h3>Uso de la información</h3>
      <ul>
        <li>Confirmar pedidos por WhatsApp</li>
        <li>Entregar productos</li>
        <li>Responder consultas de soporte</li>
      </ul>

      <h3>Protección</h3>
      <p>No vendemos, alquilamos ni compartimos tus datos con terceros. La información se guarda de forma segura y solo el personal autorizado accede a ella.</p>

      <h3>Tus derechos</h3>
      <p>Puedes solicitar eliminar o corregir tus datos contactándonos al 984 048 211 o rolando20vilca@gmail.com.</p>

      <p style={{ marginTop: '1.5rem', fontSize: 13, color: 'var(--text-secondary)' }}>Al usar el sitio y realizar pedidos aceptas esta política.</p>
    </div>
  );
}
