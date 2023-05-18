import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/card';
import { CardsDeck } from '../models/cards-deck';

@Component({
  selector: 'app-higher-or-lower',
  templateUrl: './higher-or-lower.component.html',
  styleUrls: ['./higher-or-lower.component.scss']
})
export class HigherOrLowerComponent implements OnInit {
	gameStatus: 'initial'|'in-progress'|'finished' = 'initial';
	score:number = 0;
	activeCardValue:string = '1';

	cardsDeck: CardsDeck = new CardsDeck;
	cards: Card[] = [];
	showedCards: Card[] = [];
	activeCard: Card = new Card();
	previousCard: Card = new Card();

	constructor(private _cardsService:CardsService) { }

	ngOnInit(): void {
		this._cardsService.cardsDeck$.subscribe(x => {	
			this.cardsDeck = x 
			this._cardsService.getCards(52, this.cardsDeck.deck_id).subscribe(data => {
				this.cards = data['cards'];
				
				this.nextCard();
				this.gameStatus = 'in-progress';
			})
		});
	}

	nextCard(){
		this.activeCard = this.cards.splice(0, 1)[0];
		this.showedCards.push(this.activeCard);
	}

	onNextCardSelected(guest:string){
		this.previousCard = this.activeCard;
		this.nextCard();
		let result = this.compareCards(this.previousCard, this.activeCard);
		if( result == guest  ) {

			this.score += 1;

			//setTimeout(() => {
			//	let audio = new Audio();
			//	audio.src = '../../../assets/mario-coin-sound-effect.mp3';
			//	audio.load();
			//	audio.play();
			//}, 400);
			

		} else if(result != 'equal') {
			this.resetGame();

			//setTimeout(() => {
			//	let audio = new Audio();
			//	audio.src = '../../../assets/wrong-buzzer_dudoo.mp3';
			//	audio.load();
			//	audio.volume = 0.05;
			//	audio.play();
			//}, 400);
		}
	}

	compareCards(previousCard:Card, activeCard:Card){
		let previousCardValue = 0;
		let activeCardValue = 0;
		let stringValues = [
			{ name: 'ACE', value: 1	},
			{ name: 'JACK',	value: 11 },
			{ name: 'QUEEN', value: 12 },
			{ name: 'KING',	value: 13}
		];

		stringValues.forEach(x => {
			if (x.name == previousCard.value) {
				previousCardValue = x.value;
			}
			if (x.name == activeCard.value) {
				activeCardValue = x.value;
			}
		})

		if (previousCardValue == 0) {
			previousCardValue = parseInt(previousCard.value);
		}

		if (activeCardValue == 0) {
			activeCardValue = parseInt(activeCard.value);
		}

		if (activeCardValue == previousCardValue) {
			return 'equal';
		}

		if (activeCardValue > previousCardValue) {
			return 'bigger';
		}
		return 'lower';
	}

	resetGame(){
		this.cards.push(...this.showedCards.splice(0));

		if (!this.cards.includes(this.activeCard)) {
			this.cards.push(this.activeCard);
		}

		this.cards = this.shuffleArray(this.cards);
		this.score = 0;
		
	}

	shuffleArray(array:any) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
}