import {type IDanceBehavior} from './IDanceBehavior'

const createDanceWaltz = (): IDanceBehavior => ({
	dance(): void {
		console.log('Dancing waltz')
	},
})

export {
	createDanceWaltz,
}
