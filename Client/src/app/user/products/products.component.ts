import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  allProduct: any = [];
  cartError: any;

  constructor(private userData: UserService, private route: Router) {
    userData.homeProduct().subscribe((data) => {
      this.allProduct = data;
      this.allProduct = this.allProduct.data;
    })
  }

  addToCart(data: any) {
    const userChek = localStorage.getItem('token')
    if (userChek) {
      this.cartError = true;
      this.userData.addToCart(data).subscribe();
    }
    else {
      this.route.navigate(['login']);
      this.cartError = false;
    }
  }
}
