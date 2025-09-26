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
	flyBehavior: IFlyBehavior,
	quackBehavior: IQuackBehavior,
	danceBehavior: IDanceBehavior,
	greetingBehavior: IGreetingBehavior,
	counter: Counter,
	display: () => void,
}

const createDuck = ({
	flyBehavior,
	quackBehavior,
	danceBehavior,
	greetingBehavior,
	counter,
	display,
}: CreateDuckArgs): Duck => {
	if (!quackBehavior) {
		throw new Error('quackBehavior is required')
	}
	if (!flyBehavior) {
		throw new Error('flyBehavior is required')
	}
	if (!danceBehavior) {
		throw new Error('danceBehavior is required')
	}
	if (!greetingBehavior) {
		throw new Error('greetingBegavior is required')
	}

	return {
		quack(): void {
			quackBehavior.quack()
		},
		swim(): void {
			console.log('I\'m swimming')
		},
		fly(): void {
			flyBehavior.fly()
			counter.increase()
			greetingBehavior.greeting()
		},
		dance(): void {
			danceBehavior.dance()
		},
		setFlyBehavior(_flyBehavior: IFlyBehavior): void {
			flyBehavior = _flyBehavior
		},
		display,
	}
}

export {
	createDuck,
	type Duck,
}
