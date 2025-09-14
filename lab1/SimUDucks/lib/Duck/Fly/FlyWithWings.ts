import {type IFlyBehavior} from './IFlyBehavior'

class FlyWithWings implements IFlyBehavior {
	fly(): void {
		console.log('I\'m flying with wings!!')
	}
}

export {
	FlyWithWings,
}
