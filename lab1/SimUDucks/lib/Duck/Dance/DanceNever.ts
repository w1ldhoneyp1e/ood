import {type IDanceBehavior} from './IDanceBehavior'

class DanceNever implements IDanceBehavior {
	dance(): void {}
}

export {
	DanceNever,
}
