import { Plus } from 'lucide-react'
import NomeBanco from "./NomeBanco"

function Header() {
  return (
    <div className="topo-inicio">
      <div>
        <h1>Bem-vindo ao <NomeBanco /></h1>
        <p className="topo-subtitulo">Acompanhe seu dinheiro e faça movimentações.</p>
      </div>

      <button className="button-movimentation">
        <Plus size={18} />
        Nova movimentação
      </button>
    </div>
  )
}

export default Header;
