document.addEventListener("DOMContentLoaded", function() {
    const medicamentosProdutosContainer = document.getElementById("medicamentos-produtos");
    const higieneProdutosContainer = document.getElementById("higiene-produtos");
    const cuidadosPeleProdutosContainer = document.getElementById("cuidados-pele-produtos");

    // Função para buscar produtos por categoria
    async function fetchProdutosPorCategoria(categoria, container) {
        try {
            const response = await fetch(`http://localhost:3000/produtos?categoria=${categoria}`);
            const produtos = await response.json();
            renderProdutosPorCategoria(produtos, categoria, container);
        } catch (error) {
            console.error(`Erro ao buscar produtos da categoria ${categoria}:`, error);
        }
    }

    // Função para renderizar produtos por categoria nos cards
    function renderProdutosPorCategoria(produtos, categoria, container) {
        container.innerHTML = ""; // Limpa o container de produtos

        produtos.forEach(produto => {
            // Verifica se o produto pertence à categoria atual
            if (produto.categoria === categoria) {
                const produtoDiv = document.createElement("div");
                produtoDiv.classList.add("item");

                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card", "border-0", "shadow", "mx-2");
                cardDiv.style.width = "14rem";
                cardDiv.style.margin = "10px";

                const imagem = document.createElement("img");
                imagem.src = produto.imagem;
                imagem.alt = "";
                imagem.classList.add("card-img-top", "img-fluid");
                imagem.style.padding = "30px";
                cardDiv.appendChild(imagem);

                const cardBodyDiv = document.createElement("div");
                cardBodyDiv.classList.add("card-body", "d-flex", "flex-column");
                cardBodyDiv.style.alignItems = "center";

                const titulo = document.createElement("h5");
                titulo.classList.add("card-title", "text-center");
                titulo.textContent = produto.descricao;
                cardBodyDiv.appendChild(titulo);

                const marca = document.createElement("p");
                marca.classList.add("card-text", "text-center");
                marca.textContent = produto.marca;
                cardBodyDiv.appendChild(marca);

                const inputQuantidade = document.createElement("input");
                inputQuantidade.type = "number";
                inputQuantidade.classList.add("form-control", "form-control-sm", "text-center");
                inputQuantidade.style.width = "50px";
                inputQuantidade.value = "1";
                cardBodyDiv.appendChild(inputQuantidade);

                const hrDiv = document.createElement("div");
                hrDiv.classList.add("hr-black");
                cardBodyDiv.appendChild(hrDiv);

                const cardFooterDiv = document.createElement("div");
                cardFooterDiv.classList.add("card-footer", "d-flex", "justify-content-between", "align-items-center");
                cardFooterDiv.style.marginTop = "10px";

                const preco = document.createElement("p");
                preco.classList.add("fw-bold", "mb-0");
                preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
                cardFooterDiv.appendChild(preco);

                const comprarBtn = document.createElement("button");
                comprarBtn.classList.add("btn", "btn-primary");
                comprarBtn.textContent = "Comprar";
                cardFooterDiv.appendChild(comprarBtn);

                cardBodyDiv.appendChild(cardFooterDiv);
                cardDiv.appendChild(cardBodyDiv);
                produtoDiv.appendChild(cardDiv);

                container.appendChild(produtoDiv);
            }
        });
    }

    // Carregar produtos de cada categoria ao carregar a página
    fetchProdutosPorCategoria("medicamentos", medicamentosProdutosContainer);
    fetchProdutosPorCategoria("higiene", higieneProdutosContainer);
    fetchProdutosPorCategoria("cuidados-pele", cuidadosPeleProdutosContainer);
});
