import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding,ToastController} from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';
import { Http } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
import { CallNumber } from '@ionic-native/call-number';
import { ChatService } from "../../providers/chat-service";
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders=[];
  supplier:any;
  constructor(public chatService:ChatService, public callNumber: CallNumber, public global:GlobalProvider, public toastCtrl:ToastController,public navCtrl: NavController, public http: Http, public navParams: NavParams, public alertCtrl: AlertController) {
    if(this.global.session==null){
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getOrder();
    this.chatService.getMsg();
  }

  call(item: ItemSliding,phoneno_farmer:string,phoneno_buyer:string){
    let phoneno="";
    if(phoneno_farmer!=this.global.session.fldphoneno){
      phoneno=phoneno_farmer;
    }else{
      phoneno=phoneno_buyer;
    }
    this.callNumber.callNumber("0"+phoneno, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    item.close();
  }

  getOrder() {
    let orderType;
    if(this.global.loginState=="Farmer"){
      orderType="sales";
    }else{
      orderType="purchase";
    }    
    this.http.get(this.global.serverAddress+"api/orders.php?phoneno="+this.global.session.fldphoneno+"&type="+orderType)
      .subscribe(data => {
        console.log(data["_body"]);
        this.orders=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  delete(item: ItemSliding,id: string,who: string) {
    this.http.get(this.global.serverAddress+"api/deleteorder.php?id="+id+"&who="+who)
      .subscribe(data => {
        let response=JSON.parse(data["_body"]);
        if(response.response=="success"){
          let toast = this.toastCtrl.create({
            message: 'Order was successfully deleted!',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
          this.getOrder();
        }else{
          let alert = this.alertCtrl.create({
            title: 'Order',
            subTitle: 'Order could not be deleted!',
            buttons: ['OK']
          });
          alert.present();
        }  
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Order',
          subTitle: 'Network Error! Connect to internet',
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      }
    );
    item.close();
  }

  show(phone){
    this.navCtrl.push(ProfilePage,{"phoneno":this.global.session.fldphoneno});
  }

  chat(item: ItemSliding,phoneno_farmer:string,phoneno_buyer:string) {
    var phoneno;
    if(phoneno_farmer!=this.global.session.fldphoneno){
      phoneno=phoneno_farmer;
    }else{
      phoneno=phoneno_buyer;
    }    
    this.http.get(this.global.serverAddress+"api/profile.php?phoneno="+phoneno)
      .subscribe(data => {
        let supplier=JSON.parse(data["_body"]);
        if(supplier.response=="success"){
          this.navCtrl.push(ChatPage,{'phoneno':supplier.fldphoneno, 'company':supplier.fldcompany, 'fullname': supplier.fldfirstname+" "+supplier.fldlastname, 'avatar': supplier.fldavatar});
        }
      }, error => {
      }
    );        
    item.close();
  }
}
