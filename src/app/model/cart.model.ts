import { Injectable } from '@angular/core';

import { Product } from './product.model';

@Injectable()
export class Cart {
  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;

  addLine(product: Product, quantity: number = 1) {
    const line = this.lines.find((line) => line.product.id === product.id);
    if (!line) {
      this.lines.push(new CartLine(product, quantity));
    } else {
      line.quantity += quantity;
    }
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: string | number) {
    const line = this.lines.find((line) => line.product.id === product.id);
    if (!line) return;
    line.quantity = Number(quantity);
    this.recalculate();
  }

  removeLine(id: number) {
    const idx = this.lines.findIndex((line) => line.product.id === id);
    this.lines.splice(idx, 1);
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach((l) => {
      const price = l.product.price || 0;
      this.itemCount += l.quantity;
      this.cartPrice += l.quantity * price;
    });
  }
}

export class CartLine {
  constructor(public product: Product, public quantity: number) {}

  get lineTotal() {
    const price = this.product.price || 0;
    return this.quantity * price;
  }
}
