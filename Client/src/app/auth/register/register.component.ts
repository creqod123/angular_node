import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
        if (data.type === 'ceo') {
          window.location.href = `${data.type}/detail`;
        }
        else {
          window.location.href = `${data.type}/product`;
        }
      }
      else {
        console.log("errorMessage", data.message);
      }
    })
  }
}