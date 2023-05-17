import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
	letters = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
		'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	];

	wordsList:string[] = [
		'Cortina', 'Montaña', 'Cadena', 'Silueta', 'Esquina', 'Pelota', 'Edificio', 'Extremista', 'Estimado', 'Astucia', 'Asterisco',
		'Estudiante', 'Perezoso', 'Vinilo', 'Desastre', 'Gigante', 'Certeza', 'Apasionado', 'Enamoramiento', 'Natural', 'Teleférico',
		'Tentación', 'Termodinámica', 'Sensacional', 'Efecto', 'Saturación', 'Siniestro', 'Automóvil', 'Descuidado', 'Pesticida',
		'Estudioso', 'Linguista', 'Poeta', 'Tractor', 'Terremoto', 'Mamadera', 'Delincuente', 'Retirado', 'Privilegio', 'Sabueso'
	]

	playedWords:string[] = [];
	activeWord:string = '';
	splittedWord: string[] = 'casa'.split('');
	secretWord: string[] = [];

	lettersAlreadySelected:string[] = [];
	
	attemps:number = 0;

  gameStatus: 'initial'|'in-progress'|'finished' = 'initial';
	score:number = 0;
	
	constructor(){}

	ngOnInit(): void {
		this.wordsList = this.shuffleArray(this.wordsList);
		this.newGame();
    console.log(this.secretWord)
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

	newGame(){
		this.attemps = 8;
		this.lettersAlreadySelected = [];
		this.activeWord = this.wordsList.splice( 0, 1)[0];
		this.splittedWord = this.activeWord.split('');

		this.splittedWord = this.splittedWord.map(x => { 
			let uppercaseLetter = x.toUpperCase();
			let finalLetter =  this.removeAccents(uppercaseLetter);
			return finalLetter;
		})

		this.secretWord = this.splittedWord.map(x => {
			return '_';
		})
	}

	removeAccents (str:string) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	} 

	onLetterSelected(letter:string) {
		this.lettersAlreadySelected.push(letter);
		
		if (this.splittedWord.includes(letter)) {
			if (!this.secretWord.includes(letter)) {
				
				for (let index = 0; index < this.splittedWord.length; index++) {
					const element = this.splittedWord[index].toUpperCase();
					if (element == letter) {
						this.secretWord[index] = letter;
						this.score += 5;
					}
				}

				if (!this.secretWord.includes('_')) {
					//let audio = new Audio();
					//audio.src = '../../../assets/mario-coin-sound-effect.mp3';
					//audio.load();
					//audio.play();

					this.score += 25;


					
					this.playedWords.push(this.activeWord);
					setTimeout(() => {
						this.newGame();
					}, 2000);
				}
			}
		} else {
			this.attemps--;
			if (this.attemps == 0) {
				if (this.score > 0) {
					this.score -= 10;
				}
				this.onFailedGame();
			}
		}
	}

	onFailedGame(){
		
		for (let index = 0; index < this.splittedWord.length; index++) {
			const element = this.splittedWord[index].toUpperCase();
			this.secretWord[index] = element;
		}

		//let audio = new Audio();
		//audio.src = '../../../assets/wrong-buzzer_dudoo.mp3';
		//audio.load();
		//audio.volume = 0.05;
		//audio.play();

		setTimeout(() => {
			this.newGame();
		}, 2000);
	}
}