import {type Counter} from '../Counter/Counter'
import {type IFlyBehavior} from '../Fly/IFlyBehavior'
import {type IQuackBehavior} from '../Quack/IQuackBehavior'
import {type IGreetingBehavior} from './IGreetingBehavior'

interface FlightGreetingArgs {
	flyBehavior: IFlyBehavior,
	quackBehavior: IQuackBehavior,
	counter: Counter,
}

const createFlightGreeting = ({
	flyBehavior,
	quackBehavior,
	counter,
}: FlightGreetingArgs): IGreetingBehavior => ({
	greeting(): void {
		const quackable = quackBehavior.quackable
		const canFly = flyBehavior.canFly

		console.log('canFly', canFly)
		console.log('counter.getCount() % 2 === 0', counter.getCount() % 2 === 0)
		console.log('quackable', quackable)

		if (
			canFly
                && counter.getCount() % 2 === 0
                && quackable
		) {
			console.log('quacked')
			quackBehavior.quack()
		}
	},
})

export {
	createFlightGreeting,
}
