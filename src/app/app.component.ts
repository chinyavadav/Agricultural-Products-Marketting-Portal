import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';
import { MyproducePage } from '../pages/myproduce/myproduce';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { GlobalProvider } from "../providers/global/global";
@Component({
  templateUrl: 'app.html'
})
//ionic cordova build android --prod --release
export class MyApp {
  @ViewChild(Nav) navCtrl;
  rootPage:any;
  constructor(public global: GlobalProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, public storage: Storage) {
    platform.ready().then(() => {      
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
    });
    statusBar.styleDefault();
    splashScreen.hide();
  }
  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage; 
      this.global.loginState="Login";  
    }else{
      if(this.global.session.fldtype=='Buyer'){
        this.global.loginState="Buyer";
      }else{
        this.global.loginState="Farmer";
      } 
      this.rootPage = HomePage;    
    }
  }
  setServerAddress(val){
    this.global.serverAddress=val;
    console.log(val);
  }
  openPage(index){
    var pages=[MyproducePage,OrdersPage,ProfilePage,SettingsPage];
    this.navCtrl.push(pages[index]);
    console.log(pages[index]);
  }
  logout(){
    this.storage.remove("session");    
    this.global.session=null;
    this.navCtrl.setRoot(LoginPage);
  }
}


