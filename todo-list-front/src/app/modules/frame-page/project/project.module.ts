import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { CardComponent } from '../components/card/card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectComponent, CardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
