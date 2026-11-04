import saldoAtual from '../utils/saldoAtual.js';
import Atalhos from '../components/Atalhos.jsx';
import Card from '../components/Card.jsx'; 
import Header from '../components/Header.jsx';
import NomeBanco from '../components/NomeBanco.jsx';
import { Wallet, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

function Inicio() {
  return (
<div className="pagina-inicio">
    
    <Header
      titulo={<>Bem-vindo ao <NomeBanco /></>}
      subtitulo="Acompanhe seu dinheiro e faça movimentações."
      textoBotao="Nova movimentação"
    />

    




    <div className="cards-container">
        <Card titulo="Saldo Atual" descricao="disponível na conta" valor={saldoAtual()} icone={Wallet} />
        <Card titulo="Receitas" descricao="entradas do mês" valor={saldoAtual()} icone={ArrowDownLeft} tipo="receita" />
        <Card titulo="Despesas" descricao="saídas do mês" valor={saldoAtual()} icone={ArrowUpRight} tipo="despesa" />
    </div>  

  <Atalhos />

</div>

  );
}

export default Inicio;