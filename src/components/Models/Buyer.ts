import { IBuyer, TPayment, ValidationErrors } from "../../types/index.ts";

export class Buyer {
  protected data: IBuyer = {
    payment: TPayment.Default,
    email: "",
    phone: "",
    address: "",
  };

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
    const errors: ValidationErrors = {};

    if (this.data.email === "") {
      errors.email = "Email не заполнен";
    }
    if (this.data.payment === TPayment.Default) {
      errors.payment = "Способ оплаты не выбран";
    }
    if (this.data.phone === "") {
      errors.phone = "Номер телефона не заполнен";
    }
    if (this.data.address === "") {
      errors.address = "Адрес не заполнен";
    }
    return errors;
  }
}
