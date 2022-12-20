import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './product.model';
import { Order } from './order.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  authToken: string | null = null;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  authenticate(name: string, password: string) {
    const payload = { name, password };
    return this.http
      .post<{ success: boolean; token?: string }>(
        this.baseUrl + 'login',
        payload
      )
      .pipe(
        map((res) => {
          this.authToken = res.success ? res.token! : null;
          return res.success;
        })
      );
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.baseUrl + 'products',
      product,
      this.getOptions()
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      this.baseUrl + 'products/' + product.id,
      product,
      this.getOptions()
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      this.baseUrl + 'products/' + id,
      this.getOptions()
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'orders', this.getOptions());
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      this.baseUrl + 'orders/' + order.id,
      order,
      this.getOptions()
    );
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(
      this.baseUrl + 'orders/' + id,
      this.getOptions()
    );
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer<${this.authToken}>` }),
    };
  }
}
