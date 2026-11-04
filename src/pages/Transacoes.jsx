import Header from "../components/Header";
import Nav from "../components/Nav";

function Transacoes(){
    return (
        <div className="pagina-transacoes">
            
            <Header titulo='Transações' subtitulo='Tudo que entrou e saiu da sua conta' textoBotao='Nova movimentação' />
            <Nav />
        
        </div>
    )
}

export default Transacoes;