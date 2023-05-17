import { Injectable } from '@angular/core';
import { Log } from './log';
import { AuthService } from '../auth/auth.service';
import { CrudService } from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  collectionName:string = 'logs'

  constructor(private _auth : AuthService, private _crud : CrudService) { }

  userLog(value:string){
    const userId = this._auth.currentUser$.subscribe(user => {
      const log = new Log(value, 'user', user?.id?? '')
      this._crud.create(this.collectionName, log)
    });
  }

  log(value:string, objectName:string, objectId:string){
    const log = new Log(value, objectName, objectId)
    this._crud.create(this.collectionName, log)
  }
}
