import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core'
import { Player } from './models/player'
import { Ball } from './models/ball'

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit, AfterViewInit {

  time = 12
  movement = 6
  movementBallX = 6
  movementBallY = 6


  movementBar = 5
  width:number = 0
  height:number = 0
  controlGame: any
  player1 = new Player()
  player2 = new Player()
  ball = new Ball()

  scorePlayer1:number = 0
  scorePlayer2:number = 0

  @ViewChild('bar1', { read: ElementRef })
  htmlBar1!: ElementRef<HTMLElement>

  @ViewChild('bar2', { read: ElementRef })
  htmlBar2!: ElementRef<HTMLElement>

  @ViewChild('ball', { read: ElementRef })
  htmlBall!: ElementRef<HTMLElement>

  @ViewChild('gameContainer', { read: ElementRef })
  gameContainer!: ElementRef<HTMLElement>

  colors = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6']

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.width = this.gameContainer.nativeElement.clientWidth - this.movement
    this.height = this.gameContainer.nativeElement.clientHeight - this.movement - 10 // Se le agrega un margen adicional al alto de la pantalla
    this.start()
  }

  start() {
    this.init()
    this.controlGame = setInterval(() => { this.play() }, this.time)
  }

  init() {
    
    this.movement = 6
    this.movementBallX = 6
    this.movementBallY = 6

    this.htmlBar1.nativeElement.style.backgroundColor = '#000'
    this.htmlBar2.nativeElement.style.backgroundColor = '#000'
    
    this.htmlBall.nativeElement.style.left = '0px'
    this.htmlBall.nativeElement.style.top = (this.gameContainer.nativeElement.clientHeight / 2) + 'px'
    
    this.htmlBar1.nativeElement.style.top = '0px'
    this.htmlBar2.nativeElement.style.bottom = '0px'
    
    this.ball.state = 1
    this.ball.direction = 1 // right 1, left 2
    this.player1.keyPress = false
    this.player1.key = ''
    this.player2.keyPress = false
    this.player2.key = ''
  }

  onResetGame(){
    this.stop()
    this.init()
    this.start()
  }

  onResetScore(){
    this.scorePlayer1 = 0
    this.scorePlayer2 = 0
    this.onResetGame()
  }



  stop() {
    clearInterval(this.controlGame)
  }

  play() {
    this.moveBar()
    this.moveBall()
    this.checkIfLost()
  }


  checkIfLost() {
    if (this.htmlBall.nativeElement.offsetLeft >= this.width + this.movement) {
      this.stop()
      this.scorePlayer1++
      this.htmlBar1.nativeElement.style.backgroundColor = 'rgb(73, 224, 136)'
      this.htmlBar2.nativeElement.style.backgroundColor = '#c95f5f'
    }
    if (this.htmlBall.nativeElement.offsetLeft <= - this.movement) {
      this.stop()
      this.scorePlayer2++
      this.htmlBar1.nativeElement.style.backgroundColor = '#c95f5f'
      this.htmlBar2.nativeElement.style.backgroundColor = 'rgb(73, 224, 136)'
    }
  }

  moveBall() {
    this.checkStateBall()
    switch (this.ball.state) {
      case 1: // derecha, abajo
        this.htmlBall.nativeElement.style.left = (this.htmlBall.nativeElement.offsetLeft + this.movementBallX) + "px"
        this.htmlBall.nativeElement.style.top = (this.htmlBall.nativeElement.offsetTop + this.movementBallY) + "px"
        break
      case 2: // derecha, arriba
        this.htmlBall.nativeElement.style.left = (this.htmlBall.nativeElement.offsetLeft + this.movementBallX) + "px"
        this.htmlBall.nativeElement.style.top = (this.htmlBall.nativeElement.offsetTop - this.movementBallY) + "px"
        break
      case 3: // izquierda, abajo
        this.htmlBall.nativeElement.style.left = (this.htmlBall.nativeElement.offsetLeft - this.movementBallX) + "px"
        this.htmlBall.nativeElement.style.top = (this.htmlBall.nativeElement.offsetTop + this.movementBallY) + "px"
        break
      case 4: // izquierda, arriba
        this.htmlBall.nativeElement.style.left = (this.htmlBall.nativeElement.offsetLeft - this.movementBallX) + "px"
        this.htmlBall.nativeElement.style.top = (this.htmlBall.nativeElement.offsetTop - this.movementBallY) + "px"
        break
    }
  }

  checkStateBall() {

    this.collidePlayer2()
    this.checkCollidePlayer1()

    if (this.ball.direction === 1) {
      if (this.htmlBall.nativeElement.offsetTop >= this.height) this.ball.state = 2
      else if (this.htmlBall.nativeElement.offsetTop <= 0) this.ball.state = 1
    } else {
      if (this.htmlBall.nativeElement.offsetTop >= this.height) this.ball.state = 4
      else if (this.htmlBall.nativeElement.offsetTop <= 0) this.ball.state = 3
    }
  }

  checkCollidePlayer1() {
    if (this.htmlBall.nativeElement.offsetLeft <= (this.htmlBar1.nativeElement.clientWidth) &&
      this.htmlBall.nativeElement.offsetTop >= this.htmlBar1.nativeElement.offsetTop &&
      this.htmlBall.nativeElement.offsetTop <= (this.htmlBar1.nativeElement.offsetTop + this.htmlBar1.nativeElement.clientHeight)) {
        this.ball.direction = 1
      
      // GOLPE EN EL BORDE ARRIBA
      if (this.htmlBall.nativeElement.offsetTop <= this.htmlBar1.nativeElement.offsetTop + this.htmlBar1.nativeElement.clientHeight * (2 / 6) ){
        this.movementBallY = 8
        if (this.ball.state == 3 || this.ball.state == 4) this.ball.state = 2 // DERECHA, ARRIBA
      }else {
        // GOLPE EN EL BORDE ABAJO
        if(this.htmlBall.nativeElement.offsetTop >= this.htmlBar1.nativeElement.offsetTop + this.htmlBar1.nativeElement.clientHeight * (4 / 6)) {
          this.movementBallY = 8
          if (this.ball.state == 3 || this.ball.state == 4) this.ball.state = 1 // DERECHA, ARRIBA
        }else {
          this.movementBallY = 4
          if (this.ball.state == 3) this.ball.state = 1
          if (this.ball.state == 4) this.ball.state = 2
        }
      }
      console.log('movementY', this.movementBallY)
      
      return true
    }

    return false
  }

  collidePlayer2() {
    if (this.htmlBall.nativeElement.offsetLeft >= (this.width - this.htmlBar2.nativeElement.clientWidth - 30)
      && this.htmlBall.nativeElement.offsetTop >= this.htmlBar2.nativeElement.offsetTop 
      && this.htmlBall.nativeElement.offsetTop <= (this.htmlBar2.nativeElement.offsetTop + this.htmlBar2.nativeElement.clientHeight)
    ) {
        this.ball.direction = 2

        // GOLPE EN EL BORDE ABAJO
      if (this.htmlBall.nativeElement.offsetTop <= this.htmlBar2.nativeElement.offsetTop + this.htmlBar2.nativeElement.clientHeight * (2 / 6) ){
        this.movementBallY = 8
        if (this.ball.state == 1 || this.ball.state == 2) this.ball.state = 4 // IZQUIERDA, ABAJO
      }else {
        // GOLPE EN EL BORDE ABAJO
        if(this.htmlBall.nativeElement.offsetTop >= this.htmlBar2.nativeElement.offsetTop + this.htmlBar2.nativeElement.clientHeight * (4 / 6)) {
          this.movementBallY = 8
          if (this.ball.state == 1 || this.ball.state == 2) this.ball.state = 3 // IZQUIERDA, ARRIBA
        }else {
          this.movementBallY = 4
          if (this.ball.state == 1) this.ball.state = 3
          if (this.ball.state == 2) this.ball.state = 4
        }
      }

      return true
    }
    return false
  }

  moveBar() {
    if (this.player1.keyPress) {
      if (this.player1.key == 'q' && this.htmlBar1.nativeElement.offsetTop >= 5)
        this.htmlBar1.nativeElement.style.top = (this.htmlBar1.nativeElement.offsetTop - this.movementBar) + "px"

      if (this.player1.key == 'a' && (this.htmlBar1.nativeElement.offsetTop + this.htmlBar1.nativeElement.clientHeight) <= this.height)
        this.htmlBar1.nativeElement.style.top = (this.htmlBar1.nativeElement.offsetTop + this.movementBar) + "px"
    }

    if (this.player2.keyPress) {
      if (this.player2.key == 'o' && this.htmlBar2.nativeElement.offsetTop >= 5)
        this.htmlBar2.nativeElement.style.top = (this.htmlBar2.nativeElement.offsetTop - this.movementBar) + "px"
      if (this.player2.key == 'l' && (this.htmlBar2.nativeElement.offsetTop + this.htmlBar2.nativeElement.clientHeight) <= this.height)
        this.htmlBar2.nativeElement.style.top = (this.htmlBar2.nativeElement.offsetTop + this.movementBar) + "px"
    }
  }


  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'q': // Q
      case 'a': // A
        this.player1.key = event.key
        this.player1.keyPress = true
        break
      case 'o': // O
      case 'l': // L
        this.player2.key = event.key
        this.player2.keyPress = true
        break
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'q': // Q
      case 'a': // A
        this.player1.key = ''
        this.player1.keyPress = false
        break
      case 'o': // O
      case 'l': // L
        this.player2.key = ''
        this.player2.keyPress = false
        break
    }
  }
}
