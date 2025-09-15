import {FlyAbility} from './FlyAbility'

class FlyWithWings extends FlyAbility {
	fly(): void {
		console.log('I\'m flying with wings!!')
	}
}

export {
	FlyWithWings,
}
