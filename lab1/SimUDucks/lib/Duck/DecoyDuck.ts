import {DanceNever} from './Dance/DanceNever'
import {Duck} from './Duck'
import {FlyNoWay} from './Fly/FlyNoWay'
import {MuteQuackBehavior} from './Quack/MuteQuackBehavior'

class DecoyDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new MuteQuackBehavior(), new DanceNever())
	}

	display(): void {
		console.log('I\'m a decoy duck')
	}
}

export {
	DecoyDuck,
}
