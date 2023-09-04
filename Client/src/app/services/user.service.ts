import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../Client/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginCheck: any = false;
  url = `${environment.apiUrl}:${environment.port}/user`;
  userData: any;

  constructor(private http: HttpClient) {
    this.userData = localStorage.getItem('token') || '{}';
  }

  homeProduct() {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.get(this.url, httpOptions);
  }

  cartDataShow() {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.get(`${this.url}/cart`, httpOptions);
  }

  addToCart(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.post(`${this.url}/cartSaved`, data, httpOptions);
  }

  removeToCart(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.post(`${this.url}/cartRemove`, { id: data }, httpOptions);
  }

  productBuy(data: any, address: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.post(`${this.url}/checkout`, { product: data, address: address }, httpOptions);
  }

  buyOrderGet() {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.get(`${this.url}/order`, httpOptions);
  }

  addressEdit(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.post(`${this.url}/orderupdate`, data, httpOptions);
  }

  orderDelete(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    data = { id: data };
    return this.http.post(`${this.url}/orderDelete`, data, httpOptions);
  }

}
