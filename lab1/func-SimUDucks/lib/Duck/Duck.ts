import {type Counter} from './Counter/Counter'
import {type IDanceBehavior} from './Dance/IDanceBehavior'
import {type IFlyBehavior} from './Fly/IFlyBehavior'
import {type IGreetingBehavior} from './Greeting/IGreetingBehavior'
import {type IQuackBehavior} from './Quack/IQuackBehavior'

interface Duck {
	fly: () => void,
	quack: () => void,
	swim: () => void,
	dance: () => void,
	display: () => void,
	setFlyBehavior: (newFlyBehavior: IFlyBehavior) => void,
}

interface CreateDuckArgs {
	display: () => void,
	flyBehavior?: IFlyBehavior,
	quackBehavior?: IQuackBehavior,
	danceBehavior?: IDanceBehavior,
	greetingBehavior?: IGreetingBehavior,
	counter?: Counter,
}

const createDuck = ({
	flyBehavior,
	quackBehavior,
	danceBehavior,
	greetingBehavior,
	counter,
	display,
}: CreateDuckArgs): Duck => ({
	quack(): void {
		if (quackBehavior) {
			quackBehavior()
		}
	},
	swim(): void {
		console.log('I\'m swimming')
	},
	fly(): void {
		if (flyBehavior) {
			flyBehavior()

			if (counter) {
				counter.increase()
			}

			if (greetingBehavior) {
				greetingBehavior()
			}
		}
	},
	dance(): void {
		if (danceBehavior) {
			danceBehavior()
		}
	},
	setFlyBehavior(_flyBehavior: IFlyBehavior): void {
		flyBehavior = _flyBehavior
	},
	display,
})

export {
	createDuck,
	type Duck,
}
