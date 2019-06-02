import { Component, ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ProfilePage } from '../profile/profile';
import { CallNumber } from '@ionic-native/call-number';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  //msgList: ChatMessage[] = [];
  externalAccount: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;
  chat:any;
  constructor(public callNumber: CallNumber,public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams,private chatService: ChatService,private events: Events) {
    if(navParams.get('phoneno')==null || navParams.get('company')==null){
      this.externalAccount={
        phoneno: '',
        company: '',
        avatar: ''
      }
      this.navCtrl.pop();
    }else{
      this.externalAccount={
        phoneno: navParams.get('phoneno'),
        company: navParams.get('company'),
        avatar: navParams.get('avatar')
      }
    }
  }

  locate(){
      this.navCtrl.push(MapPage,{'phoneno':this.externalAccount.phoneno});
  }

  call(){
    let number=this.externalAccount.phoneno;
    this.callNumber.callNumber("0"+number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  viewProfile(phoneno:string){
    this.navCtrl.push(ProfilePage,{"phoneno":phoneno});
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    });
    this.chatService.getMsg();
    this.chat=this.chatService.msgList.filter((message)=> (message.toUserId==this.global.session.fldphoneno && message.userId==this.externalAccount.phoneno) || (message.userId==this.global.session.fldphoneno && message.toUserId==this.externalAccount.phoneno));
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();}

        this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.externalAccount.phoneno,
      userName: this.externalAccount.company,
      userAvatar: this.externalAccount.avatar,
      toUserId: this.global.session.fldphoneno,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }
    this.chatService.sendMsg(newMsg);
    this.chat=this.chatService.msgList.filter((message)=> (message.toUserId==this.global.session.fldphoneno && message.userId==this.externalAccount.phoneno) || (message.userId==this.global.session.fldphoneno && message.toUserId==this.externalAccount.phoneno));
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    const userId = this.externalAccount.phoneno;
    const toUserId = this.global.session.fldphoneno;
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.chat.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.chat.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.chatService.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        try{
           this.content.scrollToBottom();
        }catch{

        }        
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

}
