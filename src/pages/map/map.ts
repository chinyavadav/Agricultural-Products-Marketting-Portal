import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	toast:any;
	directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
	account:any={
	};

    
	constructor(public global:GlobalProvider, public http: Http, public alertCtrl: AlertController, public toastCtrl:ToastController,public storage: Storage,public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {		
		if(this.navParams.get("phoneno")==null){
			this.navCtrl.pop();
		}else{
			let phoneno=navParams.get('phoneno');
			this.getProfile(phoneno);
		}
	}

	getProfile(phoneno) {
		this.http.get(this.global.serverAddress+"api/profile.php?phoneno="+phoneno)
		  .subscribe(data => {
		    let response=JSON.parse(data["_body"]);
		    if(response.response=="success"){
		    	this.account=response;
		    }else{
		    	this.makeToast("Please connect to the internet!");
		    	this.navCtrl.pop();
		    }  
		  }, error => {
				this.makeToast("Please connect to the internet!");
				this.navCtrl.pop();
		  }
		);
	}

	ionViewDidEnter() {
    	this.initMap();
	}

	makeToast(message:string){
	    this.toast = this.toastCtrl.create({
	      message: message,
	      duration: 3000,
	      position: 'bottom',
	      cssClass: 'dark-trans',
	      closeButtonText: 'OK',
	      showCloseButton: true
	    });
	    this.toast.present();
	}

    calculateAndDisplayRoute(directionsService, directionsDisplay,from,dest) {
        directionsService.route({
          origin: from,
          destination: dest,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
          	window.alert('Destination not found! (' + status+')');
          }
        });
    }

	initMap() {
		//timeout: 5000
		this.geolocation.getCurrentPosition({ maximumAge: 3000, enableHighAccuracy: true }).then((resp) => {
			let current = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
			this.map = new google.maps.Map(this.mapElement.nativeElement, {
		  		zoom: 20,
		  		center: current,
		  		mapTypeId: 'roadmap'
			});
			this.directionsDisplay.setMap(this.map);
        	let destination = new google.maps.LatLng(this.account.fldlat,this.account.fldlng);
			this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay,current,destination)
		}, err => {
			this.makeToast("Error: "+err.message);
		});
	}

	addMarker(location, data:any) {
		var infowindow = new google.maps.InfoWindow({
          content: data.contentString
        });
	  	let marker = new google.maps.Marker({
		    position: location,
		    map: this.map
	    });

        marker.addListener('click', function() {
			infowindow.open(this.map, marker);
			setTimeout(function(){
				infowindow.close();
			},5000);      
        });
	}
}
