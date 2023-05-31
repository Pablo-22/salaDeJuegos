import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './hangman/hangman.component';
import { HigherOrLowerComponent } from './higher-or-lower/higher-or-lower.component';
import { GuessTheDogsBreedComponent } from './guess-the-dogs-breed/guess-the-dogs-breed.component';
import { PongComponent } from './pong/pong.component';

const routes: Routes = [
  { path: 'hangman', component: HangmanComponent },
  { path: 'higher-or-lower', component: HigherOrLowerComponent },
  { path: 'guess-the-dogs-breed', component: GuessTheDogsBreedComponent },
  { path: 'pong', component: PongComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
