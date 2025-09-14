import {type IDanceBehavior} from './IDanceBehavior'

class DanceWaltz implements IDanceBehavior {
	dance(): void {
		console.log('Dancing waltz')
	}
}

export {
	DanceWaltz,
}
