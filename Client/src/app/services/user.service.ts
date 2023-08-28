import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginCheck: any = false;
  url = 'http://localhost:4500/user';
  userData = localStorage.getItem('token') || '{}';

  constructor(private http: HttpClient) { }

  homeProduct() {
    return this.http.get(this.url)
  }

  cartDataShow(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData
      })
    };
    return this.http.get(`${this.url}/cart`, httpOptions)
  }

  addToCart(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData
      })
    };
    return this.http.post(`${this.url}/cartSaved`, data, httpOptions)
  }

}
