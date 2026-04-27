export type Item = {
  nome: string;
  preco: number;
};
export class Cart {
  itens: Item[] = [];
  addItem(item: Item) {
    if (item.preco < 0) {
      throw new Error("o preço não pode ser negativo");
    }

    this.itens.push(item);
  }
  calculaTotal() {
    return this.itens.reduce((valorAcumulado, item) => {
      return valorAcumulado + item.preco;
    }, 0);
  }
  removerItem(produtoDeletado: string) {
    this.itens = this.itens.filter((itemDaRodada) => {
      return itemDaRodada.nome != produtoDeletado;
    });
  }
}
