import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  validatingForm: any;

  constructor(private sellservice: SellerService, private spinner: NgxSpinnerService) {
    this.validatingForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl(0, Validators.required),
    });
  }


  addressCheck() {
    if (this.validatingForm.value.productName && this.validatingForm.value.price >= 0 && this.validatingForm.value.price !== null && this.validatingForm.value.stock >= 0 && this.validatingForm.value.stock !== null) {
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
    this.spinner.show();
    if (this.validatingForm.value.stock === null) {
      this.validatingForm.value.stock = 0;
    }
    this.sellservice.addProduct(this.validatingForm.value).subscribe(() => {
      this.spinner.hide();
    })
  }

}
