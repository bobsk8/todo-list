import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/modules/frameless-page/login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.user = this.loginService.getUserSession();
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
