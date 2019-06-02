import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyproducePage } from './myproduce';

@NgModule({
  declarations: [
    MyproducePage,
  ],
  imports: [
    IonicPageModule.forChild(MyproducePage),
  ],
})
export class MyproducePageModule {}
