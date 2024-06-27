document.addEventListener('DOMContentLoaded', function () {
    carregarCarrinho();

    function carregarCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const cartItemsContainer = document.getElementById('cartItems');

        cartItemsContainer.innerHTML = ''; // Limpa o contêiner

        let total = 0;

        if (carrinho.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach((produto, index) => {
                const itemRow = document.createElement('div');
                itemRow.classList.add('row', 'produto-item');

                const precoUnitario = parseFloat(produto.preco.replace('R$', '').replace(',', '.'));
                const subtotal = (precoUnitario * produto.quantidade).toFixed(2);
                total += parseFloat(subtotal);

                itemRow.innerHTML = `
                <div class="col"><img src="${produto.imagem}" class="img-fluid"></div>
                <div class="col">${produto.titulo}</div>
                <div class="col">${produto.marca}</div>
                <div class="col"><input type="number" class="form-control form-control-sm text-center" value="${produto.quantidade}" min="1" onchange="atualizarQuantidade(${index}, this.value)"></div>
                <div class="col">${produto.preco}</div>
                <div class="col">R$ ${subtotal}</div>
                <div class="col"><button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">Remover</button></div>
            `;

                cartItemsContainer.appendChild(itemRow);
            });
        }

        // Atualizar o valor total no h4
        const totalValueElement = document.querySelector('.total-value');
        totalValueElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    window.removerDoCarrinho = function (index) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
    }

    window.atualizarQuantidade = function (index, novaQuantidade) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho[index].quantidade = parseInt(novaQuantidade);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
    }

    
});
