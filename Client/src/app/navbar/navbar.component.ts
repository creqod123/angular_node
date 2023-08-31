import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  checkUser: any = false;
  userType: any;    // types
  link: any;

  constructor(private routes: Router, private auth: AuthService) {
    auth.checkTypes.subscribe((data) => {
      this.userType = data;
    })
    const a = localStorage.getItem('token');
    if (a !== null) {
      this.checkUser = true;
    }
  }

  logout() {
    this.checkUser = false;
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    window.location.href = "http://localhost:4200";
  }

  cart() {
    this.routes.navigate(['user/cart']);
  }

  home() {
    this.routes.navigate(['']);
  }

  order() {
    this.routes.navigate(['user/order']);
  }

  register() {
    this.routes.navigate(['register']);
  }
  login() {
    this.routes.navigate(['login']);
  }

}