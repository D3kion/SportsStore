import { Injectable } from '@angular/core';

import { Cart } from './cart.model';

@Injectable()
export class Order {
  public id: number | null = null;
  public name: string | null = null;
  public address: string | null = null;
  public city: string | null = null;
  public state: string | null = null;
  public zip: string | null = null;
  public country: string | null = null;
  public shipped: boolean = false;

  constructor(public cart: Cart) {}

  clear() {
    this.id =
      this.name =
      this.address =
      this.city =
      this.state =
      this.zip =
      this.country =
        null;
    this.shipped = false;
    this.cart.clear();
  }
}
