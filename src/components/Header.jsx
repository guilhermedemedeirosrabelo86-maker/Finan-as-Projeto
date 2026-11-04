import { Plus } from 'lucide-react'

function Header({ titulo, subtitulo, textoBotao, onClickBotao }) {
  return (
    <div className="topo-pagina">
      <div>
        <h1>{titulo}</h1>
        {subtitulo && <p className="topo-subtitulo">{subtitulo}</p>}
      </div>

      {textoBotao && (
        <button className="button-movimentation" onClick={onClickBotao}>
          <Plus size={18} />
          {textoBotao}
        </button>
      )}
    </div>
  )
}

export default Header;
