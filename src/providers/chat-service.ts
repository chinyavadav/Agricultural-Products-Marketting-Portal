import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";
import { GlobalProvider } from '../providers/global/global';

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  phoneno: string;
  company?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {
  phoneno:string;
  company:string;
  msgList: ChatMessage[] = [];
  constructor(public global: GlobalProvider, private http: Http) {
  }

  getMsg() {
    // Get mock message list
    return this.getMsgList().subscribe(res => {
      console.log(res);
        this.msgList=res;//filter(item => (item.userId.indexOf(this.localAccount.phoneno) !== -1 && item.toUserId.indexOf(this.externalAccount.phoneno) !== -1) || (item.userId.indexOf(this.externalAccount.phoneno) !== -1 && item.toUserId.indexOf(this.localAccount.phoneno) !== -1)) ;
    });
  }

  getMsgList(): Observable<ChatMessage[]> {
    const msgListUrl = this.global.serverAddress+'api/messages.php?phoneno='+this.global.session.fldphoneno; //msg-list.json
    return this.http.get(msgListUrl).pipe(map(response =>JSON.parse(response["_body"]).array));
  }

  sendMsg(msg: ChatMessage) {
    console.log(msg);
    this.http.get(this.global.serverAddress+'api/message.php?from='+msg.userId+'&to='+msg.toUserId+"&message="+msg.message)
      .subscribe(data => {
        let response=JSON.parse(data["_body"]);
        if(response.response=="success"){
          this.getMsg();
        }
      }, error => {
        console.log("failed to send");
      }
    );
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      phoneno: this.phoneno,
      company: this.company,
      avatar: this.global.serverAddress+'account/avatars/'+this.global.session.fldphoneno+'.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
