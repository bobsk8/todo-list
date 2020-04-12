import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramelessPageComponent } from './frameless-page.component';
import { RedirectLoggedGuard } from 'src/app/core/guars/redirect-logged.guard';


const routes: Routes = [
  {
    path: '', component: FramelessPageComponent,
    children: [
      { path: '', loadChildren: './login/login.module#LoginModule',
      canLoad: [RedirectLoggedGuard] },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramelessPageRoutingModule { }
