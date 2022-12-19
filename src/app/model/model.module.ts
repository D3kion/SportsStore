import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { ProductRepository } from './product.repository';
import { OrderRepository } from './order.repository';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    StaticDataSource,
    Cart,
    Order,
    ProductRepository,
    OrderRepository,
    { provide: StaticDataSource, useClass: RestDataSource },
  ],
})
export class ModelModule {}
