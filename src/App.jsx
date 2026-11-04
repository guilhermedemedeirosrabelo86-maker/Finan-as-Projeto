import { useState } from 'react'
import Transacoes from './pages/Transacoes.jsx'
import { House, ArrowDownUp, ChartPie, Settings, Tags, TagsIcon, TagPlusIcon, TagPlus } from 'lucide-react'
import Sidebar from './components/Sidebar.jsx'
import Inicio from './pages/Inicio.jsx'
import './App.css'

const ITENS_MENU = [
  { nome: 'Início', icone: House },
  { nome: 'Transações', icone: ArrowDownUp },
  { nome: 'Relatórios', icone: ChartPie },
  { nome: 'Categorias', icone: TagsIcon},
  { nome: 'Configurações', icone: Settings }
]

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState(ITENS_MENU[0].nome)

  return (
    <div className="layout">
      <Sidebar
        itens={ITENS_MENU}
        ativo={paginaAtiva}
        onSelecionar={setPaginaAtiva}
      />
      <main className="conteudo">
        {paginaAtiva === 'Início' && <Inicio />}
        {paginaAtiva === 'Transações' && <Transacoes />}
      </main>
    </div>
  )
}

export default App
