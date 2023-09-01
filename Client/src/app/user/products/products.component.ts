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
  loader: any = true;

  constructor(private userData: UserService, private route: Router) {
    this.getHomeProduct()
  }

  getHomeProduct() {
    this.userData.homeProduct().subscribe((data: any) => {
      this.allProduct = data;
      this.allProduct = this.allProduct.data;
      this.loader = false;
    })
  }

  addToCart(data: any) {
    this.loader = true;
    const userChek = localStorage.getItem('token')
    if (userChek) {
      this.cartError = true;
      this.userData.addToCart(data).subscribe(() => {
        this.loader = false;
      });
    }
    else {
      this.route.navigate(['login']);
      this.cartError = false;
    }
  }
}
