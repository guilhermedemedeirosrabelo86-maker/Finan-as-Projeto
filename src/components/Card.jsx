function Card({ titulo, descricao, valor, icone: Icone, tipo }) {
  const valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="card">
      <div className="card-topo">
        <div>
          <h2 className="titulo-card">{titulo}</h2>
          <p className="descricao-card">{descricao}</p>
        </div>
        {Icone && (
          <span className={`card-icone ${tipo || ''}`}>
            <Icone size={18} />
          </span>
        )}
      </div>
      <p className={valor === 0 ? 'valor-card vazio' : 'valor-card'}>{valorFormatado}</p>
    </div>
  );
}

export default Card;
