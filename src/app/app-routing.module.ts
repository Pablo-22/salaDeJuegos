import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { ChatRoomComponent } from './features/chat-room/chat-room/chat-room.component';
import { LoggedGuard } from './core/guards/logged.guard';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'login', component: LoginComponent, data: {signUp: false} },
  { path:'sign-up', component: LoginComponent, data: {signUp: true} },
  { path:'about-me', canActivate: [LoggedGuard], component: AboutMeComponent },
  { path:'chat-room', canActivate: [LoggedGuard], component: ChatRoomComponent },
	{ path: 'games', canActivateChild: [LoggedGuard], loadChildren: () => import('./features/games/games.module').then(m => m.GamesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
