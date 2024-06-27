function adicionarAoCarrinho() {
    const imagem = document.getElementById('imagemProduto').src;
    const titulo = document.getElementById('tituloProduto').innerText;
    const marca = document.getElementById('marcaProduto').innerText;
    const preco = document.getElementById('precoProduto').innerText;
    const quantidade = document.querySelector('.input-quantidade').value;

    const produto = {
        imagem,
        titulo,
        marca,
        preco,
        quantidade
    };

    // Obter o carrinho atual do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adicionar o novo produto ao carrinho
    carrinho.push(produto);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert('Produto adicionado ao carrinho!');
}

