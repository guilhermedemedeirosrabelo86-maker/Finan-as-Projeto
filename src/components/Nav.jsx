import { Search } from "lucide-react";
import SeletorMes from "./SeletorMes";

function Nav(){
    return (
        <nav className="filtros">
            <SeletorMes />

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
