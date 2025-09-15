import {type IQuackBehavior} from './IQuackBehavior'

class MuteQuackBehavior implements IQuackBehavior {
	quack(): void {}
}

export {
	MuteQuackBehavior,
}
