import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from './register.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  userForm: FormGroup;
  constructor(
    private router: Router,
    private registerService: RegisterService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup): void {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    const user = Object.assign(new User(), form.value);
    this.save(user);
  }

  save(user: User): void {
    this.registerService.register(user)
    .subscribe(resp => {
      alert('Salvo com sucesso!');
      this.router.navigate(['login']);
    }, err => alert(err.error.message));
  }

}
