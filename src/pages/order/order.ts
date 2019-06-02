import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';
import { OrdersPage } from '../orders/orders';
import { MapPage } from '../map/map';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { ChatService } from "../../providers/chat-service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
	product: any;
	qty:number;

  private orderForm: FormGroup;

	constructor(private formBuilder: FormBuilder, public chatService:ChatService, public global: GlobalProvider, public alertCtrl: AlertController, public storage:Storage, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public callNumber: CallNumber, public http: Http) {
		if(this.navParams.get('product')==null){
			this.navCtrl.pop();
		}else{
			this.product=this.navParams.get('product');
      var validators={"quantity":[Validators.required,Validators.min(0),Validators.max(1000000)]};
      this.orderForm=this.formBuilder.group({
        quantity: ['',validators.quantity]
      });
		}
	}

	call(number){
		this.callNumber.callNumber("0"+number, true)
  		.then(res => console.log('Launched dialer!', res))
  		.catch(err => console.log('Error launching dialer', err));
	}

  profile(phoneno){
    this.navCtrl.push(ProfilePage,{"phoneno":phoneno});
  }

	chat(supplier){
		this.navCtrl.push(ChatPage,{'phoneno':supplier.fldphoneno, 'company': supplier.fldcompany, 'fullname': supplier.fldfirstname+" "+supplier.fldlastname, 'avatar': supplier.fldavatar});
	}

  locate(){
    let phoneno=this.product.fldphoneno;
    this.navCtrl.push(MapPage,{'phoneno':phoneno});
  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad OrderPage');
    this.chatService.getMsg();
	}

	order(){
    if(this.orderForm.valid){
    	this.http.post(this.global.serverAddress+"api/order.php", JSON.stringify({farmer:this.product.fldphoneno ,buyer:this.global.session.fldphoneno, product:this.product.fldproduct, units: this.qty}))
          .subscribe(data => {
            console.log(data["_body"]);
            let response=JSON.parse(data["_body"]);
            if(response.response=="success"){
              let toast = this.toastCtrl.create({
                message: 'Order was successfull',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
              this.navCtrl.pop();
              this.navCtrl.push(OrdersPage,{'phoneno':this.global.session.fldphoneno});
            }else{
              let alert = this.alertCtrl.create({
                title: 'Order',
                subTitle: 'Order could not be processed!',
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
          }
        );
    }else{
        let alert = this.alertCtrl.create({
            title: 'Order',
            subTitle: 'Please enter order quantity!',
            buttons: ['RETRY']
        });
        alert.present();
    }
	}

}
