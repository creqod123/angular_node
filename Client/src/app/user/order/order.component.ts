import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  buyOrderProduct: any = [];
  headElements = ['NO', 'Product Name', 'Price', 'Quantity', 'Status', 'Address', 'Edit', 'Delete'];

  constructor(private orderGet: UserService) {
    this.allOrderProduct()
  }

  allOrderProduct() {
    this.orderGet.buyOrderGet().subscribe((product: any) => {
      this.buyOrderProduct = product.data;
      console.log('this', this.buyOrderProduct)
    })
  }

  address(item: any) {
    console.log(item)
  }

}
