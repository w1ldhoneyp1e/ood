import {Counter} from './Counter/Counter'
import {createDanceWaltz} from './Dance/DanceWaltz'
import {type Duck, createDuck} from './Duck'
import {createFlyWithWings} from './Fly/FlyWithWings'
import {getFlightGreeting} from './Greeting/FlightGreeting'
import {createQuackBehavior} from './Quack/QuackBehavior'

const createMallardDuck = (): Duck => {
	const flyBehavior = createFlyWithWings
	const quackBehavior = createQuackBehavior
	const counter = new Counter()

	return createDuck({
		flyBehavior,
		quackBehavior,
		danceBehavior: createDanceWaltz,
		greetingBehavior: getFlightGreeting({ // замыкания
			flyBehavior,
			quackBehavior,
			counter,
		}),
		counter,
		display: () => {
			console.log('I\'m mallard duck')
		},
	})
}

export {
	createMallardDuck,
}
