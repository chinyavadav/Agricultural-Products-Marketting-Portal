import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding,ToastController} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AddPage } from '../add/add';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the MyproducePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myproduce',
  templateUrl: 'myproduce.html',
})
export class MyproducePage {
  produces=[];
  constructor(public global:GlobalProvider, public toastCtrl:ToastController,public navCtrl: NavController, public http: Http, public navParams: NavParams, public alertCtrl: AlertController) {
    if(this.global.session==null){
    	this.navCtrl.pop();
    }
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MyproducePage');
    this.getProduce();
  }

  pushAdd(){
    this.navCtrl.push(AddPage);
  }


  getProduce() {
    this.http.get(this.global.serverAddress+"api/myproduce.php?phoneno="+this.global.session.fldphoneno)
      .subscribe(data => {
        console.log(data["_body"]);
        this.produces=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  delete(item: ItemSliding,product: string) {
    this.http.get(this.global.serverAddress+"api/deleteproduce.php?phoneno="+this.global.session.fldphoneno+"&product="+product)
      .subscribe(data => {
        console.log(data["_body"]);
        let response=JSON.parse(data["_body"]);
        if(response.response=="success"){
          let toast = this.toastCtrl.create({
            message: 'Produce was successfully deleted!',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
          this.getProduce();
        }else{
          let alert = this.alertCtrl.create({
            title: 'Produce',
            subTitle: 'Produce could not be deleted!',
            buttons: ['OK']
          });
          alert.present();
        }  
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Produce',
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
  chat(item: ItemSliding) {
    console.log('Chat');
    item.close();
  }
}
