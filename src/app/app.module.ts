import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { StoreFirstGuard } from './storeFirst.guard';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutComponent } from './store/checkout.component';
import { StoreComponent } from './store/store.component';
import { StoreModule } from './store/store.module';

const routes: Route[] = [
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'cart',
    component: CartDetailComponent,
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [StoreFirstGuard],
  },
  { path: '**', redirectTo: '/store' },
];

@NgModule({
  imports: [BrowserModule, StoreModule, RouterModule.forRoot(routes)],
  providers: [StoreFirstGuard],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
