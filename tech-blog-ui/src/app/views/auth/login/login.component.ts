import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiAuthApiClient, AuthenticatedResult, LoginRequest } from 'src/app/api/admin-api.service.generated';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private authApiClient : AdminApiAuthApiClient, private alertService: AlertService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    const loginRequest : LoginRequest = new LoginRequest({
      userName: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value
    })
    this.authApiClient.login(loginRequest).subscribe({
      next: (res: AuthenticatedResult) => {
        // save access token and refresh token to localstorage
        this.router.navigate(['/dashboard']);
        this.alertService.showSuccess("Login success")
      },
      error: (err: any) => {
        console.log(err);
        this.alertService.showError('Login faild');
      }
    });
  }

}
