import {DanceMinuet} from '../lib/Duck/Dance/DanceMinuet'
import {DanceWaltz} from '../lib/Duck/Dance/DanceWaltz'
import {Duck} from '../lib/Duck/Duck'
import {type IFlyBehavior} from '../lib/Duck/Fly/IFlyBehavior'
import {type IQuackBehavior} from '../lib/Duck/Quack/IQuackBehavior'

class TestDuck extends Duck {
	display(): void {
		console.log('Test duck display')
	}
}

class MockFlyBehavior implements IFlyBehavior {
	fly = jest.fn()
}

class MockQuackBehavior implements IQuackBehavior {
	quack = jest.fn()
}

describe('Dance', () => {
	it('dance called once', () => {
		const danceBehavior = new DanceWaltz()
		const spy = jest.spyOn(danceBehavior, 'dance')
		const duck = new TestDuck(
			new MockFlyBehavior(),
			new MockQuackBehavior(),
			danceBehavior,
		)

		duck.dance()

		expect(spy).toHaveBeenCalledTimes(1)

		spy.mockRestore()
	})

	it('dance called multiple times', () => {
		const danceBehavior = new DanceMinuet()
		const spy = jest.spyOn(danceBehavior, 'dance')
		const duck = new TestDuck(
			new MockFlyBehavior(),
			new MockQuackBehavior(),
			danceBehavior,
		)

		duck.dance()
		duck.dance()
		duck.dance()

		expect(spy).toHaveBeenCalledTimes(3)

		spy.mockRestore()
	})
})
