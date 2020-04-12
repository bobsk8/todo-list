import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramePageComponent } from './frame-page.component';
import { AuthGuard } from 'src/app/core/guars/auth.guard';


const routes: Routes = [
  {
    path: '', component: FramePageComponent,
    children: [
      { path: '', loadChildren: './project/project.module#ProjectModule',
      canLoad: [AuthGuard] },
      { path: 'new', loadChildren: './project-detail/project-detail.module#ProjectDetailModule',
      canLoad: [AuthGuard] },
      { path: ':id', loadChildren: './project-detail/project-detail.module#ProjectDetailModule',
      canLoad: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramePageRoutingModule { }
