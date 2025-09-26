import {type IGreetingBehavior} from './IGreetingBehavior'

const MexicanGreeting = (): IGreetingBehavior => ({
	greeting(): void {
		console.log('Hola')
	},
})

export {
	MexicanGreeting,
}
