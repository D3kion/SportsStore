import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getProducts().subscribe((data) => {
      this.products = data;
      this.categories = data
        .map((p) => p.category!)
        .filter((c, idx, arr) => arr.indexOf(c) === idx)
        .sort();
    });
  }

  getProducts(category: string | null = null): Product[] {
    return this.products.filter((p) => !category || p.category === category);
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }

  saveProduct(product: Product) {
    if (!product.id) {
      this.dataSource
        .saveProduct(product)
        .subscribe((p) => this.products.push(p));
      return;
    }

    this.dataSource.updateProduct(product).subscribe(() => {
      const idx = this.products.findIndex((p) => p.id === product.id);
      this.products.splice(idx, 1, product);
    });
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => {
      const idx = this.products.findIndex((p) => p.id === id);
      this.products.splice(idx, 1);
    });
  }
}
