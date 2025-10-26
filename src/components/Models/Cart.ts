import { IProduct } from "../../types/index.ts";

export class Cart {
  protected products: IProduct[] = [];

  getList(): IProduct[] {
    return this.products;
  }
  addProduct(product: IProduct) {
    this.products.push(product);
  }
  removeProduct(id: string) {
    this.products = this.products.filter(function (product) {
      return product.id !== id;
    });
  }
  removeAll() {
    this.products = [];
  }
  getPrice(): number {
    return this.products.reduce(function (currentSum, product) {
      if (product.price === null) {
        return currentSum;
      }
      return currentSum + product.price;
    }, 0);
  }
  getCountOfProducts(): number {
    return this.products.length;
  }
  checkProduct(id: string): boolean {
    return (
      this.products.find(function (product) {
        return product.id === id;
      }) !== undefined
    );
  }
}
