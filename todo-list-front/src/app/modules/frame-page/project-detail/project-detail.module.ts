import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectDetailComponent } from './project-detail.component';


@NgModule({
  declarations: [ProjectDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailRoutingModule
  ]
})
export class ProjectDetailModule { }
