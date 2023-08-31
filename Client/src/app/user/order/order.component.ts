import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  loader: any = true;

  constructor(private orderGet: UserService) {
    this.validatingForm = new FormGroup({
      ModalName: new FormControl('', Validators.required),
      ModalEmail: new FormControl('', Validators.email),
      ModalPincode: new FormControl('', Validators.required),
      ModalAddress: new FormControl('', Validators.required)
    });
    this.allOrderProduct();
  }

  addressCheck() {
    if (this.validatingForm.value.ModalName && this.validatingForm.value.ModalEmail && this.validatingForm.value.ModalPincode && this.validatingForm.value.ModalAddress) {
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

  allOrderProduct() {
    this.orderGet.buyOrderGet().subscribe((product: any) => {
      this.buyOrderProduct = product.data;
      this.loader = false;
    })
  }

  oldAddressId(item: any, data: any) {
    this.addressId = item;
    data.show();
  }

  newAddress() {
    this.loader = true;
    this.orderGet.addressEdit({ id: this.addressId, form: this.validatingForm.value }).subscribe(() => {
      this.allOrderProduct();
    });
  }

  delete(data: any) {
    this.loader = true;
    this.orderGet.orderDelete(data).subscribe(() => {
      this.allOrderProduct();
    });
  }

}
