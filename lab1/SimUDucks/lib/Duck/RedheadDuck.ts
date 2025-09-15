import {Counter} from './Counter/Counter'
import {DanceMinuet} from './Dance/DanceMinuet'
import {Duck} from './Duck'
import {FlyWithWings} from './Fly/FlyWithWings'
import {NoGreetingEver} from './Greeting/NoGreetingEver'
import {QuackBehavior} from './Quack/QuackBehavior'

class RedheadDuck extends Duck {
	constructor() {
		super(new FlyWithWings(), new QuackBehavior(), new DanceMinuet(), new NoGreetingEver(), new Counter())
	}

	display(): void {
		console.log('I\'m redhead duck')
	}
}

export {
	RedheadDuck,
}
