import {Duck} from './Duck'
import {FlyWithWings} from './Fly/FlyWithWings'
import {QuackBehavior} from './Quack/QuackBehavior'

class MallardDuck extends Duck {
	constructor() {
		super(new FlyWithWings(), new QuackBehavior())
	}

	display(): void {
		console.log('I\'m mallard duck')
	}

	override dance(): void {}
}

export {
	MallardDuck,
}
