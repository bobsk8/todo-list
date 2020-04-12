import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramePageComponent } from './frame-page.component';


const routes: Routes = [
  {
    path: '', component: FramePageComponent,
    children: [
      { path: '', loadChildren: './project/project.module#ProjectModule' },
      { path: 'new', loadChildren: './project-detail/project-detail.module#ProjectDetailModule' },
      { path: ':id', loadChildren: './project-detail/project-detail.module#ProjectDetailModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramePageRoutingModule { }
