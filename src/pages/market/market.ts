import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the MarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  products=[];
  total:number;
  productsURL:string;
  constructor(public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {
    if(this.global.loginState=="Farmer"){
      this.productsURL=this.global.serverAddress+"api/products.php?u=farmer"
    }else{
      this.productsURL=this.global.serverAddress+"api/products.php?u=buyer"
    }
    this.initializeProducts();
  }

  filterProducts(ev: any) {
    this.http.get(this.productsURL)
      .subscribe(data => {
        console.log(data["_body"]);
        let temp=JSON.parse(data["_body"]);
        this.products=temp.products;
        this.total=temp.total;
        let val = ev.target.value;
        if (val && val.trim() !== '') {
          this.products = this.products.filter((product) => {
            return ((product.fldproduct.toLowerCase().indexOf(val.toLowerCase()) > -1));
          })
        }
      }, error => {
        console.log("failed");
      }
    );
  }

  initializeProducts() {
    this.http.get(this.productsURL)
      .subscribe(data => {
        let temp=JSON.parse(data["_body"]);
        this.products=temp.products;
        this.total=temp.total;
      }, error => {
        console.log("failed");
      }
    );
  }

  pushProduct(product){
   this.navCtrl.push(ProductPage, {'product':product});
  }
  

}
