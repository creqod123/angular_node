import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

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
  modalSH: any;

  constructor(private userCart: UserService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.validatingForm = new FormGroup({
      ModalName: new FormControl('', Validators.required),
      ModalEmail: new FormControl('', Validators.email),
      ModalPincode: new FormControl('', Validators.required),
      ModalAddress: new FormControl('', Validators.required)
    });
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
      let swap;
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].productId._id === data[j].productId._id) {
            data[i].quantity += 1;
            data.splice(j, 1);
            j--;
          }
        }
      }

      console.log(data);

      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].productId.productName > data[j].productId.productName) {
            swap = data[j];
            data[j] = data[i];
            data[i] = swap;
          }
        }
      }

      this.cartData = data;
      this.spinner.hide();
    })
  }

  buttonDis(value1: any, value2: any) {
    return value1 - value2 === 0;
  }

  addProduct(value: any) {
    this.spinner.show();
    this.userCart.addToCart(value).subscribe(() => {
      this.compressData();
    });
  }

  removeProduct(value: any) {
    this.spinner.show();
    this.userCart.removeToCart(value).subscribe(() => {
      this.compressData();
    })
  }

  buyProduct() {
    this.spinner.show();
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
