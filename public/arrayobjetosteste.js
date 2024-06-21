// Array de produtos (exemplo)
const produtos = [
    {
        imagem: "/assets/images/dorflex.jpg",
        descricao: "Descrição do Produto 1",
        marca: "Marca do Produto 1",
        preco: 19.99,
        categoria: "Categoria 1",
        subcategorias: ["Subcategoria 1", "Subcategoria 3"]
    },
    {
        imagem: "/assets/images/remedio.jpg",
        descricao: "Descrição do Produto 2",
        marca: "Marca do Produto 2",
        preco: 29.99,
        categoria: "Categoria 2",
        subcategorias: ["Subcategoria 1", "Subcategoria 2"]
    },
    {
        imagem: "/assets/images/buscopan.jpg",
        descricao: "Buscopan",
        marca: "Marca do Produto 2",
        preco: 9.99,
        categoria: "Categoria 2",
        subcategorias: ["Subcategoria 2"]
    },
    // Adicione mais produtos conforme necessário
];

// Função para filtrar produtos com base nas subcategorias selecionadas
function filtrarProdutos() {
    const produtosContainer = document.querySelector(".produtos");
    produtosContainer.innerHTML = ""; // Limpar produtos atuais

    const subcategoria1Checkbox = document.getElementById('subcategoria1');
    const subcategoria2Checkbox = document.getElementById('subcategoria2');
    const subcategoria3Checkbox = document.getElementById('subcategoria3');
    const subcategoria4Checkbox = document.getElementById('subcategoria4');

    const subcategoriasSelecionadas = [];
    if (subcategoria1Checkbox.checked) subcategoriasSelecionadas.push('Subcategoria 1');
    if (subcategoria2Checkbox.checked) subcategoriasSelecionadas.push('Subcategoria 2');
    if (subcategoria3Checkbox.checked) subcategoriasSelecionadas.push('Subcategoria 3');
    if (subcategoria4Checkbox.checked) subcategoriasSelecionadas.push('Subcategoria 4');

    produtos.forEach(produto => {
        // Verificar se o produto deve ser exibido com base nas subcategorias selecionadas
        if (subcategoriasSelecionadas.length > 0) {
            const temTodasSubcategorias = subcategoriasSelecionadas.every(subcategoria =>
                produto.subcategorias.includes(subcategoria)
            );
            if (temTodasSubcategorias) {
                const cardHTML = `
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
                
                produtosContainer.innerHTML += cardHTML;
            }
        }
    });

    // Caso nenhum checkbox esteja marcado, exibir todos os produtos
    if (subcategoriasSelecionadas.length === 0) {
        produtos.forEach(produto => {
            const cardHTML = `
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
            
            produtosContainer.innerHTML += cardHTML;
        });
    }
}

// Adicionar listeners para os checkboxes de subcategorias
const subcategoria1Checkbox = document.getElementById('subcategoria1');
const subcategoria2Checkbox = document.getElementById('subcategoria2');
const subcategoria3Checkbox = document.getElementById('subcategoria3');
const subcategoria4Checkbox = document.getElementById('subcategoria4');

subcategoria1Checkbox.addEventListener('change', filtrarProdutos);
subcategoria2Checkbox.addEventListener('change', filtrarProdutos);
subcategoria3Checkbox.addEventListener('change', filtrarProdutos);
subcategoria4Checkbox.addEventListener('change', filtrarProdutos);

// Chamada inicial para renderizar todos os produtos
filtrarProdutos();