import {type Counter} from './Counter/Counter'
import {type IDanceBehavior} from './Dance/IDanceBehavior'
import {type IFlyBehavior} from './Fly/IFlyBehavior'
import {FlightGreeting} from './Greeting/FlightGreeting'
import {type IGreetingBehavior} from './Greeting/IGreetingBehavior'
import {type IQuackBehavior} from './Quack/IQuackBehavior'

abstract class Duck {
	private flyBehavior: IFlyBehavior
	private quackBehavior: IQuackBehavior
	private danceBehavior: IDanceBehavior
	private afterflyGreeting: IGreetingBehavior
	private flightCounter: Counter

	constructor(
		flyBehavior: IFlyBehavior,
		quackBehavior: IQuackBehavior,
		danceBehavior: IDanceBehavior,
		greetingBegavior: IGreetingBehavior,
		counter: Counter,
	) {
		if (!quackBehavior) {
			throw new Error('quackBehavior is required')
		}
		if (!flyBehavior) {
			throw new Error('flyBehavior is required')
		}
		if (!danceBehavior) {
			throw new Error('danceBehavior is required')
		}
		if (!greetingBegavior) {
			throw new Error('greetingBegavior is required')
		}
		this.quackBehavior = quackBehavior
		this.flyBehavior = flyBehavior
		this.danceBehavior = danceBehavior
		this.afterflyGreeting = greetingBegavior
		this.flightCounter = counter
	}

	quack(): void {
		this.quackBehavior.quack()
	}

	swim(): void {
		console.log('I\'m swimming')
	}

	fly(): void {
		this.flyBehavior.fly()
		this.flightCounter.increase()
		this.afterflyGreeting.greeting()
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
