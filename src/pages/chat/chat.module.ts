import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { ChatService } from "../../providers/chat-service";
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../providers/emoji";
import { PipesModule } from "../../pipes/pipes.module";
import { RelativeTimePipe } from "../../pipes/relative-time/relative-time";


@NgModule({
  declarations: [
    ChatPage,
    RelativeTimePipe,
  ],
  imports: [
  	EmojiPickerComponentModule,
    IonicPageModule.forChild(ChatPage),
    PipesModule
  ],
  exports: [
    ChatPage
  ],
  providers: [
    ChatService,
    EmojiProvider
  ]
})
export class ChatPageModule {}
