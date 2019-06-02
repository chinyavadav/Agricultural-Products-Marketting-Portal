import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { MyproducePage } from '../myproduce/myproduce';


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
	private addProduceForm: FormGroup;
    submitAttempt: boolean = false;
    products:any;
	constructor(public alertCtrl:AlertController, private http: Http, private formBuilder: FormBuilder, public navCtrl: NavController,public navParams: NavParams,private global:GlobalProvider) {
		
		var validators={
			"unit":[Validators.required,Validators.pattern("[A-Za-z]{1,20}")],
			"comment":[Validators.maxLength(100)],
			"cost":[Validators.required,Validators.min(0)]
		};
		this.addProduceForm=this.formBuilder.group({
			phoneno: ['',Validators.required],
			name: ['', Validators.required],
			cost: ['', validators.cost],
			unit: ['',validators.unit],
			comment: ['',validators.comment]
		});	
	}

	ionViewDidLoad() {
		this.getProduce();
	}

	addProduce(){
		if(this.addProduceForm.valid){
			this.http.post(this.global.serverAddress+"/api/addproduce.php", JSON.stringify(this.addProduceForm.value))
		      .subscribe(data => {
		        console.log(data["_body"]);
		        let response = JSON.parse(data["_body"]); 
		        if(response.response=="success"){
		           let alert = this.alertCtrl.create({
		              title: 'Produce',
		              subTitle: 'Produce successfully created!',
		              buttons: ['OK']
		          });
		          alert.present();
		          this.navCtrl.popTo(MyproducePage);
		        }else{
		          let alert = this.alertCtrl.create({
		              title: 'Produce',
		              subTitle: 'Produce could not be added!',
		              buttons: ['OK']
		          });
		          alert.present();

		       }
		      }, error => {
		        console.log("Oooops!");
		      }
		    );
		}else{
			let alert = this.alertCtrl.create({
		        title: 'Produce',
		        subTitle: 'Please enter valid form data!',
		        buttons: ['RETRY']
		    });
		    alert.present();
		}
	}

	getProduce(){
		this.http.get(this.global.serverAddress+"api/products.php?u=buyer")
	      .subscribe(data => {
	        console.log(data["_body"]);
	        this.products=JSON.parse(data["_body"]).products;
	      }, error => {
	        console.log("failed");
	      }
	    );
	}

}
