import {Counter} from '../lib/Duck/Counter/Counter'
import {type IDanceBehavior} from '../lib/Duck/Dance/IDanceBehavior'
import {type Duck, createDuck} from '../lib/Duck/Duck'
import {type IFlyBehavior} from '../lib/Duck/Fly/IFlyBehavior'
import {createFlightGreeting} from '../lib/Duck/Greeting/FlightGreeting'
import {type IQuackBehavior} from '../lib/Duck/Quack/IQuackBehavior'

const createMockCantFlyBehavior = (): IFlyBehavior => ({
	fly: jest.fn(),
	canFly: false,
})

const createMockCanFlyBehavior = (): IFlyBehavior => ({
	fly: () => {
		console.log('I can fly')
	},
	canFly: true,
})

const createMockCanQuackBehavior = (): IQuackBehavior => ({
	quack: jest.fn(),
	quackable: true,
})

const createMockCantQuackBehavior = (): IQuackBehavior => ({
	quack: jest.fn(),
	quackable: false,
})

const createMockDanceBehavior = (): IDanceBehavior => ({
	dance: jest.fn(),
})

interface CreateTestDuckArgs {
	flyBehavior: IFlyBehavior,
	quackBehavior: IQuackBehavior,
	danceBehavior: IDanceBehavior,
}

const createTestDuck = ({
	flyBehavior,
	quackBehavior,
	danceBehavior,
}: CreateTestDuckArgs): Duck => {
	const counter = new Counter()

	return createDuck({
		flyBehavior,
		quackBehavior,
		danceBehavior,
		greetingBehavior: createFlightGreeting({
			flyBehavior,
			quackBehavior,
			counter,
		}),
		counter,
		display: () => {
			console.log('I\'m a test duck')
		},
	})
}

describe('Afterfly greetings', () => {
	it('can fly - can quack - fly - greeting', () => {
		const flyBehavior = createMockCanFlyBehavior()
		const quackBehavior = createMockCanQuackBehavior()
		const danceBehavior = createMockDanceBehavior()
		const counter = new Counter()
		const greetingBehavior = createFlightGreeting({
			flyBehavior,
			quackBehavior,
			counter,
		})

		const duck = createDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior,
			greetingBehavior,
			counter,
			display: () => {
				console.log('I\'m a test duck')
			},
		})

		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')

		duck.fly()
		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(3)
		expect(spyQuack).toHaveBeenCalledTimes(1)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})

	it('can fly - cant quack - fly - nothing', () => {
		const flyBehavior = createMockCanFlyBehavior()
		const quackBehavior = createMockCantQuackBehavior()
		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')
		const duck = createTestDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior: createMockDanceBehavior(),
		})

		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(2)
		expect(spyQuack).toHaveBeenCalledTimes(0)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})

	it('cant fly - can quack - fly - nothing', () => {
		const flyBehavior = createMockCantFlyBehavior()
		const quackBehavior = createMockCanQuackBehavior()
		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')
		const duck = createTestDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior: createMockDanceBehavior(),
		})

		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(2)
		expect(spyQuack).toHaveBeenCalledTimes(0)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})

	it('cant fly - cant quack - fly - nothing', () => {
		const flyBehavior = createMockCantFlyBehavior()
		const quackBehavior = createMockCantQuackBehavior()
		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')
		const duck = createTestDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior: createMockDanceBehavior(),
		})

		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(2)
		expect(spyQuack).toHaveBeenCalledTimes(0)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})
})
