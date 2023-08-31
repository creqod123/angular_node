import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './user/cart/cart.component';
import { OrderComponent } from './user/order/order.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // ========================= User =========================

  {
    path: '',
    component: HomeComponent
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
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'order',
        component: OrderComponent
      }
    ],
  },

  // ========================= Seller =========================

  // {
  //   path: 'seller',
  // },
  // {
  //   path: 'seller',
  //   canActivateChild: [() => {
  //     let check = false;
  //     if (localStorage.getItem('type') === 'seller') {
  //       check = true;
  //     }
  //     return check;
  //   }],
  //   children: [
  //     {
  //       path: 'cart',
  //     },
  //     {
  //       path: 'order',
  //       component: OrderComponent
  //     }
  //   ],
  // }

  // ========================= Admin =========================

  // {
  //   path: 'seller',
  // },
  // {
  //   path: 'seller',
  //   canActivateChild: [() => {
  //     let check = false;
  //     if (localStorage.getItem('type') === 'seller') {
  //       check = true;
  //     }
  //     return check;
  //   }],
  //   children: [
  //     {
  //       path: 'cart',
  //     },
  //     {
  //       path: 'order',
  //       component: OrderComponent
  //     }
  //   ],
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
