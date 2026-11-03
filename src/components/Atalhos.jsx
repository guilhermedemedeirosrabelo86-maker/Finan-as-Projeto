import { ArrowLeftRight, Barcode, ArrowDownToLine, ReceiptText } from 'lucide-react'

const ATALHOS = [
  { nome: 'Transferência', icone: ArrowLeftRight },
  { nome: 'Pagamento', icone: Barcode },
  { nome: 'Depósito', icone: ArrowDownToLine },
  { nome: 'Extrato', icone: ReceiptText },
]

function Atalhos() {
  return (
    <section className="atalhos">
      <h2 className="titulo-secao">Atalhos</h2>
      <div className="atalhos-botoes">
        {ATALHOS.map((atalho) => {
          const Icone = atalho.icone
          return (
            <button key={atalho.nome}>
              <span className="atalho-icone">
                <Icone size={20} />
              </span>
              {atalho.nome}
            </button>
          )
        })}
      </div>
    </section>
  );
}

export default Atalhos;
