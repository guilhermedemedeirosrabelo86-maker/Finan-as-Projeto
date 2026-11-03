import { Landmark } from 'lucide-react'
import NomeBanco from "./NomeBanco"

function Sidebar({ itens, ativo, onSelecionar }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-titulo">
        <span className="sidebar-logo">
          <Landmark size={18} />
        </span>
        <NomeBanco />
      </div>
      <nav>
        <ul>
          {itens.map((item) => {
            const Icone = item.icone
            return (
              <li key={item.nome}>
                <button
                  className={item.nome === ativo ? 'ativo' : ''}
                  onClick={() => onSelecionar(item.nome)}
                >
                  <Icone size={18} />
                  {item.nome}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
