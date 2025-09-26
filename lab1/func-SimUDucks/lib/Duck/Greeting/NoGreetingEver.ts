import {type IGreetingBehavior} from './IGreetingBehavior'

const createNoGreetingEver = (): IGreetingBehavior => ({
	greeting(): void {},
})

export {
	createNoGreetingEver,
}
