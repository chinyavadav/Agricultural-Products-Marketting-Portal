import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { Http } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  productName:string;
  products=[];
  constructor(public global: GlobalProvider, public navCtrl: NavController, public http: Http, public navParams: NavParams, public alertCtrl: AlertController) {
    this.productName=this.navParams.get('product');
    console.log(this.productName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.getProduct(this.productType);
  }
  productType = 'price';
  pushOrder(product){
    this.navCtrl.push(OrderPage,{'product':product});
  }


  getProduct(criteria: any) {
    if(criteria=="0" || criteria=="1" || criteria=="2"){
      var list=["price","latest","all"];
      criteria=list[criteria];
    }
    this.http.get(this.global.serverAddress+"api/produce.php?product="+this.productName+"&criteria="+criteria)
      .subscribe(data => {
        console.log(data["_body"]);
        this.products=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }
}
