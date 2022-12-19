import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';

@Component({
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css'],
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(public repository: OrderRepository, public order: Order) {}

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (!form.valid) return;

    this.repository.saveOrder(this.order).subscribe(() => {
      this.order.clear();
      this.orderSent = true;
      this.submitted = false;
    });
  }
}
