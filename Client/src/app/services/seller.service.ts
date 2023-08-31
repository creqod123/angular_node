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

    console.log('first', this.userData);
    console.log('second', `${this.url}/admin`);

    return this.http.get(`${this.url}`, httpOptions);
  }

}
