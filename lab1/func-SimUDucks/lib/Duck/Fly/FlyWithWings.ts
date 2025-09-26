import {type IFlyBehavior} from './IFlyBehavior'

const createFlyWithWings = (): IFlyBehavior => ({
	fly: () => {
		console.log('I\'m flying with wings!!')
	},
	canFly: true,
})

export {
	createFlyWithWings,
}
