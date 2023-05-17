import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsDeck } from '../models/cards-deck';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
	cardsDeck$:Observable<CardsDeck>;
	cardsDeck:CardsDeck = new CardsDeck;
	cards:Observable<any> = new Observable<any>;
	activeCard:any;

  	constructor(private _http:HttpClient) {
		this.cardsDeck$ = this.fetchCardsDeck();
		this.cardsDeck$.subscribe(x => {this.cardsDeck = x })
	}

	fetchCardsDeck() {
		return this._http.get<CardsDeck>('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
	}

	getCards(amount:number, deckId:string) {
		return this._http.get<any>(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${amount}`);
	}
}