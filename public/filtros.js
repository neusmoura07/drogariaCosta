document.addEventListener("DOMContentLoaded", function() {
    const produtosContainer = document.querySelector(".produtos");
    const subcategoriasContainer = document.querySelector(".subcategorias");

    const subcategoriasPorCategoria = {
        medicamentos: [
            { value: "diabetes", label: "Diabetes" },
            { value: "digestao", label: "Digestão" },
            { value: "visao", label: "Visão" },
            { value: "primeiros_socorros", label: "Primeiros Socorros" }
        ],
        higiene: [
            { value: "oral", label: "Higiene Oral" },
            { value: "corporal", label: "Higiene Corporal" },
            { value: "capilar", label: "Higiene Capilar" }
        ],
        "cuidados-pele": [
            { value: "hidratacao", label: "Hidratação" },
            { value: "antiacne", label: "Antiacne" },
            { value: "protetor_solar", label: "Protetor Solar" }
        ]
    };


    // Função para renderizar produtos com os cards estilizados
    function renderProdutos(produtos) {
        produtosContainer.innerHTML = ""; // Limpa o container de produtos

        produtos.forEach(produto => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("item");

            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "border-0", "shadow", "mx-2");
            cardDiv.style.width = "12rem";
            cardDiv.style.height = "20rem";
            cardDiv.style.margin = "10px";

            const imagem = document.createElement("img");
            imagem.src = produto.imagem;
            imagem.alt = "";
            imagem.classList.add("card-img-top", "img-fluid");
            imagem.style.padding = "30px";
            imagem.style.height = "9rem";
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

            produtosContainer.appendChild(produtoDiv);
        });
    }

    // Função para buscar produtos do backend
    async function fetchProdutos() {
        try {
            const response = await fetch('http://localhost:3000/produtos');
            const produtos = await response.json();
            return produtos;
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            return [];
        }
    }

    // Função para filtrar produtos pela categoria da URL
    async function filtrarPorCategoria() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoria = urlParams.get('categoria');

        if (categoria) {
            const produtos = await fetchProdutos();
            const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
            renderProdutos(produtosFiltrados);
            atualizarSubcategorias(categoria);
        } else {
            const produtos = await fetchProdutos();
            renderProdutos(produtos);
        }
    }

    // Função para atualizar as subcategorias com base na categoria
    function atualizarSubcategorias(categoria) {
        subcategoriasContainer.innerHTML = ""; // Limpa o container de subcategorias

        if (subcategoriasPorCategoria[categoria]) {
            subcategoriasPorCategoria[categoria].forEach(subcategoria => {
                const div = document.createElement("div");
                div.classList.add("form-check");

                const input = document.createElement("input");
                input.classList.add("form-check-input", "subcategoria");
                input.type = "checkbox";
                input.value = subcategoria.value;
                input.id = `subcategoria-${subcategoria.value}`;
                div.appendChild(input);

                const label = document.createElement("label");
                label.classList.add("form-check-label");
                label.setAttribute("for", `subcategoria-${subcategoria.value}`);
                label.textContent = subcategoria.label;
                div.appendChild(label);

                subcategoriasContainer.appendChild(div);
            });

            // Reaplica os eventos de filtragem de subcategorias
            const filtroInputs = document.querySelectorAll(".subcategoria");

            filtroInputs.forEach(input => {
                input.addEventListener("change", async () => {
                    const produtos = await fetchProdutos();
                    filtrarPorSubcategorias(produtos);
                });
            });
        }
    }

    // Função para filtrar produtos por subcategorias
    function filtrarPorSubcategorias(produtos) {
        const filtroInputs = document.querySelectorAll(".subcategoria");
        const subcategoriasSelecionadas = Array.from(filtroInputs)
            .filter(input => input.checked)
            .map(input => input.value);

        const produtosFiltrados = produtos.filter(produto =>
            subcategoriasSelecionadas.every(subcat => produto.subcategorias.includes(subcat))
        );

        renderProdutos(produtosFiltrados);
    }

    // Função para filtrar produtos pela barra de pesquisa
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    const searchProducts = async () => {
        try {
            // Verifica se está na página "category"
            if (window.location.pathname.includes("/category")) {
                const searchTerm = searchInput.value.toLowerCase();
                const produtos = await fetchProdutos();

                const produtosFiltrados = produtos.filter(produto =>
                    produto.descricao.toLowerCase().includes(searchTerm)
                );

                renderProdutos(produtosFiltrados);
            } else {
                // Redireciona para a página "category"
                window.location.href = "http://localhost:3000/category";
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    searchButton.addEventListener("click", searchProducts);

    searchInput.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchProducts();
        }
    });

    // Carregar produtos filtrados pela categoria da URL ao carregar a página
    filtrarPorCategoria();

    // Atualizar produtos ao clicar em uma categoria
    const categoriaLinks = document.querySelectorAll('.categoria-link');
    categoriaLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const categoria = this.getAttribute('data-categoria');
            window.history.pushState(null, '', `/category?categoria=${categoria}`);
            filtrarPorCategoria();
        });
    });
});