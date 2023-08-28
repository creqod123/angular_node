import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartData: any = [];
  constructor(private userCart: UserService) {

    
    userCart.cartDataShow().subscribe((product: any) => {
      this.cartData = product.data.productCart
    })

  }

}
