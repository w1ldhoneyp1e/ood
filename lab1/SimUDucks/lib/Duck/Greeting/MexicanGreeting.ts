import {type IGreetingBehavior} from './IGreetingBehavior'

class MexicanGreeting implements IGreetingBehavior {
	greeting(): void {
		console.log('Hola')
	}
}

export {
	MexicanGreeting,
}
