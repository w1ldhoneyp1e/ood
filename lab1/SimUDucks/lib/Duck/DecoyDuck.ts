import {Duck} from './Duck'
import {FlyNoWay} from './Fly/FlyNoWay'
import {MuteQuackBehavior} from './Quack/MuteQuackBehavior'

class DecoyDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new MuteQuackBehavior())
	}

	display(): void {
		console.log('I\'m a decoy duck')
	}

	override dance(): void {}
}

export {
	DecoyDuck,
}
