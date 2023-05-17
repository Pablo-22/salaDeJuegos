import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'salaDeJuegos'
  isUserLogged: boolean = false
  currentUserEmail:string = ''

  constructor(private _auth: AuthService){
    this._auth.currentUser$.subscribe(x => {
      if (x) {
        this.isUserLogged = true
        this.currentUserEmail = x.email
      }else {
        this.isUserLogged = false
        this.currentUserEmail = ''
      }
    })
  }

  onLogOut(){
    this._auth.logOut()
  }
}
