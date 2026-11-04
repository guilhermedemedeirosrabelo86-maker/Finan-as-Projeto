import { ArrowLeft, ArrowRight, Search } from "lucide-react";

function Nav(){
    return (
        <nav className="filtros">
            <div className="filtro-mes">
                <button type="calendar" aria-label="Mês anterior"><ArrowLeft size={16} /></button>
                <span>Novembro 2026</span>
                <button type="calendar" aria-label="Próximo mês"><ArrowRight size={16} /></button>
            </div>

            <div className="filtro-tipo">
                <button type="button" className="ativo">Todas</button>
                <button type="button">Despesas</button>
                <button type="button">Receitas</button>
            </div>

            <select className="filtro-select">
                <option>Todas as categorias</option>
            </select>

            <label className="filtro-busca">
                <Search size={16} />
                <input type="text" placeholder="Buscar descrição" />
            </label>
        </nav>
    )
}

export default Nav;
