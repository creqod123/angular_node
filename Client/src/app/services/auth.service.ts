import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  types = new BehaviorSubject<any>('');
  checkTypes = this.types.asObservable();

  constructor(private http: HttpClient) {
    const data = localStorage.getItem('type');
    this.types.next(data);
  }

  // url = `${environment.apiUrl}:${environment.port}`;
  url = `${environment.apiUrl}`;


  authLogin(data: any) {
    return this.http.post(`${this.url}/login`, data);
  }

  authRegister(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

}