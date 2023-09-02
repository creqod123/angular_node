import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';

import { ProductsComponent } from './user/products/products.component';
import { CartComponent } from './user/cart/cart.component';
import { OrderComponent } from './user/order/order.component';
import { AddComponent } from './seller/add/add.component';
import { SellorderComponent } from './seller/sellorder/sellorder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './seller/product/product.component';
import { SiteDetailComponent } from './admin/site-detail/site-detail.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user',
    children: [
      {
        path: 'product',
        component: ProductsComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ],
  },
  {
    path: 'seller',
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'sellorder',
        component: SellorderComponent
      }
    ],
  },
  {
    path: 'ceo',
    children: [
      {
        path: 'detail',
        component: SiteDetailComponent
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
