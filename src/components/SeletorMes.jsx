import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function SeletorMes(){
    const hoje = new Date()
    const [mes, setMes] = useState(hoje.getMonth())
    const [ano, setAno] = useState(hoje.getFullYear())
    const [aberto, setAberto] = useState(false)
    const [anoDoPainel, setAnoDoPainel] = useState(ano)
    const caixa = useRef(null)

    // fecha o painel ao clicar fora ou apertar Esc
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

    function mudarMes(quantidade) {
        const data = new Date(ano, mes + quantidade)
        setMes(data.getMonth())
        setAno(data.getFullYear())
    }

    function abrirPainel() {
        setAnoDoPainel(ano)
        setAberto(!aberto)
    }

    function escolherMes(indice) {
        setMes(indice)
        setAno(anoDoPainel)
        setAberto(false)
    }

    return (
        <div className="filtro-mes" ref={caixa}>
            <button type="button" aria-label="Mês anterior" onClick={() => mudarMes(-1)}>
                <ArrowLeft size={16} />
            </button>

            <button type="button" className="filtro-mes-atual" onClick={abrirPainel} aria-expanded={aberto}>
                {MESES[mes]} {ano}
                <ChevronDown size={14} />
            </button>

            <button type="button" aria-label="Próximo mês" onClick={() => mudarMes(1)}>
                <ArrowRight size={16} />
            </button>

            {aberto && (
                <div className="painel-meses">
                    <div className="painel-meses-ano">
                        <button type="button" aria-label="Ano anterior" onClick={() => setAnoDoPainel(anoDoPainel - 1)}>
                            <ArrowLeft size={14} />
                        </button>
                        <span>{anoDoPainel}</span>
                        <button type="button" aria-label="Próximo ano" onClick={() => setAnoDoPainel(anoDoPainel + 1)}>
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="painel-meses-grade">
                        {MESES.map((nome, indice) => (
                            <button
                                type="button"
                                key={nome}
                                className={indice === mes && anoDoPainel === ano ? 'ativo' : ''}
                                onClick={() => escolherMes(indice)}
                            >
                                {nome.slice(0, 3)}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SeletorMes;
