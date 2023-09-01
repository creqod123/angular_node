import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../Client/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  url = `${environment.apiUrl}:${environment.port}/seller`;
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
    return this.http.get(`${this.url}`, httpOptions);
  }

  updateProduct(data: any, id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.post(`${this.url}/update`, { id: id, form: data }, httpOptions);
  }

  deleteProduct(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.post(`${this.url}/remove`, { id: id }, httpOptions);
  }

  addProduct(form: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: this.userData,
      })
    };
    return this.http.post(`${this.url}/add`, form, httpOptions);
  }

}
