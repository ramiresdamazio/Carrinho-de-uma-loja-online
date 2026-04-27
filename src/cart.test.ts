/*
describe(): Define qual é a funcionalidade geral. Ex: "Carrinho de Compras".
it() ou test(): É a ação específica. Ex: "deve iniciar vazio".
expect(): É o que você espera que aconteça no final.
*/

import { Cart } from "./cart.js";
import { describe, test, expect } from "@jest/globals";

describe("Carrinho de compras", () => {
  test("deve iniciar com uma lista de itens vazia", () => {
    const carrinho = new Cart();
    expect(carrinho.itens).toEqual([]);
  });
  test("deve conseguir adicionar um item no carrinho", () => {
    const carrinho = new Cart();
    carrinho.addItem({ nome: "Camiseta", preco: 50 });
    expect(carrinho.itens.length).toEqual(1);
  });
  test("deve conseguir ver o valor das compras somadas", () => {
    const carrinho = new Cart();
    carrinho.addItem({ nome: "Camiseta", preco: 50 });
    carrinho.addItem({ nome: "Bermuda", preco: 100 });
    const valorTotal = carrinho.calculaTotal();
    expect(valorTotal).toEqual(150);
  });
  test("deve conseguir remover 1 valor das compras", () => {
    const carrinho = new Cart();
    carrinho.addItem({ nome: "Camiseta", preco: 100 });
    carrinho.addItem({ nome: "Boné", preco: 200 });
    carrinho.removerItem("Boné");
    const valorTotal = carrinho.calculaTotal();
    expect(valorTotal).toEqual(100);
  });
  test("deve conseguir identificar valores negativos", () => {
    const carrinho = new Cart();

    expect(() => {
      carrinho.addItem({ nome: "Sapato Errado", preco: -50 });
    }).toThrow("o preço não pode ser negativo");
  });
});
