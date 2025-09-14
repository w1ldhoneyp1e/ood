import {DanceWaltz} from './Dance/DanceWaltz'
import {Duck} from './Duck'
import {FlyWithWings} from './Fly/FlyWithWings'
import {QuackBehavior} from './Quack/QuackBehavior'

class MallardDuck extends Duck {
	constructor() {
		super(new FlyWithWings(), new QuackBehavior(), new DanceWaltz())
	}

	display(): void {
		console.log('I\'m mallard duck')
	}
}

export {
	MallardDuck,
}
