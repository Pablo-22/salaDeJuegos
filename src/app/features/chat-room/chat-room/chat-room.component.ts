import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat-message';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/users/user';
import { ChatRoomService } from '../chat-room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  chatMessages: ChatMessage[] = [ ];
  currentUser:User|undefined
  messageBody:string = ''
  subscription1:Subscription = new Subscription
  subscription2:Subscription = new Subscription

  constructor(private _authService:AuthService, private _chatRoomService:ChatRoomService) {
  }

  ngOnInit(): void {
    this.subscription1 = this._authService.currentUser$.subscribe(x => {
      this.currentUser = x
    })

    this.subscription2 = this._chatRoomService.getAll().subscribe(x => {
      this.chatMessages = x.sort((a, b) => {
        if (a.createdDate < b.createdDate)
          return -1;
        if (a.createdDate > b.createdDate)
          return 1;
        return 0;
      })
    })
  }

  currentUserClass(email:any){
    if (email == this.currentUser?.email) {
      return 'text-end'
    } else{
      return ''
    }
  }

  onSend(){
    if (this.currentUser) {
      let message = new ChatMessage()
      message.user = this.currentUser
      message.body = this.messageBody
      message.userId = this.currentUser.id
      this._chatRoomService.create(message);
    }
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe
    this.subscription2.unsubscribe
  }

}
