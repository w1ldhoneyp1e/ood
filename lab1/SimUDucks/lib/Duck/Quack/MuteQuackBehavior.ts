import {type IQuackBehavior} from './IQuackBehavior'

class MuteQuackBehavior implements IQuackBehavior {
	quackable = false
	quack(): void {}
}

export {
	MuteQuackBehavior,
}
