import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditprofilePage } from '../editprofile/editprofile';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	newaddress:string;
  loader:any;
  private settingsForm: FormGroup;
	constructor(public loadingCtrl:LoadingController, private geolocation:Geolocation, private formBuilder: FormBuilder,public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController, public storage: Storage) {
        this.newaddress=this.global.serverAddress;
        var address_validators=[Validators.required,Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')];
        this.settingsForm=this.formBuilder.group({
            address: ['',address_validators]
        });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

    pushProfile(){
        this.navCtrl.push(EditprofilePage);
    }

    submit(mydata:any){
        this.http.post(this.global.serverAddress+"/api/location.php", JSON.stringify(mydata))
          .subscribe(data => {
            console.log(data["_body"]);
            let response = JSON.parse(data["_body"]);
            if(response.response=="success"){
               let alert = this.alertCtrl.create({
                  title: 'Settings',
                  subTitle: 'Location has been successfully updated!',
                  buttons: ['OK']
              });
               this.global.session.fldlat=mydata["lat"];
               this.global.session.fldlng=mydata["lng"];
               this.storage.set("session",this.global.session);
              alert.present();
            }else{
              let alert = this.alertCtrl.create({
                  title: 'Settings',
                  subTitle: "Location could not be updated!",
                  buttons: ['OK']
              });
              alert.present();
           }
           this.loader.dismiss();
          }, error => {
              let toast = this.toastCtrl.create({
                message: 'Please connect to Internet!',
                duration: 3000,
                position: 'bottom',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
              this.loader.dismiss();
          }      
        );
    }

    updateLocation(){
        let alert = this.alertCtrl.create({
          title: 'Settings',
          subTitle: 'Do you want update location?',
          buttons: [
            { text:'YES', handler: ()=>{
                this.loader = this.loadingCtrl.create({
                  content: "Updating...",
                  spinner:"bubbles"
                });
                this.loader.present();
                this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
                  let data = {
                    lat:resp.coords.latitude,
                    lng:resp.coords.longitude,
                    phoneno:this.global.session.fldphoneno
                  };
                  console.log(data);
                  this.submit(data);
                }, err => {
                  let toast = this.toastCtrl.create({
                    message: "Error: "+err.message,
                    duration: 3000,
                    position: 'bottom',
                    cssClass: 'dark-trans',
                    closeButtonText: 'OK',
                    showCloseButton: true
                  });
                  toast.present();
                  this.loader.dismiss();
                });
              }
            },
          { text: 'NO' }
          ]
        });
        alert.present();
    }

	updateSettings(){
        if(this.settingsForm.valid){
    		let toast = this.toastCtrl.create({
                message: 'Settings have been updated',
                duration: 3000,
                position: 'bottom',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
            });
            toast.present();
            this.storage.set("serverAddress",this.newaddress);
            this.global.serverAddress=this.newaddress;
        }
	}

}
