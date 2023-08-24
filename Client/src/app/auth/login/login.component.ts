import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  validatingForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  login() {
    console.warn("check :- ",this.validatingForm.value)
  }

  get email(){
    return this.validatingForm.get('email')
  }
  get password(){
    return this.validatingForm.get('password')
  }

}
