import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginAuth: any;
  loginError: any;
  constructor(private authData: AuthService, private router: Router) { }

  login(value: any) {
    this.authData.authLogin(value).subscribe((data: any) => {
      if (data.message === 'complete') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('type', data.type);
        const targetRoute = '';
        this.router.navigate([targetRoute]);
      }
      else {
        this.loginError = data.message;
        console.log("error message", this.loginError);
      }
    })
  }
}
