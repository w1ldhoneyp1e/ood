import {DanceMinuet} from '../lib/Duck/Dance/DanceMinuet'
import {DanceWaltz} from '../lib/Duck/Dance/DanceWaltz'
import {type IDanceBehavior} from '../lib/Duck/Dance/IDanceBehavior'
import {Duck} from '../lib/Duck/Duck'
import {type IFlyBehavior} from '../lib/Duck/Fly/IFlyBehavior'
import {type IQuackBehavior} from '../lib/Duck/Quack/IQuackBehavior'

class TestDuck extends Duck {
	display(): void {
		console.log('Test duck display')
	}
}

class MockCantFlyBehavior implements IFlyBehavior {
	canFly = false
	flightCounter = null
	fly = jest.fn()
}

class MockCanFlyBehavior implements IFlyBehavior {
	canFly = true
	flightCounter = 0
	fly(): void {
		this.flightCounter++
	}
}

class MockCanQuackBehavior implements IQuackBehavior {
	quackable = true
	quack = jest.fn()
}

class MockCantQuackBehavior implements IQuackBehavior {
	quackable = false
	quack = jest.fn()
}

class MockDanceBehavior implements IDanceBehavior {
	dance = jest.fn()
}

describe('Afterfly greetings', () => {
	it('can fly - can quack - fly - greeting', () => {
		const flyBehavior = new MockCanFlyBehavior()
		const quackBehavior = new MockCanQuackBehavior()
		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')
		const duck = new TestDuck(
			flyBehavior,
			quackBehavior,
			new MockDanceBehavior(),
		)

		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(2)
		expect(spyQuack).toHaveBeenCalledTimes(1)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})

	it('can fly - cant quack - fly - nothing', () => {
		const flyBehavior = new MockCanFlyBehavior()
		const quackBehavior = new MockCantQuackBehavior()
		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')
		const duck = new TestDuck(
			flyBehavior,
			quackBehavior,
			new MockDanceBehavior(),
		)

		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(2)
		expect(spyQuack).toHaveBeenCalledTimes(0)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})

	it('cant fly - can quack - fly - nothing', () => {
		const flyBehavior = new MockCantFlyBehavior()
		const quackBehavior = new MockCanQuackBehavior()
		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')
		const duck = new TestDuck(
			flyBehavior,
			quackBehavior,
			new MockDanceBehavior(),
		)

		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(2)
		expect(spyQuack).toHaveBeenCalledTimes(0)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})

	it('cant fly - cant quack - fly - nothing', () => {
		const flyBehavior = new MockCantFlyBehavior()
		const quackBehavior = new MockCantQuackBehavior()
		const spyFly = jest.spyOn(flyBehavior, 'fly')
		const spyQuack = jest.spyOn(quackBehavior, 'quack')
		const duck = new TestDuck(
			flyBehavior,
			quackBehavior,
			new MockDanceBehavior(),
		)

		duck.fly()
		duck.fly()

		expect(spyFly).toHaveBeenCalledTimes(2)
		expect(spyQuack).toHaveBeenCalledTimes(0)

		spyFly.mockRestore()
		spyQuack.mockRestore()
	})
})
