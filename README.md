# Viva Feira 🌱

Mini projeto de carrinho de compras desenvolvido para o **Entregável 3 — Interatividade e `useState` **.

## O projeto

Uma feira online responsiva para escolher produtos frescos. O app demonstra estado e interação no React com um contador, uma sacola que permite adicionar, remover e alterar quantidades, cálculo automático do total e um checkout com validação e feedback visual.

### Requisitos da atividade

- **Parte 1 — Contador:** botões de aumentar, diminuir e zerar; cada clique atualiza a interface por meio do `useState`.
- **Parte 2 — Mini projeto:** catálogo de produtos, inclusão com spread operator, controle de quantidade, remoção, total calculado e botão que confirma visualmente a inclusão.
- **Parte 3 — Checkout:** nome obrigatório e e-mail validado. Se o nome estiver vazio após o envio, o campo recebe borda vermelha e uma mensagem de erro com classes Tailwind. Um carrinho vazio também impede a confirmação.
- **Parte 4 — Reflexão:** respondida abaixo.

## Reflexão: por que não mutar o estado?

Não devemos alterar o estado diretamente, por exemplo com `carrinho.push(item)`, porque o React depende da referência do estado para perceber que houve uma mudança e renderizar a interface novamente. O `push` modifica o mesmo array; assim, a atualização pode não ser reconhecida corretamente e ainda torna mais difícil prever de onde veio cada mudança.

O spread operator (`[...carrinho, item]`) cria um novo array com os itens anteriores e o novo item. Ao passar essa nova referência para a função atualizadora do `useState`, deixamos a mudança explícita e previsível. Isso mantém a imutabilidade, facilita a renderização correta e reduz efeitos inesperados em outras partes que usam o mesmo dado.
