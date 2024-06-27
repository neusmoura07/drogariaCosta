document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const imagem = params.get('imagem');
    const titulo = params.get('titulo');
    const marca = params.get('marca');
    const preco = params.get('preco');
    const sobre = params.get('sobre');

    // Atualiza os elementos na página com os valores dos parâmetros da URL
    if (imagem && titulo && marca && preco) {
        atualizarProdutoNaPagina(imagem, titulo, marca, preco, sobre);
    } else {
        console.error('Parâmetros incompletos na URL');
    }
});

// Função para atualizar os detalhes do produto na página
function atualizarProdutoNaPagina(imagem, titulo, marca, preco, sobre) {
    // Atualizar imagem do produto
    const imagemProduto = document.getElementById('imagemProduto');
    imagemProduto.src = decodeURIComponent(imagem);
    imagemProduto.alt = decodeURIComponent(titulo);

    // Atualizar título do produto
    const tituloProduto = document.getElementById('tituloProduto');
    tituloProduto.textContent = decodeURIComponent(titulo);

    // Atualizar marca do produto
    const marcaProduto = document.getElementById('marcaProduto');
    marcaProduto.textContent = decodeURIComponent(marca);

    // Atualizar preço do produto
    const precoProduto = document.getElementById('precoProduto');
    precoProduto.textContent = `R$ ${parseFloat(preco).toFixed(2)}`;

    // Atualizar descrição do produto (opcional)
    const descricaoProduto = document.getElementById('descricaoProduto');
    descricaoProduto.textContent = decodeURIComponent(sobre);
}
