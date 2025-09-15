import {type Counter} from '../Counter/Counter'
import {FlyAbility} from '../Fly/FlyAbility'
import {type IFlyBehavior} from '../Fly/IFlyBehavior'
import {type IQuackBehavior} from '../Quack/IQuackBehavior'
import {QuackAbility} from '../Quack/QuackAbility'
import {type IGreetingBehavior} from './IGreetingBehavior'

// вынести в отдельное поведение - интерфейс
class FlightGreeting implements IGreetingBehavior {
	private quackBehavior: IQuackBehavior
	private quackable: boolean
	private counter: Counter
	private canFly: boolean

	constructor(flyBehavior: IFlyBehavior, quackBehavior: IQuackBehavior, counter: Counter) {
		if (!quackBehavior) {
			throw new Error('quackBehavior is required')
		}
		if (!flyBehavior) {
			throw new Error('flyBehavior is required')
		}
		this.quackBehavior = quackBehavior
		this.quackable = quackBehavior instanceof QuackAbility
		this.counter = counter
		this.canFly = flyBehavior instanceof FlyAbility
	}

	greeting(): void {
		if (            // вынести в отдельную стратегию состяния
			this.canFly // возможно стоит вынести перед fly
			&& this.counter.getCount() % 2 === 0
			&& this.quackable
		) {
			this.quackBehavior.quack()
		}
	}
}

export {
	FlightGreeting,
}
