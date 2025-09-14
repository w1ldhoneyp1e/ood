import {type IQuackBehavior} from './IQuackBehavior'

class SqueakBehavior implements IQuackBehavior {
	quack(): void {
		console.log('Squeek!!!')
	}
}

export {
	SqueakBehavior,
}
