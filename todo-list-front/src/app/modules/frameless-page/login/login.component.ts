import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { LoginModel } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: any) {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    const loginModel = Object.assign(new LoginModel(), form.value);
    this.login(loginModel);
  }

  login(loginModel: LoginModel) {
    this.loginService.login(loginModel)
    .subscribe(resp => {
      this.loginService.setCurrentUserSession(resp.user, resp.token);
    });
  }

}
