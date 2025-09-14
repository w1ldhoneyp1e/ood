import {DanceNever} from './Dance/DanceNever'
import {Duck} from './Duck'
import {FlyNoWay} from './Fly/FlyNoWay'
import {QuackBehavior} from './Quack/QuackBehavior'

class ModelDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new QuackBehavior(), new DanceNever())
	}

	display(): void {
		console.log('I\'m model duck')
	}
}

export {
	ModelDuck,
}
