import {Duck} from './Duck'
import {FlyNoWay} from './Fly/FlyNoWay'
import {QuackBehavior} from './Quack/QuackBehavior'

class ModelDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new QuackBehavior())
	}

	display(): void {
		console.log('I\'m model duck')
	}

	override dance(): void {}
}

export {
	ModelDuck,
}
