document.addEventListener("DOMContentLoaded", function () {
    const owl = $('#owl-demo');   // Carrossel para a categoria "Medicamentos"
    const owl2 = $('#owl-demo2'); // Carrossel para a categoria "Higiene"
    const owl3 = $('#owl-demo3'); // Carrossel para a categoria "Cuidados com a Pele"

    const options = {
        loop: true, // Habilita o loop infinito
        margin: 10, // Margem entre os itens
        responsiveClass: true,
        responsive: {
            0: {
                items: 1, // Número de itens exibidos em telas menores que 600px
            },
            600: {
                items: 3, // Número de itens exibidos em telas maiores ou iguais a 600px
            },
            1000: {
                items: 5, // Número de itens exibidos em telas maiores ou iguais a 1000px
            }
        }
    };

    // Inicializa os carrosséis Owl Carousel
    owl.owlCarousel(options);
    owl2.owlCarousel(options);
    owl3.owlCarousel(options);

    // Função para buscar e renderizar produtos por categoria
    async function fetchAndRenderProdutosPorCategoria(categoria, container) {
        try {
            const response = await fetch(`http://localhost:3000/produtos?categoria=${categoria}`);
            const produtos = await response.json();
            renderProdutosPorCategoria(produtos, categoria, container);
        } catch (error) {
            console.error(`Erro ao buscar produtos da categoria ${categoria}:`, error);
        }
    }

    // Função para renderizar produtos por categoria no carrossel
    function renderProdutosPorCategoria(produtos, categoria, container) {
        // Limpa o conteúdo atual do carrossel
        container.owlCarousel('remove', 0);

        // Filtra os produtos pela categoria correta antes de adicionar ao carrossel
        produtos.forEach(produto => {
            if (produto.categoria === categoria) {

                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card", "border-0", "shadow", "mx-2");
                cardDiv.style.width = "14rem";
                cardDiv.style.margin = "10px";

                const cardBodyDiv = document.createElement("div");
                cardBodyDiv.classList.add("card-body", "d-flex", "flex-column");
                cardBodyDiv.style.alignItems = "center";
                
                const imagem = document.createElement("img");
                imagem.src = produto.imagem;
                imagem.alt = "";
                imagem.classList.add("card-img-top", "img-fluid");
                imagem.style.padding = "30px";
                cardBodyDiv.appendChild(imagem);

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

                const preco = document.createElement("p");
                preco.classList.add("fw-bold", "mb-0");
                preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
                cardBodyDiv.appendChild(preco);

                const comprarBtn = document.createElement("button");
                comprarBtn.classList.add("btn", "btn-primary");
                comprarBtn.textContent = "Comprar";
                cardBodyDiv.appendChild(comprarBtn);

                // Adiciona um evento de clique ao card para redirecionar para a página do produto
                cardDiv.addEventListener("click", () => {
                    const queryString = `?imagem=${encodeURIComponent(produto.imagem)}&titulo=${encodeURIComponent(produto.descricao)}&sobre=${encodeURIComponent(produto.sobre)}&marca=${encodeURIComponent(produto.marca)}&preco=${encodeURIComponent(produto.preco.toFixed(2))}`;
                    window.location.href = `product.html${queryString}`;
                });

                
                cardDiv.appendChild(cardBodyDiv);

                // Adiciona o item ao carrossel
                container.owlCarousel('add', cardDiv).owlCarousel('update');
            }
        });
    }

    // Carregar produtos de cada categoria ao carregar a página
    fetchAndRenderProdutosPorCategoria("medicamentos", owl);
    fetchAndRenderProdutosPorCategoria("higiene", owl2);
    fetchAndRenderProdutosPorCategoria("cuidados-pele", owl3);
});
