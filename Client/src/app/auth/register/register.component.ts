import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  registervalid = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  })

  register() {
  }

  get user(){
    return this.registervalid.get('user')
  }

  get email(){
    return this.registervalid.get('email')
  }

  get password(){
    return this.registervalid.get('password')
  }

}
