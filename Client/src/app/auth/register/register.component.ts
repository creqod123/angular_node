import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  constructor(private registerData: AuthService, private router: Router) { }

  register(value: any) {
    this.registerData.authRegister(value).subscribe((data: any) => {
      if (data.message === 'complete') {
        localStorage.setItem('type', data.type);
        localStorage.setItem('token', data.token);
        window.location.href = `${data.type}`;
      }
      else {
        console.log("errorMessage", data.message);
      }
    })
  }
}