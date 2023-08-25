import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  checkUser: any = false;
  link: any;
  constructor() {
    const a = localStorage.getItem('user');
    if (a !== null) {
      this.checkUser = true;
    }
  }

  logout() {
    this.checkUser = false;
    localStorage.removeItem('user')
  }

}