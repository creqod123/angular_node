import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginAuth: any;
  loginError: any;
  constructor(private authData: AuthService) { }

  login(value: any) {
    this.authData.authLogin(value).subscribe((data: any) => {
      if (data.message === 'complete') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('type', data.type);
        if (data.type === 'ceo') {
          window.location.href = `${data.type}/detail`;
          
        }
        else {
          window.location.href = `${data.type}/product`;
        }
      }
      else {
        this.loginError = data.message;
        console.log("error message", this.loginError);
      }
    })
  }
}
