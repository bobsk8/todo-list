import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramelessPageComponent } from './frameless-page.component';


const routes: Routes = [
  {
    path: '', component: FramelessPageComponent,
    children: [
      { path: '', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramelessPageRoutingModule { }
