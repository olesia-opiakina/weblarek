import { IProduct } from "../../../types/index.ts";

export class Catalog {
  protected products: IProduct[] = [];
  protected currentProduct?: IProduct;

  constructor() {}

  add(products: IProduct[]) {
    this.products = this.products.concat(products);
  }
  getList(): IProduct[] {
    return this.products;
  }
  getProduct(id: string): IProduct | undefined {
    return this.products.find(function (product) {
      return product.id === id;
    });
  }
  setCurrentProduct(product: IProduct) {
    this.currentProduct = product;
  }
  getCurrentProduct(): IProduct | undefined {
    return this.currentProduct;
  }
}
