import {Counter} from '../lib/Duck/Counter/Counter'
import {type IDanceBehavior} from '../lib/Duck/Dance/IDanceBehavior'
import {type Duck, createDuck} from '../lib/Duck/Duck'
import {type IFlyBehavior} from '../lib/Duck/Fly/IFlyBehavior'
import {getFlightGreeting} from '../lib/Duck/Greeting/FlightGreeting'
import {type IQuackBehavior} from '../lib/Duck/Quack/IQuackBehavior'

const createMockCantFlyBehavior = undefined
const createMockCanFlyBehavior = (): IFlyBehavior => jest.fn()
const createMockCanQuackBehavior = (): IQuackBehavior => jest.fn()
const createMockCantQuackBehavior = undefined
const createMockDanceBehavior = (): IDanceBehavior => jest.fn()

interface CreateTestDuckArgs {
	flyBehavior?: IFlyBehavior,
	quackBehavior?: IQuackBehavior,
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
		greetingBehavior: getFlightGreeting({
			flyBehavior,
			quackBehavior,
			counter,
		}),
		counter,
		display: jest.fn(),
	})
}

describe('Afterfly greetings', () => {
	it('should quack on every second flight when can fly and quack', () => {
		const flyBehavior = createMockCanFlyBehavior()
		const quackBehavior = createMockCanQuackBehavior()
		const duck = createTestDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior: createMockDanceBehavior(),
		})

		duck.fly()
		duck.fly()

		expect(flyBehavior).toHaveBeenCalledTimes(2)
		expect(quackBehavior).toHaveBeenCalledTimes(1)
	})

	it('should not quack when cannot quack', () => {
		const flyBehavior = createMockCanFlyBehavior()
		const quackBehavior = createMockCantQuackBehavior
		const duck = createTestDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior: createMockDanceBehavior(),
		})

		duck.fly()
		duck.fly()

		expect(flyBehavior).toHaveBeenCalledTimes(2)
	})

	it('should not quack when cannot fly', () => {
		const flyBehavior = createMockCantFlyBehavior
		const quackBehavior = createMockCanQuackBehavior()
		const duck = createTestDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior: createMockDanceBehavior(),
		})

		duck.fly()
		duck.fly()

		expect(quackBehavior).toHaveBeenCalledTimes(0)
	})

	it('should not quack when cannot fly and cannot quack', () => {
		const flyBehavior = createMockCantFlyBehavior
		const quackBehavior = createMockCantQuackBehavior
		const duck = createTestDuck({
			flyBehavior,
			quackBehavior,
			danceBehavior: createMockDanceBehavior(),
		})

		duck.fly()
		duck.fly()
	})
})
