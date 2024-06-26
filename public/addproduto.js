document.getElementById('addProdutoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = key === 'subcategorias' ? value.split(',') : value;
    });

    try {
        const response = await fetch('/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Produto adicionado com sucesso!');
            e.target.reset();
            fetchProdutos();
        } else {
            const error = await response.json();
            alert('Erro ao adicionar produto: ' + error.message);
        }
    } catch (err) {
        alert('Erro ao adicionar produto: ' + err.message);
    }
});

async function fetchProdutos() {
    const response = await fetch('/produtos');
    const produtos = await response.json();

    const produtosContainer = document.querySelector('.produtos');
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="item">
                <div class="card border-0 shadow mx-2" style="width: 12rem; height: 20rem; margin: 10px;">
                    <img src="${produto.imagem}" alt="" class="card-img-top img-fluid" style="padding: 30px; height: 9rem;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-center">${produto.descricao}</h5>
                        <p class="card-text text-center">${produto.marca}</p>
                        <div class="d-flex justify-content-center align-items-center">
                            <input type="number" class="form-control form-control-sm text-center" style="width: 50px;" value="1">
                        </div>
                        <div class="hr-black"></div>
                        <div class="card-footer d-flex justify-content-between align-items-center" style="margin-top: 10px;">
                            <p class="fw-bold mb-0">R$ ${produto.preco.toFixed(2)}</p>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        produtosContainer.appendChild(card);
    });
}

fetchProdutos();