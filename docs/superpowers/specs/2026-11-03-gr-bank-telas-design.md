# GR Bank — Design das telas e organização

Data: 2026-11-03

## Por que existe

O GR Bank é um app de finanças pessoais para o Guilherme usar de verdade (ele hoje não acompanha o próprio dinheiro) e, ao mesmo tempo, um projeto de portfólio.

O app precisa responder duas perguntas no fim de cada mês:

1. **Quanto eu gastei e com o quê?**
2. **Quanto falta para a meta?** A meta atual é juntar dinheiro para comprar um carro.

**Quem constrói:** o próprio Guilherme escreve as telas e o código. Este documento é o guia dele, não uma lista de tarefas para outra pessoa implementar.

## Objetivos

- Registrar um gasto ou uma receita em **até ~10 segundos**, inclusive no celular.
- Mostrar no Início, de relance, o saldo, as receitas e despesas do mês, o progresso da meta e onde o dinheiro foi gasto.
- Os mesmos dados no computador e no celular.
- Visual caprichado, porque o app vai para o portfólio.

## Fora do escopo (por enquanto)

- Várias metas ao mesmo tempo: só a meta do carro. O modelo de dados pode prever mais de uma, mas a interface mostra uma só.
- Integração com banco real, importação de extrato ou Open Finance.
- Orçamento por categoria, alertas e notificações.
- Uso compartilhado com outras pessoas.

## Anti-objetivos (se acontecer, o app fracassou mesmo funcionando)

- Registrar um gasto ser difícil ou demorado.
- Visual feio.
- Não responder às duas perguntas acima.

## Decisões já tomadas

- **Stack:** React + Vite, que já está no projeto, e ícones do `lucide-react`.
- **Dados:** Supabase, com banco e login. Cada usuário só vê os próprios dados.
- **Menu (sidebar):** Início, Transações, Relatórios, Categorias, Configurações.
- **A meta fica só no Início**, sem tela própria no menu.
- **Formulário de transação:** valor, categoria e descrição.
- **Categorias:** o app vem com uma lista pronta que o usuário pode editar.

## As telas

### Login

- Entrar e criar conta com e-mail e senha (Supabase Auth).
- Quem não está logado só vê essa tela.

### Início

De cima para baixo:

1. **Header:** já existe. O botão "Nova movimentação" abre o formulário de transação.
2. **Cards:** Saldo atual, Receitas do mês e Despesas do mês. Os cards já existem. Hoje `saldoAtual()` retorna 0 fixo e os três cards usam esse mesmo valor. Cada card precisa passar a calcular o próprio valor a partir das transações.
3. **Bloco da meta:** nome da meta ("Carro"), quanto já foi guardado, o valor total, uma barra de progresso, quanto falta e uma previsão simples de quando chega lá (média guardada por mês). Inclui um botão "Guardar para a meta".
4. **Onde mais gastei este mês:** as 3 a 5 categorias com mais despesa, com valor.
5. **Últimas transações:** as 5 mais recentes, com link para a tela Transações.
6. **Atalhos:** *decisão minha:* trocar os atalhos atuais (Transferência, Pagamento, Depósito, Extrato), que são de banco e não deste app, por **Nova despesa**, **Nova receita** e **Guardar para a meta**.

### Formulário de transação (modal)

Abre a partir do Início ou da tela Transações. Deve funcionar bem no celular.

- **Tipo:** despesa ou receita. Já vem marcado conforme o botão que abriu o formulário.
- **Valor:** é o campo que recebe o foco ao abrir. No celular, abre o teclado numérico.
- **Categoria:** escolhida tocando em ícones. Só aparecem categorias do tipo escolhido.
- **Descrição:** opcional.
- **Data:** já vem com hoje e pode ser alterada.
- Salvar fecha o modal e atualiza a tela na hora.
- O mesmo formulário serve para **editar** uma transação.

### Guardar para a meta

É o mesmo formulário, simplificado: só valor e data, com descrição opcional. Também dá para **retirar** dinheiro da meta, como um depósito negativo.

*Decisão minha:* o dinheiro guardado para a meta **não conta como despesa** nos relatórios, mas **sai do saldo atual**. Saldo atual = saldo inicial + receitas − despesas − guardado na meta, somando **todos os meses** (não só o atual). Os cards de Receitas e Despesas mostram só o mês atual.

*Decisão minha:* como o Guilherme já tem dinheiro antes de começar a usar o app, existe um **saldo inicial**, informado no primeiro acesso e editável em Configurações.

### Transações

- Lista de todas as transações, da mais recente para a mais antiga, agrupadas por dia.
- Filtros por mês (padrão: o mês atual), por tipo (despesa ou receita) e por categoria.
- Cada item mostra o ícone da categoria, a descrição, a data e o valor (verde para receita, vermelho para despesa).
- Clicar num item abre a edição. Também dá para apagar, com confirmação.
- Tem um botão para adicionar.

### Relatórios

- Seletor de mês.
- **Gastos por categoria:** gráfico de rosca ou de barras com o valor e o percentual de cada categoria. É isso que responde "quanto gastei e com o quê".
- **Evolução mensal:** receitas e despesas dos últimos 6 meses.
- A biblioteca de gráfico fica a critério de quem constrói. Recharts é uma escolha comum com React.

### Categorias

- Duas listas: Despesa e Receita.
- Criar, renomear, trocar ícone e cor, e apagar.
- Ao apagar uma categoria que tem transações, elas passam para "Outros". Por isso a categoria "Outros" não pode ser apagada.
- **Lista inicial** (*decisão minha*), criada no primeiro login:
  - Despesa: Alimentação, Transporte, Moradia, Lazer, Saúde, Compras, Outros
  - Receita: Salário, Extra, Outros

### Configurações

- Nome exibido no Header.
- Saldo inicial.
- Editar a meta: nome e valor-alvo.
- Sair da conta.
- Opcionais, para depois: exportar dados em CSV e apagar todos os dados.

## Dados (Supabase)

Proposta de tabelas, todas com `user_id` e Row Level Security para cada usuário ver só o que é seu:

- **categorias:** `id`, `user_id`, `nome`, `tipo` (`despesa` | `receita`), `icone` (nome do ícone lucide), `cor`
- **transacoes:** `id`, `user_id`, `tipo`, `valor` (sempre positivo), `categoria_id`, `descricao`, `data`, `criado_em`
- **perfis:** `user_id`, `nome`, `saldo_inicial`
- **metas:** `id`, `user_id`, `nome`, `valor_alvo`
- **depositos_meta:** `id`, `user_id`, `meta_id`, `valor` (negativo = retirada), `data`, `descricao`

Os valores ficam em reais com duas casas decimais (`numeric(12,2)`).

## Visual

- Manter a base atual: sidebar, cards e o estilo do `App.css`.
- Precisa ser **responsivo**. No celular, a sidebar vira uma barra de navegação embaixo ou um menu recolhível (fica a critério de quem constrói).
- Verde para receitas e vermelho para despesas, nos cards, na lista e nos gráficos.

## Ordem sugerida de construção

Cada etapa deixa o app funcionando:

1. Organização: componentes de página para cada item do menu (mesmo vazios) e navegação funcionando.
2. Formulário de transação e tela Transações com **dados em memória** (state do React), para treinar a interface sem depender do servidor.
3. Cálculos do Início: os cards, "onde mais gastei" e últimas transações.
4. Categorias: lista pronta, edição e uso no formulário.
5. Supabase: criar o projeto, as tabelas, o login e trocar os dados em memória pelo banco.
6. Meta do carro no Início.
7. Relatórios com gráficos.
8. Responsivo e acabamento visual.

## Fica a critério de quem constrói

- A biblioteca de gráficos, o roteamento (state ou React Router) e como organizar as chamadas ao Supabase.
- Os detalhes visuais dentro do estilo atual.
- A navegação no celular.
