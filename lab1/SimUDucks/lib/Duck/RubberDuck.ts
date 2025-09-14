import {Duck} from './Duck'
import {FlyNoWay} from './Fly/FlyNoWay'
import {SqueakBehavior} from './Quack/SqueakBehavior'

class RubberDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new SqueakBehavior())
	}

	display(): void {
		console.log('I\'m rubber duck')
	}
}

export {
	RubberDuck,
}
