import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  loader: any = true;

  constructor(private sellservice: SellerService) {
    this.validatingForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      stock: new FormControl(Number, Validators.required),
    });
    this.productGet();
  }


  addressCheck() {
    if (this.validatingForm.value.productName && this.validatingForm.value.price && this.validatingForm.value.stock) {
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
      this.loader = false;
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
    this.loader = true;
    this.sellservice.updateProduct(this.validatingForm.value, this.productId).subscribe(() => {
      this.modalSH.hide();
      this.productGet();
    });
  }

  Delete() {
    console.log('delete');
  }

}
