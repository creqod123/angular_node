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

  constructor(private http: HttpClient) { }

  homeProduct() {
    return this.http.get(this.url);
  }

  cartDataShow() {
    const userData = localStorage.getItem('token') || '{}';
    const httpOptions = {
      headers: new HttpHeaders({
        token: userData
      })
    };
    return this.http.get(`${this.url}/cart`, httpOptions);
  }

  addToCart(data: any) {
    const userData = localStorage.getItem('token') || '{}';
    const httpOptions = {
      headers: new HttpHeaders({
        token: userData
      })
    };
    return this.http.post(`${this.url}/cartSaved`, data, httpOptions);
  }

  removeToCart(data: any) {
    const userData = localStorage.getItem('token') || '{}';
    const httpOptions = {
      headers: new HttpHeaders({
        token: userData
      })
    };
    return this.http.post(`${this.url}/cartRemove`, { id: data }, httpOptions);
  }

  productBuy(data: any, address: any) {
    const userData = localStorage.getItem('token') || '{}';
    const httpOptions = {
      headers: new HttpHeaders({
        token: userData
      })
    };
    return this.http.post(`${this.url}/checkout`, { product: data, address: address }, httpOptions);
  }

  buyOrderGet() {
    const userData = localStorage.getItem('token') || '{}';
    const httpOptions = {
      headers: new HttpHeaders({
        token: userData
      })
    };
    return this.http.get(`${this.url}/order`, httpOptions);
  }

}
