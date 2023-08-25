import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoginCheck: any = false;
  url = 'http://localhost:4500/user';
  constructor(private http: HttpClient) { }
  users() {
    return this.http.get(this.url)
  }
}
