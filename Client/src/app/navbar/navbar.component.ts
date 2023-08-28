import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  checkUser: any = false;
  link: any;
  constructor(private routes: Router) {
    const a = localStorage.getItem('userDatas');
    if (a !== null) {
      this.checkUser = true;
    }
  }

  logout() {
    this.checkUser = false;
    localStorage.removeItem('userDatas')
  }

  cart() {
    this.routes.navigate(['user/cart'])
  }

  home() {
    this.routes.navigate([''])
  }

  register() {
    this.routes.navigate(['register'])
  }
  login() {
    this.routes.navigate(['login'])
  }

}