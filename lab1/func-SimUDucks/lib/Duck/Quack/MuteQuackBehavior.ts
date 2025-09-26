import {type IQuackBehavior} from './IQuackBehavior'

const createMuteQuackBehavior = (): IQuackBehavior => ({
	quack(): void {},
	quackable: false,
})

export {
	createMuteQuackBehavior,
}
