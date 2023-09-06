import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  buyOrderProduct: any = [];
  headElements = ['NO', 'Product Name', 'Price', 'Quantity', 'Status', 'Address', 'Edit', 'Delete'];
  addressId: any;
  productId: any;
  validatingForm: any;
  validatingProduct: any;
  modalSH: any;

  constructor(private orderGet: UserService, private spinner: NgxSpinnerService) {
    this.spinner.show();

    // ==== address

    this.validatingForm = new FormGroup({
      ModalName: new FormControl('', Validators.required),
      ModalEmail: new FormControl('', Validators.email),
      ModalPincode: new FormControl('', Validators.required),
      ModalAddress: new FormControl('', Validators.required)
    });

    // ==== product update

    this.validatingProduct = new FormGroup({
      ModalPrice: new FormControl('', Validators.required),
      ModalQuantity: new FormControl('', Validators.required),
    });
    this.allOrderProduct();
  }

  allOrderProduct() {
    this.orderGet.buyOrderGet().subscribe((product: any) => {
      this.buyOrderProduct = product.data;
      this.spinner.hide();
    })
  }

  // ================= addresss update =================

  addressCheck() {
    const checkLength = this.validatingForm.value.ModalPincode.toString().length;
    if (this.validatingForm.value.ModalName && this.validatingForm.value.ModalEmail && this.validatingForm.value.ModalAddress) {
      if (checkLength === 6 && this.validatingForm.value.ModalPincode >= 1) {
        return false;
      }
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

  oldAddressId(item: any, data: any) {
    this.validatingForm.patchValue({
      ModalName: item.fullName,
      ModalEmail: item.email,
      ModalPincode: item.pincode,
      ModalAddress: item.address
    });
    this.modalSH = data;
    this.addressId = item._id;
    this.modalSH.show();
  }

  newAddress() {
    this.spinner.show();
    this.orderGet.addressEdit({ id: this.addressId, form: this.validatingForm.value }).subscribe(() => {
      this.allOrderProduct();
      this.modalSH.hide();
    });
  }

  // ========== Quantity update =============

  get ModalQuantity() {
    return this.validatingProduct.get('ModalQuantity');
  }

  get ModalPrice() {
    return this.validatingProduct.get('ModalPrice');
  }

  productCheck() {
    if (this.validatingProduct.value.ModalPrice >= 1 && this.validatingProduct.value.ModalQuantity >= 1) {
      return false;
    }
    return true;
  }

  oldProduct(item: any, data: any) {
    this.validatingProduct.patchValue({
      ModalPrice: item.price,
      ModalQuantity: item.quantity,
    });
    this.modalSH = data;
    this.productId = item._id;
    this.modalSH.show();
  }

  newProduct() {
    this.spinner.show();
    this.orderGet.productEdit(this.validatingProduct.value, this.productId).subscribe(() => {
      this.modalSH.hide();
      this.allOrderProduct();
    })
  }

  delete(data: any) {
    this.spinner.show();
    this.orderGet.orderDelete(data).subscribe(() => {
      this.allOrderProduct();
    });
  }

}
