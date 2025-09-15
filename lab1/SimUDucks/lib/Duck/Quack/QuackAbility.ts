import {type IQuackBehavior} from './IQuackBehavior'

class QuackAbility implements IQuackBehavior {
	quack(): void {
		console.log('I can quack')
	}
}

export {
	QuackAbility,
}
