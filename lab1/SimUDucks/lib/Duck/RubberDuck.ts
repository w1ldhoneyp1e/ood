import {Counter} from './Counter/Counter'
import {DanceNever} from './Dance/DanceNever'
import {Duck} from './Duck'
import {FlyNoWay} from './Fly/FlyNoWay'
import {NoGreetingEver} from './Greeting/NoGreetingEver'
import {SqueakBehavior} from './Quack/SqueakBehavior'

class RubberDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new SqueakBehavior(), new DanceNever(), new NoGreetingEver(), new Counter())
	}

	display(): void {
		console.log('I\'m rubber duck')
	}
}

export {
	RubberDuck,
}
