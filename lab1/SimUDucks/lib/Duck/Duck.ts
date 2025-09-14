import {type IDanceBehavior} from './Dance/IDanceBehavior'
import {type IFlyBehavior} from './Fly/IFlyBehavior'
import {type IQuackBehavior} from './Quack/IQuackBehavior'

abstract class Duck {
	private flyBehavior: IFlyBehavior
	private quackBehavior: IQuackBehavior
	private danceBehavior: IDanceBehavior

	constructor(flyBehavior: IFlyBehavior, quackBehavior: IQuackBehavior, danceBehavior: IDanceBehavior) {
		if (!quackBehavior) {
			throw new Error('quackBehavior is required')
		}
		if (!flyBehavior) {
			throw new Error('flyBehavior is required')
		}
		if (!danceBehavior) {
			throw new Error('danceBehavior is required')
		}
		this.quackBehavior = quackBehavior
		this.flyBehavior = flyBehavior
		this.danceBehavior = danceBehavior
	}

	quack(): void {
		this.quackBehavior.quack()
	}

	swim(): void {
		console.log('I\'m swimming')
	}

	fly(): void {
		this.flyBehavior.fly()
	}

	dance(): void {
		this.danceBehavior.dance()
	}

	setFlyBehavior(flyBehavior: IFlyBehavior): void {
		if (!flyBehavior) {
			throw new Error('flyBehavior is required')
		}
		this.flyBehavior = flyBehavior
	}

	abstract display(): void
}

export {
	Duck,
}
