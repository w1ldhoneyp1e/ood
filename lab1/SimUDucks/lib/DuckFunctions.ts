import {type Duck} from './Duck/Duck'

function drawDuck(duck: Duck): void {
	duck.display()
}

function playWithDuck(duck: Duck): void {
	drawDuck(duck)
	duck.quack()
	duck.fly()
	duck.dance()
}

export {
	drawDuck,
	playWithDuck,
}
