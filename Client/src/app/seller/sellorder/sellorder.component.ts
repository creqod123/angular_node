import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sellorder',
  templateUrl: './sellorder.component.html',
  styleUrls: ['./sellorder.component.css']
})
export class SellorderComponent {
  buyOrderProduct: any = [];
  headElements = ['NO', 'User Name', 'Product Detail', 'Delete',];
  headElements2 = ['#', 'Product name', 'Price', 'Quantity', 'Status', 'Address', 'Pincode', 'Remove'];
  addressId: any;
  modalSH: any;
  modalSH2: any;
  allProductShow: any;
  cookieValue: string;


  getObjectKey(obj: any) {
    return Object.keys(obj);
  }
  constructor(private orderGet: SellerService, private cookieService: CookieService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.allOrderProduct();
  }

  allOrderProduct() {
    this.orderGet.buyOrderGet().subscribe((product: any) => {
      let data = product.data;
      let a = [];
      let swap;
      this.buyOrderProduct = [];

      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].userId == data[j].userId) {
            swap = data[i];
            data[i] = data[j];
            data[j] = swap;
          }
        }
      }

      for (let i = 0; i < data.length; i++) {
        const matchingItems = [data[i]];
        const name = data[i].addressId.fullName;
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].userId === data[j].userId) {
            matchingItems.push(data[j]);
            data.splice(j, 1);
            j--;
          }
        }
        const entry: any = {};
        entry[name] = matchingItems;
        this.buyOrderProduct.push(entry);
      }
      this.spinner.hide();
    })
  }

  showProduct(model: any, product: any, userName: any) {
    this.modalSH2 = model;
    this.modalSH2.show();
    this.allProductShow = product[userName];
  }

  singleProduct(data: any, option: any) {
    this.spinner.show();
    this.orderGet.productDel(data, option).subscribe(() => {
      this.modalSH2.hide();
      this.allOrderProduct();
    })
  }

}
