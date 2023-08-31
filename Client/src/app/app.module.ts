import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { CartComponent } from './user/cart/cart.component';
import { OrderComponent } from './user/order/order.component';
import { AddComponent } from './seller/add/add.component';
import { SellorderComponent } from './seller/sellorder/sellorder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './seller/product/product.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent,
    OrderComponent,
    AddComponent,
    SellorderComponent,
    PageNotFoundComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
