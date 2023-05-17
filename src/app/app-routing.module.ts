import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AboutMeComponent } from './features/about-me/about-me.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'login', component: LoginComponent, data: {signUp: false} },
  { path:'sign-up', component: LoginComponent, data: {signUp: true} },
  { path:'about-me', component: AboutMeComponent },
	{ path: 'games', loadChildren: () => import('./features/games/games.module').then(m => m.GamesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
