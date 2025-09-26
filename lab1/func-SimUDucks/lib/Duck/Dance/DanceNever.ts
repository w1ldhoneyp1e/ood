import {type IDanceBehavior} from './IDanceBehavior'

const createDanceNever = (): IDanceBehavior => ({
	dance(): void {},
})

export {
	createDanceNever,
}
