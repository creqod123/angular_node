{
    "email":"helloworld123@gmail.com",
    "productName":"Iphone 13",
    "price":123456
}

========================================== loader ==========================================

import { NgxSpinnerService } from "ngx-spinner";
private spinner: NgxSpinnerService
<ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="large" color="#fff" type="square-spin" [fullScreen]="true">
    <p style="color: white"> Loading... </p>
</ngx-spinner>
