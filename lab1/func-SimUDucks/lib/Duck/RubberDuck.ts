import {Counter} from './Counter/Counter'
import {createDanceNever} from './Dance/DanceNever'
import {type Duck, createDuck} from './Duck'
import {createFlyNoWay} from './Fly/FlyNoWay'
import {createNoGreetingEver} from './Greeting/NoGreetingEver'
import {createSqueakBehavior} from './Quack/SqueakBehavior'

const createRubberDuck = (): Duck => createDuck({
	flyBehavior: createFlyNoWay,
	quackBehavior: createSqueakBehavior,
	danceBehavior: createDanceNever,
	greetingBehavior: createNoGreetingEver,
	counter: new Counter(),
	display: () => {
		console.log('I\'m a rubber duck')
	},
})

export {
	createRubberDuck,
}
