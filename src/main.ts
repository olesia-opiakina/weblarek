import "./scss/styles.scss";
import { Buyer } from "./components/base/Models/Buyer";
import { Cart } from "./components/base/Models/Cart";
import { Catalog } from "./components/base/Models/Catalog";
import { apiProducts } from "./utils/data";
import { IOrderResponse, IProduct, TPayment } from "./types";
import { DataService } from "./components/base/DataService";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

const catalog = new Catalog();
catalog.add(apiProducts.items);
console.log("Массив товаров из каталога: ", catalog.getList());
const oneProduct = catalog.getList()[0];
console.log("Товар из каталога: ", catalog.getProduct(oneProduct.id));
catalog.setCurrentProduct(oneProduct);
console.log("Текущий товар из каталога: ", catalog.getCurrentProduct());

const cart = new Cart();
cart.addProduct(oneProduct);
console.log("Массив товаров в корзине: ", cart.getList());
console.log("Стоимость товаров в корзине: ", cart.getPrice());
console.log("Количество товаров в корзине: ", cart.getCountOfProducts());
console.log("Товар в корзине", cart.checkProduct(oneProduct.id));
cart.removeProduct(oneProduct.id);
console.log("Товар удален из корзины", cart.getList());
console.log("Товар в корзине", cart.checkProduct(oneProduct.id));
cart.addProduct(oneProduct);
cart.removeAll();
console.log("Корзина пустая", cart.getList());

const buyer = new Buyer();
buyer.setData({
  email: "olesyal1608@gmail.com",
  phone: "+381629381148",
  address: "Belgrade, Novogradska 65a",
  payment: TPayment.Card,
});
console.log("Данные покупателя: ", buyer.getData());
buyer.removeAll();
console.log("Данные очищены", buyer.getData());
buyer.setData({
  email: "olesyal1608@gmail.com",
  phone: "",
  address: "",
  payment: TPayment.Default,
});
console.log("Валидация данных", buyer.validateData());

cart.addProduct(oneProduct);
buyer.setData({
  email: "olesyal1608@gmail.com",
  phone: "+381629381148",
  address: "Belgrade, Novogradska 65a",
  payment: TPayment.Card,
});

const api = new Api(API_URL);
const data = new DataService(api);

data.getProducts().then(function (products: IProduct[]) {
  catalog.add(products);
  console.log("Массив товаров, добавленных с сервера: ", catalog.getList());
});

data
  .postOrder(buyer.getData(), cart.getList(), cart.getPrice())
  .then(function (response: IOrderResponse) {
    console.log("Номер заказа: ", response.id);
  });
