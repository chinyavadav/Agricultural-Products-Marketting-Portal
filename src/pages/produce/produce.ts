import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the ProducePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produce',
  templateUrl: 'produce.html',
})
export class ProducePage {
	produceName:string;
  produce=[];
	constructor(public global: GlobalProvider,public navCtrl: NavController, public http: Http, public navParams: NavParams, public alertCtrl: AlertController) {
    if(this.navParams.get('produce')!=null){
      this.produceName=this.navParams.get('produce');
    }else{
      this.navCtrl.pop();
    }
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProducePage');
  }
  produceType = 'Trending';
  pushProduce(produce){
  	console.log(produce);
  }


  getProduce(type: any) {
    this.http.get(this.global.serverAddress+"api/produce.php?product="+this.produceName+"&criteria=all")
      .subscribe(data => {
        console.log(data["_body"]);
        this.produce=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
    return this.produce;//[type]
  }
}
