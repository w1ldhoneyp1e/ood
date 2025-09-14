import {type IFlyBehavior} from './IFlyBehavior'

class FlyNoWay implements IFlyBehavior {
	canFly = false
	flightCounter = null
	fly(): void {}
}

export {
	FlyNoWay,
}
