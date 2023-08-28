import { Component } from '@angular/core';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allProduct: any = []

  constructor(private userData: UserService) {
    userData.homeProduct().subscribe((data) => {
      this.allProduct = data
      this.allProduct = this.allProduct.data
    })
  }

  addToCart(data: any) {
    this.userData.addToCart(data).subscribe((data)=>{
      console.log("data",data)
    })
  }

}