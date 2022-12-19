import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: StaticDataSource) {
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
}
