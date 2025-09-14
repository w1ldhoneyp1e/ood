import {QuackAbility} from './QuackAbility'

class SqueakBehavior extends QuackAbility {
	quack(): void {
		console.log('Squeek!!!')
	}
}

export {
	SqueakBehavior,
}
