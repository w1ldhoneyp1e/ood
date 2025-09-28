import {Counter} from './Counter/Counter'
import {createDanceNever} from './Dance/DanceNever'
import {type Duck, createDuck} from './Duck'
import {createFlyNoWay} from './Fly/FlyNoWay'
import {createNoGreetingEver} from './Greeting/NoGreetingEver'
import {createMuteQuackBehavior} from './Quack/MuteQuackBehavior'

const createDecoyDuck = (): Duck => createDuck({
	flyBehavior: createFlyNoWay,
	quackBehavior: createMuteQuackBehavior,
	danceBehavior: createDanceNever,
	greetingBehavior: createNoGreetingEver,
	counter: new Counter(),
	display: () => {
		console.log('I\'m a decoy duck')
	},
})

export {
	createDecoyDuck,
}
