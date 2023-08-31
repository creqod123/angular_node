import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './user/cart/cart.component';
import { OrderComponent } from './user/order/order.component';
import { AddComponent } from './seller/add/add.component';
import { SellorderComponent } from './seller/sellorder/sellorder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './seller/product/product.component';

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
    path: 'user',
    canActivateChild: [() => {
      let check = false;
      if (localStorage.getItem('type') === 'user') {
        check = true;
      }
      return check;
    }],
    children: [
      {
        path: 'product',
        component: HomeComponent
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
    canActivateChild: [() => {
      let check = false;
      if (localStorage.getItem('type') === 'seller') {
        check = true;
      }
      return check;
    }],
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
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
