import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ItemSliding, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';
import { UserInfo, ChatService } from "../../providers/chat-service";
import { GlobalProvider } from "../../providers/global/global";
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
	chats=[];
	externalAccount :UserInfo;
	constructor(public alertCtrl:AlertController,public callNumber: CallNumber, public chatService:ChatService,public global:GlobalProvider, public navCtrl: NavController,public loadingCtrl:LoadingController, public navParams: NavParams, public http: Http) {
		if(this.global.session==null){
			this.navCtrl.pop();
		}
	}

	profile(item: ItemSliding,phoneno:string){
		this.navCtrl.push(ProfilePage,{"phoneno":phoneno});
		item.close();
	}

	filterChats(ev: any) {
		this.http.get(this.global.serverAddress+'api/chats.php?phoneno='+this.global.session.fldphoneno)
		  .subscribe(data => {
		    this.chats=JSON.parse(data["_body"]);
		   	let val = ev.target.value;
		    if (val && val.trim() !== '') {
		      this.chats = this.chats.filter((chat) => {
		          return ((chat.company.toLowerCase().indexOf(val.toLowerCase()) > -1));
		      })
		    }
		  }, error => {
		    console.log("failed");
		  }
		);
  	}



	isNetwork(network:any,phone:string){
		for(var i=0;i<network.length;i++){
			if(network[i].indexOf(phone.substr(0,2))>-1){
				return true;
			}		
		}
		return false;
	}

	pay(item: ItemSliding,phoneno:string){
		var ecocash=["78","77"];
		var shortcode;
		if(this.isNetwork(ecocash,phoneno)){
			shortcode="*151*1*1*0"+phoneno+"#";
		}else{
			let alert = this.alertCtrl.create({
				title: 'Payment',
				subTitle: 'Network not supported!',
				buttons: ['OK']
			});
			alert.present();
		}
		this.callNumber.callNumber(shortcode, true)
		  .then(res => console.log('Launched dialer!', res))
		  .catch((err) =>{
		  	let alert = this.alertCtrl.create({
				title: 'Payment',
				subTitle: 'Dialer Error: '+err,
				buttons: ['OK']
			});
			alert.present();
		  });
		item.close();
	}

	ionViewDidEnter() {
		this.initializeChats();
	}

	initializeChats() {
		this.http.get(this.global.serverAddress+'api/chats.php?phoneno='+this.global.session.fldphoneno)
		  .subscribe(data => {
		    this.chats=JSON.parse(data["_body"]);
		  }, error => {
		    console.log("failed");
		  }
		);
		this.chatService.getMsg();
	}
	pushChat(chat){
		this.navCtrl.push(ChatPage, {'phoneno':chat.phoneno, 'company': chat.company, 'fullname': chat.fullname, 'avatar': chat.avatar});
	}
}
