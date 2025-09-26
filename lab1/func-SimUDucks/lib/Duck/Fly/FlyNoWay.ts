import {type IFlyBehavior} from './IFlyBehavior'

const createFlyNoWay = (): IFlyBehavior => ({
	fly(): void {},
	canFly: false,
})

export {
	createFlyNoWay,
}
