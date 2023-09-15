import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

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
    const httpOptions = {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "69420",
      })
    };
    return this.http.post(`${this.url}/login`, data, httpOptions);
  }

  authRegister(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "69420",
      })
    };
    return this.http.post(`${this.url}/register`, data, httpOptions);
  }

}