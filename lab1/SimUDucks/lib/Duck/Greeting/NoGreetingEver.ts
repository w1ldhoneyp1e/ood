import {type IGreetingBehavior} from './IGreetingBehavior'

class NoGreetingEver implements IGreetingBehavior {
	greeting(): void {}
}

export {
	NoGreetingEver,
}
