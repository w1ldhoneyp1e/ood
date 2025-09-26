import {type IQuackBehavior} from './IQuackBehavior'

const createSqueakBehavior = (): IQuackBehavior => ({
	quack(): void {
		console.log('Squeek!!!')
	},
	quackable: true,
})

export {
	createSqueakBehavior,
}
