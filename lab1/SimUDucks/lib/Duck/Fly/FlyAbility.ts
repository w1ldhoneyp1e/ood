import {type IFlyBehavior} from './IFlyBehavior'

class FlyAbility implements IFlyBehavior {
	canFly = true
	flightCounter = 0

	protected sayFlightCount(): void {
		console.log(`My ${this.flightCounter} flight`)
	}

	fly(): void {
		this.flightCounter++
		this.sayFlightCount()
	}
}

export {
	FlyAbility,
}
