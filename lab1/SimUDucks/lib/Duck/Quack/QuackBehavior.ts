import {type IQuackBehavior} from './IQuackBehavior'

class QuackBehavior implements IQuackBehavior {
	quack(): void {
		console.log('Quack Quack!!!')
	}
}

export {
	QuackBehavior,
}
