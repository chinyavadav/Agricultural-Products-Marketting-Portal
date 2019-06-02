import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MarketPage } from '../market/market';
import { ChatsPage } from '../chats/chats';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	marketPage=MarketPage;
	chatsPage=ChatsPage;
	constructor(public storage:Storage, public global:GlobalProvider,public navCtrl: NavController) {

	}
}
