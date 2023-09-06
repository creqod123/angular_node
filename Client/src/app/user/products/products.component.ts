import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  allProduct: any = [];
  cartError: any;

  constructor(private userData: UserService, private route: Router, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.getHomeProduct()
  }

  getHomeProduct() {
    this.userData.homeProduct().subscribe((data: any) => {
      this.allProduct = data;
      this.allProduct = this.allProduct.data;
      this.spinner.hide();
    })
  }

  addToCart(data: any) {
    this.spinner.show();
    const userChek = localStorage.getItem('token')
    if (userChek) {
      this.cartError = true;
      this.userData.addToCart(data).subscribe(() => {
        this.spinner.hide();
      });
    }
    else {
      this.route.navigate(['login']);
      this.cartError = false;
    }
  }
}
