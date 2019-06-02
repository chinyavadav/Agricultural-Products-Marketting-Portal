import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	account:any={};

	getProfile() {
		this.http.get(this.global.serverAddress+"api/profile.php?phoneno="+this.account.fldphoneno)
		  .subscribe(data => {
		    let response=JSON.parse(data["_body"]);
		    if(response.response=="success"){
		    	this.account=response;
		    }else{
				let alert = this.alertCtrl.create({
					title: 'Profile',
					subTitle: 'Account has been deleted or disabled! Contact System Admnistrator!',
					buttons: ['OK']
				});
		      	alert.present();
		    	this.navCtrl.setRoot(LoginPage);
		    	this.global.session=null;
		    	//this.menuCtrl.close();
		    }  
		  }, error => {
		      let alert = this.alertCtrl.create({
		        title: 'Profile',
		        subTitle: 'Please connect to the internet!',
		        buttons: ['OK']
		      });
		      alert.present();
		  }
		);
	}

	constructor(public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public storage: Storage, public menuCtrl: MenuController) {
		if(this.navParams.get("phoneno")==null){
			this.account=this.global.session;
		}else{
			this.account.fldphoneno=this.navParams.get("phoneno");
			this.getProfile();
		}		
	}

	updateFxn() {

	}



	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

}
