import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allProduct: any = []

  constructor(private userData: AuthService) {
    userData.users().subscribe((data) => {
      this.allProduct = data
      this.allProduct = this.allProduct.data
      console.log("data := ", this.allProduct)
    })
  }
}