import express from "express";
import { Cart } from "./cart.js";

const app = express();
const PORT = 3000;
const cart = new Cart();

app.use(express.static("public"));
app.use(express.json());

app.get("/cart", (req, res) => {
  res.json({
    produtos: cart.itens,
    valorTotal: cart.calculaTotal(),
  });
});

app.post("/cart/item", (req, res) => {
  const produtoVindoDoSite = req.body;
  cart.addItem(produtoVindoDoSite);
  res.json({ mensagem: "Adicionado na sacola" });
});

app.delete("/cart/item/:nomeDoProduto", (req, res) => {
  const nomeParaApagar = req.params.nomeDoProduto;
  cart.removerItem(nomeParaApagar);
  res.json({ mensagem: "removido" });
});

app.listen(PORT, () => {
  console.log(`servidor rodando na porta http://localhost:${PORT}`);
});
