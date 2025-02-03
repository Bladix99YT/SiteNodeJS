const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors()); // Permite que o frontend acesse o backend
app.use(express.json());

// Rota para listar os produtos
app.get("/produtos", (req, res) => {
    fs.readFile("./data/produtos.json", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao carregar produtos" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Rota para buscar um produto por ID
app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile("./data/produtos.json", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao carregar produtos" });
        } else {
            const produtos = JSON.parse(data);
            const produto = produtos.find(p => p.id === id);
            produto ? res.json(produto) : res.status(404).json({ error: "Produto não encontrado" });
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
