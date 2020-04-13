import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FramePageRoutingModule } from './frame-page-routing.module';
import { FramePageComponent } from './frame-page.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [FramePageComponent, MenuComponent],
  imports: [
    CommonModule,
    FramePageRoutingModule
  ]
})
export class FramePageModule { }
