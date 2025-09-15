import {type IFlyBehavior} from './IFlyBehavior'

class FlyAbility implements IFlyBehavior {
	fly(): void {
		console.log('I can fly')
	}
}

export {
	FlyAbility,
}
