import {type IDanceBehavior} from './IDanceBehavior'

const createDanceMinuet = (): IDanceBehavior => ({
	dance(): void {
		console.log('Dancing minuet')
	},
})

export {
	createDanceMinuet,
}
