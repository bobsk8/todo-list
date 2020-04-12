import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramePageComponent } from './frame-page.component';


const routes: Routes = [
  {
    path: '', component: FramePageComponent,
    children: [
      { path: '', loadChildren: './project/project.module#ProjectModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramePageRoutingModule { }
