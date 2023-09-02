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
  userType: any;
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

  register() {
    this.routes.navigate(['register']);
  }

  login() {
    this.routes.navigate(['login']);
  }

  logout() {
    this.checkUser = false;
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    window.location.href = "/login";
  }

  home() {
    this.routes.navigate([`${this.userType}/product`]);
  }

  order() {
    this.routes.navigate(['user/order']);
  }

  cart() {
    this.routes.navigate(['user/cart']);
  }

  sellProduct() {
    this.routes.navigate(['seller/product']);
  }

  add() {
    this.routes.navigate(['seller/add']);
  }

  sellOrder() {
    this.routes.navigate(['seller/sellorder']);
  }
}