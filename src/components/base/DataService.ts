import {
  IApi,
  IProduct,
  IProductsResponse,
  IOrderRequest,
  IOrderResponse,
  IBuyer,
} from "../../types/index.ts";

export class DataService {
  protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }
  getProducts(): Promise<IProduct[]> {
    return this.api
      .get<IProductsResponse>("/product/")
      .then(function (response: IProductsResponse) {
        return response.items;
      });
  }
  postOrder(
    buyer: IBuyer,
    products: IProduct[],
    total: number
  ): Promise<IOrderResponse> {
    const order: IOrderRequest = {
      ...buyer,
      total: total,
      items: products.map(function (product) {
        return product.id;
      }),
    };
    return this.api.post<IOrderResponse>("/order/", order);
  }
}
