import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
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
  validatingForm: any;
  modalSH: any;

  constructor(private orderGet: UserService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.validatingForm = new FormGroup({
      ModalName: new FormControl('', Validators.required),
      ModalEmail: new FormControl('', Validators.email),
      ModalPincode: new FormControl('', Validators.required),
      ModalAddress: new FormControl('', Validators.required)
    });
    this.allOrderProduct();
  }

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

  allOrderProduct() {
    this.orderGet.buyOrderGet().subscribe((product: any) => {
      this.buyOrderProduct = product.data;
      this.spinner.hide();
    })
  }

  oldAddressId(item: any, data: any) {
    this.modalSH = data;
    this.addressId = item;
    this.modalSH.show();
  }

  newAddress() {
    this.spinner.show();
    this.orderGet.addressEdit({ id: this.addressId, form: this.validatingForm.value }).subscribe(() => {
      this.allOrderProduct();
      this.modalSH.hide();
    });
  }

  delete(data: any) {
    this.spinner.show();
    this.orderGet.orderDelete(data).subscribe(() => {
      this.allOrderProduct();
    });
  }

}
