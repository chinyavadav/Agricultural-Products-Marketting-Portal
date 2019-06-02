import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { RelativeTimePipe } from "../../pipes/relative-time/relative-time";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    OrdersPage,
    RelativeTimePipe
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    PipesModule
  ],
})
export class OrdersPageModule {}
