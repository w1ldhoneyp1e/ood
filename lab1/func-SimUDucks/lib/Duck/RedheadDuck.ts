import {Counter} from './Counter/Counter'
import {createDanceMinuet} from './Dance/DanceMinuet'
import {type Duck, createDuck} from './Duck'
import {createFlyWithWings} from './Fly/FlyWithWings'
import {createNoGreetingEver} from './Greeting/NoGreetingEver'
import {createQuackBehavior} from './Quack/QuackBehavior'

const createRedheadDuck = (): Duck => createDuck({
	flyBehavior: createFlyWithWings,
	quackBehavior: createQuackBehavior,
	danceBehavior: createDanceMinuet,
	greetingBehavior: createNoGreetingEver,
	counter: new Counter(),
	display: () => {
		console.log('I\'m a redhead duck')
	},
})

export {
	createRedheadDuck,
}
