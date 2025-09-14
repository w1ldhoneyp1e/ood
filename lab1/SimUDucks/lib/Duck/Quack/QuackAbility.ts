import {type IQuackBehavior} from './IQuackBehavior'

class QuackAbility implements IQuackBehavior {
	quackable = true
	quack(): void {
		console.log('I can quack')
	}
}

export {
	QuackAbility,
}
