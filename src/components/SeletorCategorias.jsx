import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const CATEGORIAS = [
    'Todas as categorias',
    'Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Moradia',
    'Roupas', 'Tecnologia', 'Viagem', 'Outros'
]

function SeletorCategorias() {
    const [categoria, setCategoria] = useState(CATEGORIAS[0])
    const [aberto, setAberto] = useState(false)
    const caixa = useRef(null)

    // fecha a lista ao clicar fora ou apertar Esc
    useEffect(() => {
        if (!aberto) return

        function clicouFora(evento) {
            if (!caixa.current.contains(evento.target)) setAberto(false)
        }
        function apertouEsc(evento) {
            if (evento.key === 'Escape') setAberto(false)
        }

        document.addEventListener('mousedown', clicouFora)
        document.addEventListener('keydown', apertouEsc)
        return () => {
            document.removeEventListener('mousedown', clicouFora)
            document.removeEventListener('keydown', apertouEsc)
        }
    }, [aberto])

    function escolherCategoria(nome) {
        setCategoria(nome)
        setAberto(false)
    }

    return (
        <div className="filtro-categoria" ref={caixa}>
            <button type="button" className="filtro-select" onClick={() => setAberto(!aberto)} aria-expanded={aberto}>
                {categoria}
                <ChevronDown size={14} />
            </button>

            {aberto && (
                <div className="painel-categorias">
                    {CATEGORIAS.map((nome) => (
                        <button
                            type="button"
                            key={nome}
                            className={nome === categoria ? 'ativo' : ''}
                            onClick={() => escolherCategoria(nome)}
                        >
                            {nome}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SeletorCategorias;
