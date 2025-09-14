import {type IFlyBehavior} from './IFlyBehavior'

class FlyAbility implements IFlyBehavior {
	protected flightCount = 0
	protected sayFlightCount(): void {
		console.log(`My ${this.flightCount} flight`)
	}

	fly(): void {
		this.flightCount++
		this.sayFlightCount()
	}
}

export {
	FlyAbility,
}
