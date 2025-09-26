import {Counter} from './Counter/Counter'
import {createDanceNever} from './Dance/DanceNever'
import {type Duck, createDuck} from './Duck'
import {createFlyNoWay} from './Fly/FlyNoWay'
import {createNoGreetingEver} from './Greeting/NoGreetingEver'
import {createQuackBehavior} from './Quack/QuackBehavior'

const createModelDuck = (): Duck => createDuck({
	flyBehavior: createFlyNoWay(),
	quackBehavior: createQuackBehavior(),
	danceBehavior: createDanceNever(),
	greetingBegavior: createNoGreetingEver(),
	counter: new Counter(),
	display: () => {
		console.log('I\'m a model duck')
	},
})

export {
	createModelDuck,
}
