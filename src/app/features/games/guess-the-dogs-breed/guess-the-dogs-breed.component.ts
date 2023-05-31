import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DogsService } from '../services/dogs.service';
import { ListComponent } from 'src/app/core/components/list/list.component';

@Component({
  selector: 'app-guess-the-dogs-breed',
  templateUrl: './guess-the-dogs-breed.component.html',
  styleUrls: ['./guess-the-dogs-breed.component.scss']
})
export class GuessTheDogsBreedComponent implements OnInit, AfterViewInit {

	gameQuestion:any;
	showCorrectAnswer:boolean = false;
	score:number = 0;
  feedbackText:string = ''

  @ViewChild('app-list')
  child: ListComponent = new ListComponent;

	constructor(private _dogsService:DogsService) {
		this._dogsService.getDogBreedsPlainList()
	}

	ngOnInit(): void {
	}

  ngAfterViewInit(): void {
		this.newQuestion();
  }

	newQuestion(){
		this._dogsService.fetchRandomImg().subscribe(result => {
			let imgUrl = result.message;
			let dogBreed = imgUrl.split('/')[4]

			let options = this._dogsService.getQuestionOptions(dogBreed, 3);
			this._dogsService.shuffleArray(options);

			this.gameQuestion = { image: imgUrl, breed: dogBreed, options: options }
      this.child.reset()
		})
	}



	evaluateAnswer(answer:string){
		if (answer == this.gameQuestion.breed) {
			return true
		}
		return false
	}

	showCorrect(){
		this.showCorrectAnswer = true;
		setTimeout(() => {
			this.showCorrectAnswer = false;
			this.newQuestion();
		}, 2000);
	}

	onAnswer(answer:string){
		if (!this.showCorrectAnswer) {
			if (this.evaluateAnswer(answer)) {
				this.score++;
        this.feedbackText = '¡Correcto!'
			}else {
        this.feedbackText = '¡Incorrecto!'
      }
			this.showCorrect();
		}
	}
}