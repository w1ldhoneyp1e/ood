import {type IDanceBehavior} from './IDanceBehavior'

class DanceMinuet implements IDanceBehavior {
	dance(): void {
		console.log('Dancing minuet')
	}
}

export {
	DanceMinuet,
}
