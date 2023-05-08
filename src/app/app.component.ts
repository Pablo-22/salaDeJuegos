import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'salaDeJuegos'
  isUserLogged: boolean = false

  constructor(private _auth: AuthService){
    this._auth.authState().subscribe(x => {
      if(x){
        this.isUserLogged = true
      } else {
        this.isUserLogged = false
      }
    })
  }

  onLogOut(){
    this._auth.logOut()
  }
}
