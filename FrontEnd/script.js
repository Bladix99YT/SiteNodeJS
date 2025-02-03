document.addEventListener("DOMContentLoaded", async function () {
    const produtosDiv = document.getElementById("produtos");

    try {
        const response = await fetch("http://localhost:3000/produtos"); // Chama o backend
        const produtos = await response.json();

        produtos.forEach(produto => {
            const div = document.createElement("div");
            div.classList.add("produto");

            div.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
            `;

            produtosDiv.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
});
