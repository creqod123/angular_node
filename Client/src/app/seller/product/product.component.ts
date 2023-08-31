import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  allProduct: any = [];

  constructor(private sellservice: SellerService) {
    this.productGet();
  }

  productGet() {
    this.sellservice.homeProduct().subscribe((product: any) => {
      if (product.message === 'complete') {
        this.allProduct = product.data;
      }
    })
  }

}
