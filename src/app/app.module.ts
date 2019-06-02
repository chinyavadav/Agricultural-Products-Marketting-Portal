import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { File } from  '@ionic-native/file';
import { FileTransfer } from  '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { RelativeTimePipe } from '../pipes/relative-time/relative-time';
import { CallNumber } from '@ionic-native/call-number';

import { MyApp } from './app.component';
import { EmojiProvider } from '../providers/emoji';
import { ChatService } from '../providers/chat-service';


import { AddPage } from '../pages/add/add';
import { ChatPage } from '../pages/chat/chat';
import { ChatsPage } from '../pages/chats/chats';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MarketPage } from '../pages/market/market';
import { MapPage } from '../pages/map/map';
import { MyproducePage } from '../pages/myproduce/myproduce';
import { OrderPage } from '../pages/order/order';
import { OrdersPage } from '../pages/orders/orders';
import { ProducePage } from '../pages/produce/produce';
import { ProductPage } from '../pages/product/product';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { GlobalProvider } from '../providers/global/global';


@NgModule({
  declarations: [
    MyApp,
    AddPage,
    ChatPage,
    ChatsPage,
    EditprofilePage,
    HomePage,
    LoginPage,
    MarketPage,
    MapPage,
    MyproducePage,
    OrderPage,
    OrdersPage,
    ProducePage,
    ProductPage,
    ProfilePage,
    SignupPage,
    SettingsPage,
    RelativeTimePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    EmojiPickerModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    ChatPage,
    ChatsPage,
    EditprofilePage,
    HomePage,
    LoginPage,
    MarketPage,
    MapPage,
    MyproducePage,
    OrderPage,
    OrdersPage,
    ProducePage,
    ProductPage,
    ProfilePage,
    SignupPage,
    SettingsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    ChatService,
    CallNumber,
    GlobalProvider,
    Geolocation
  ]
})
export class AppModule {}
