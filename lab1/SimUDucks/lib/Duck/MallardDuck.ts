import {Counter} from './Counter/Counter'
import {DanceWaltz} from './Dance/DanceWaltz'
import {Duck} from './Duck'
import {FlyWithWings} from './Fly/FlyWithWings'
import {FlightGreeting} from './Greeting/FlightGreeting'
import {QuackBehavior} from './Quack/QuackBehavior'

class MallardDuck extends Duck {
	constructor() {
		const flyBehavior = new FlyWithWings()
		const quackBehavior = new QuackBehavior()
		const counter = new Counter()
		super(
			flyBehavior,
			quackBehavior,
			new DanceWaltz(),
			new FlightGreeting(flyBehavior, quackBehavior, counter),
			counter,
		)
	}

	display(): void {
		console.log('I\'m mallard duck')
	}
}

export {
	MallardDuck,
}
