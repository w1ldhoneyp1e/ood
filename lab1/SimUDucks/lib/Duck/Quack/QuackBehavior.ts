import {QuackAbility} from './QuackAbility'

class QuackBehavior extends QuackAbility {
	quack(): void {
		console.log('Quack Quack!!!')
	}
}

export {
	QuackBehavior,
}
