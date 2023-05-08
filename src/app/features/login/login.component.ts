import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LogsService } from 'src/app/core/logs/logs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	faGoogle = faGoogle;


	emailInputStr: string = ''
	passwordInputStr: string = ''
	signUp: boolean

	constructor(
		private _auth: AuthService, 
		private _activatedRoute: ActivatedRoute,
		private _logs: LogsService
	) {
		this.signUp = this._activatedRoute.snapshot.data['signUp']
	}

	ngOnInit(): void {
	}

	onConfirm(){
		if (this.signUp) {
			this._auth.signUp(this.emailInputStr, this.passwordInputStr).then(x => {
				if (x) {
					this._logs.userLog('Registro exitoso')
				}
			})

		} else {
			this._auth.login(this.emailInputStr, this.passwordInputStr).then(x => {
				if (x) {
					this._logs.userLog('Ingreso exitoso')
				}
			})
		}
	}

	onLogOut(){
		this._auth.logOut()
	}

	loginGoogle(){
		this._auth.loginGoogle(this.emailInputStr, this.passwordInputStr)
	}
}

