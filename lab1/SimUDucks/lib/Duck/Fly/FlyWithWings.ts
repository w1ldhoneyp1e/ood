import {FlyAbility} from './FlyAbility'

class FlyWithWings extends FlyAbility {
	fly(): void {
		this.flightCounter++
		this.sayFlightCount()
		console.log('I\'m flying with wings!!')
	}
}

export {
	FlyWithWings,
}
