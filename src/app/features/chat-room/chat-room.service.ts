import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud/crud.service';
import { ChatMessage } from './models/chat-message';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  collectionName:string = 'chat-room'

  constructor(private _crud:CrudService) {
  }

  getAll(){
    return this._crud.getAll(this.collectionName);
  }

  getById(id:string){
    return this._crud.getById(this.collectionName, id)
  }

  async getByField(fieldName:string, value:any){
    let chatMessage:ChatMessage = new ChatMessage()
    await this._crud.getByField(this.collectionName, fieldName, value).then(userData => {
      chatMessage = this.parse(userData)
    })
    return chatMessage
  }

  create(chatMessage:ChatMessage){
    return this._crud.create(this.collectionName, chatMessage);
  }

  update(chatMessage:ChatMessage){
    return this._crud.update(this.collectionName, chatMessage);
  }

  delete(userId:string){
    return this._crud.delete(this.collectionName, userId);
  }

  parse(data:DocumentData) : ChatMessage {
    const chatMessage = new ChatMessage()
    chatMessage.id = data[0]['id']
    chatMessage.createdDate = data[0]['createdDate']
    chatMessage.body = data[0]['body']
    chatMessage.user = data[0]['user']
    chatMessage.userId = data[0]['userId']
    return chatMessage 
  }
}
