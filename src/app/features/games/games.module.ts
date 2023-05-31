import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { HangmanComponent } from './hangman/hangman.component';
import { HigherOrLowerComponent } from './higher-or-lower/higher-or-lower.component';
import { GuessTheDogsBreedComponent } from './guess-the-dogs-breed/guess-the-dogs-breed.component';
import { CoreModule } from "../../core/core.module";
import { PongComponent } from './pong/pong.component';

@NgModule({
    declarations: [
        HangmanComponent,
        HigherOrLowerComponent,
        GuessTheDogsBreedComponent,
        PongComponent
    ],
    imports: [
        CommonModule,
        GamesRoutingModule,
        CoreModule
    ]
})
export class GamesModule { }
