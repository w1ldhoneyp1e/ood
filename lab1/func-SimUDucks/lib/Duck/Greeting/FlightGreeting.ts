import {type Counter} from '../Counter/Counter'
import {type IFlyBehavior} from '../Fly/IFlyBehavior'
import {type IQuackBehavior} from '../Quack/IQuackBehavior'
import {type IGreetingBehavior} from './IGreetingBehavior'

interface FlightGreetingArgs {
	flyBehavior?: IFlyBehavior,
	quackBehavior?: IQuackBehavior,
	counter?: Counter,
}

const getFlightGreeting = ({
	flyBehavior,
	quackBehavior,
	counter,
}: FlightGreetingArgs): IGreetingBehavior => () => {
	const quackable = !!quackBehavior
	const canFly = !!flyBehavior

	if (
		canFly
		&& counter
		&& counter.getCount() % 2 === 0
		&& quackable
	) {
		console.log('quacked')
		quackBehavior()
	}
}

export {
	getFlightGreeting,
}
