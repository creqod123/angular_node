import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartData: any = [];
  productMap = new Map();
  timeOnClick: boolean = false;
  validatingForm: any;
  loader: any = true;
  modalSH: any;

  constructor(private userCart: UserService) {
    this.validatingForm = new FormGroup({
      ModalName: new FormControl('', Validators.required),
      ModalEmail: new FormControl('', Validators.email),
      ModalPincode: new FormControl('', Validators.required),
      ModalAddress: new FormControl('', Validators.required)
    });
    this.loader = true;
    this.compressData();
  }

  addressCheck() {
    const checkLength = this.validatingForm.value.ModalPincode.toString().length;
    if (this.validatingForm.value.ModalName && this.validatingForm.value.ModalEmail && this.validatingForm.value.ModalAddress) {
      if (checkLength === 6 && this.validatingForm.value.ModalPincode >= 1)
        return false;
    }
    return true;
  }

  get ModalName() {
    return this.validatingForm.get('ModalName');
  }

  get ModalEmail() {
    return this.validatingForm.get('ModalEmail');
  }

  get ModalPincode() {
    return this.validatingForm.get('ModalPincode');
  }

  get ModalAddress() {
    return this.validatingForm.get('ModalAddress');
  }


  compressData() {
    this.userCart.cartDataShow().subscribe((product: any) => {
      const data = product.data.productCart;
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].productId._id === data[j].productId._id) {
            data[i].quantity += 1;
            data.splice(j, 1);
            j--;
          }
        }
      }
      this.cartData = data;
      this.loader = false;
    })
  }

  buttonDis(value1: any, value2: any) {
    return value1 - value2 === 0;
  }

  addProduct(value: any) {
    this.loader = true;
    this.userCart.addToCart(value).subscribe(() => {
      this.compressData();
    });
  }

  removeProduct(value: any) {
    this.loader = true;
    this.userCart.removeToCart(value).subscribe(() => {
      this.compressData();
    })
  }

  buyProduct() {
    this.loader = true;
    this.userCart.productBuy(this.cartData, this.validatingForm.value).subscribe(() => {
      this.compressData();
      this.modalSH.hide();
    })
  }

  modal(data: any) {
    this.modalSH = data;
    this.modalSH.show();
  }

}
