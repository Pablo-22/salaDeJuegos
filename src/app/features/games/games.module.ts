import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { HangmanComponent } from './hangman/hangman.component';
import { HigherOrLowerComponent } from './higher-or-lower/higher-or-lower.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HangmanComponent,
    HigherOrLowerComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
  ],
})
export class GamesModule { }
