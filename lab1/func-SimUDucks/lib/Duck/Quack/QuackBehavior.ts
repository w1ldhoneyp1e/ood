import {type IQuackBehavior} from './IQuackBehavior'

const createQuackBehavior = (): IQuackBehavior => ({
	quack(): void {
		console.log('Quack Quack!!!')
	},
	quackable: true,
})

export {
	createQuackBehavior,
}
