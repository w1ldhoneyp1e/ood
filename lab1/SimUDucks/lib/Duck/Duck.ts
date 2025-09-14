import {type IFlyBehavior} from './Fly/IFlyBehavior'
import {type IQuackBehavior} from './Quack/IQuackBehavior'

abstract class Duck {
	private flyBehavior: IFlyBehavior
	private quackBehavior: IQuackBehavior

	constructor(flyBehavior: IFlyBehavior, quackBehavior: IQuackBehavior) {
		if (!quackBehavior) {
			throw new Error('quackBehavior is required')
		}
		if (!flyBehavior) {
			throw new Error('flyBehavior is required')
		}
		this.quackBehavior = quackBehavior
		this.flyBehavior = flyBehavior
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
		console.log('I\'m Dancing')
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
