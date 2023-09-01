import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  validatingForm: any;
  loader: any = false;

  constructor(private sellservice: SellerService) {
    this.validatingForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl(0),
    });
  }


  addressCheck() {
    if (this.validatingForm.value.productName && this.validatingForm.value.price) {
      return false;
    }
    return true;
  }

  get productName() {
    return this.validatingForm.get('productName');
  }

  get price() {
    return this.validatingForm.get('price');
  }

  get stock() {
    return this.validatingForm.get('stock');
  }

  add() {
    this.loader = true;
    if (this.validatingForm.value.stock === null) {
      this.validatingForm.value.stock = 0;
    }
    this.sellservice.addProduct(this.validatingForm.value).subscribe(() => {
      this.loader = false;
    })
  }

}
