import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  allProduct: any = [];
  validatingForm: any;
  productId: any;
  modalSH: any;

  constructor(private sellservice: SellerService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.validatingForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl(0, Validators.required),
    });
    this.productGet();
  }


  addressCheck() {
    if (this.validatingForm.value.productName && this.validatingForm.value.price && this.validatingForm.value.stock >= 0 && this.validatingForm.value.stock !== null) {
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

  productGet() {
    this.sellservice.homeProduct().subscribe((product: any) => {
      if (product.message === 'complete') {
        this.allProduct = product.data;
      }
      this.spinner.hide();
    })
  }

  modal(data: any, productDetail: any) {
    this.validatingForm.patchValue({
      productName: productDetail.productName,
      price: productDetail.price,
      stock: productDetail.stock
    });
    this.productId = productDetail._id;
    this.modalSH = data;
    data.show();
  }

  update() {
    this.spinner.show();
    if (this.validatingForm.value.stock === null) {
      this.validatingForm.value.stock = 0;
    }
    this.sellservice.updateProduct(this.validatingForm.value, this.productId).subscribe(() => {
      this.modalSH.hide();
      this.productGet();
    });
  }

  deleteModalCall(data: any, item: any) {
    this.productId = item._id;
    this.modalSH = data;
    this.modalSH.show();
  }

  productDelete() {
    this.spinner.show();
    this.modalSH.hide();
    this.sellservice.deleteProduct(this.productId).subscribe(() => {
      this.productGet();
    })
  }

}
