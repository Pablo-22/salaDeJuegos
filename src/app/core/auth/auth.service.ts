import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from 'src/app/core/users/user';
import Swal from 'sweetalert2';
import { UsersService } from '../users/users.service';
import firebase from "@firebase/app-compat";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser:User|undefined

  constructor(private _auth : AngularFireAuth, private _users:UsersService) {
    this._auth.authState.subscribe(x => {
      if (!x) {
        this.currentUser = undefined
      }
    })
  }

  async login(email: string, password: string){
    try{
      let result:any = await this._auth.signInWithEmailAndPassword(email, password);
  
      this._users.getByField('email', email).then(user => {
        this.currentUser = user
        Swal.fire({
          title: '¡Bienvenido!',
          text: "Has podido ingresar correctamente",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      })

      return result;
    }
    catch(error) {
      Swal.fire({
        title: 'Error',
        text: "No se ha podido hacer ingresar correctamente. Por favor revise los datos ingresados. Error: " + error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return null;
    }
  }

  async loginGoogle(email: string, password: string){
		try{
			return await this._auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
		}
		catch(error) {
			Swal.fire({
        title: 'Error',
        text: "No se ha podido hacer ingresar correctamente. Error: " + error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
			return null;
		}
	}

  async signUp(email: string, password: string){
    try{
      let result:any = await this._auth.createUserWithEmailAndPassword(email, password);
  
      let user:User = new User();
      user.email = email;
      result = this._users.create(user);

      if (result) {
        this.currentUser = this._users.parse(result)

        Swal.fire({
          title: '¡Bienvenido!',
          text: "Has podido ingresar correctamente",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }

      return result;
    }
    catch(error) {
      Swal.fire({
        title: 'Error',
        text: "No se ha podido registrar correctamente. Error: " + error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return null;
    }
  }

  async logOut(){
		this._auth.signOut();
	}

  authState(){
    return this._auth.authState
  }
}
