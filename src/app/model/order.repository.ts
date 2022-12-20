import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from './order.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded: boolean = false;

  constructor(private dataSource: RestDataSource) {}

  loadOrders() {
    this.dataSource.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.loaded = true;
    });
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe((order) => {
      const idx = this.orders.findIndex((o) => o.id === order.id);
      this.orders.splice(idx, 1, order);
    });
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe(() => {
      const idx = this.orders.findIndex((o) => o.id === id);
      this.orders.splice(idx, 1);
    });
  }
}
