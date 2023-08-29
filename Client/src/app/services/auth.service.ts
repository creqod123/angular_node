import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../Client/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  url = `${environment.apiUrl}:${environment.port}`;

  authLogin(data: any) {
    return this.http.post(`${this.url}/login`, data);
  }

  authRegister(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

}