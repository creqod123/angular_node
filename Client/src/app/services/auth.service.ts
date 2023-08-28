import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:4500';

  authLogin(data: any) {
    return this.http.post(`${this.url}/login`, data)
  }

  authRegister(data: any) {
    return this.http.post(`${this.url}/register`, data)
  }

}