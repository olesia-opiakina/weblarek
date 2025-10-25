import { IBuyer, TPayment, ValidationErrors } from "../../../types/index.ts";

export class Buyer {
  protected data: IBuyer = {
    payment: TPayment.Default,
    email: "",
    phone: "",
    address: "",
  };

  constructor() {}

  setData(data: IBuyer) {
    if (data.address !== "") {
      this.data.address = data.address;
    }
    if (data.email !== "") {
      this.data.email = data.email;
    }
    if (data.payment !== TPayment.Default) {
      this.data.payment = data.payment;
    }
    if (data.phone !== "") {
      this.data.phone = data.phone;
    }
  }
  getData(): IBuyer {
    return this.data;
  }
  removeAll() {
    this.data.email = "";
    this.data.payment = TPayment.Default;
    this.data.phone = "";
    this.data.address = "";
  }
  validateData(): ValidationErrors {
    let error: ValidationErrors = {};

    if (this.data.email === "") {
      error.email = "Email не заполнен";
    }
    if (this.data.payment === TPayment.Default) {
      error.payment = "Способ оплаты не выбран";
    }
    if (this.data.phone === "") {
      error.phone = "Номер телефона не заполнен";
    }
    if (this.data.address === "") {
      error.address = "Адрес не заполнен";
    }
    return error;
  }
}
