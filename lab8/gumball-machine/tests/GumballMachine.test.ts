import {GumballMachine} from '../src/gumballMachine/GumballMachine'

describe('GumballMachine', () => {
	let consoleSpy: jest.SpyInstance

	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
	})

	afterEach(() => {
		consoleSpy.mockRestore()
	})

	describe('Initialization', () => {
		test('NoQuarter on start if balls > 0', () => {
			const machine = new GumballMachine(5)
			expect(machine.toString()).toContain('waiting for quarter')
			expect(machine.getBallCount()).toBe(5)
		})

		test('SoldOut on start if balls == 0', () => {
			const machine = new GumballMachine(0)
			expect(machine.toString()).toContain('sold out')
		})
	})

	describe('NoQuarterState', () => {
		let machine: GumballMachine

		beforeEach(() => {
			machine = new GumballMachine(5)
		})

		describe('insertQuarter', () => {
			test('HasQuarter on quarter inserted', () => {
				machine.insertQuarter()
				expect(machine.toString()).toContain('waiting for turn of crank')
				expect(consoleSpy).toHaveBeenCalledWith('You inserted a quarter')
			})
		})

		describe('ejectQuarter', () => {
			test('Error message on eject quarter', () => {
				machine.ejectQuarter()
				expect(machine.toString()).toContain('waiting for quarter')
				expect(consoleSpy).toHaveBeenCalledWith('You haven\'t inserted a quarter')
			})
		})

		describe('turnCrank', () => {
			test('Error message and not dispense on turn crank', () => {
				const initialCount = machine.getBallCount()
				machine.turnCrank()

				expect(machine.getBallCount()).toBe(initialCount)
				expect(machine.toString()).toContain('waiting for quarter')
				expect(consoleSpy).toHaveBeenCalledWith('You turned but there\'s no quarter')
				expect(consoleSpy).toHaveBeenCalledWith('You need to pay first')
			})
		})
	})

	describe('HasQuarterState', () => {
		let machine: GumballMachine

		beforeEach(() => {
			machine = new GumballMachine(5)
			machine.insertQuarter()
			consoleSpy.mockClear()
		})

		describe('insertQuarter', () => {
			test('Error message and stay in HasQuarterState on insert quarter', () => {
				machine.insertQuarter()
				expect(machine.toString()).toContain('waiting for turn of crank')
				expect(consoleSpy).toHaveBeenCalledWith('You can\'t insert another quarter')
			})
		})

		describe('ejectQuarter', () => {
			test('Return quarter and transition to NoQuarterState on eject quarter', () => {
				machine.ejectQuarter()
				expect(machine.toString()).toContain('waiting for quarter')
				expect(consoleSpy).toHaveBeenCalledWith('Quarter returned')
			})
		})

		describe('turnCrank', () => {
			test('Transition to SoldState and dispense gumball on turn crank', () => {
				const initialCount = machine.getBallCount()
				machine.turnCrank()

				expect(machine.getBallCount()).toBe(initialCount - 1)
				expect(consoleSpy).toHaveBeenCalledWith('You turned...')
				expect(consoleSpy).toHaveBeenCalledWith('A gumball comes rolling out the slot...')
			})

			test('Transition to SoldOutState when last ball dispensed', () => {
				const machineWithOneBall = new GumballMachine(1)
				machineWithOneBall.insertQuarter()
				consoleSpy.mockClear()

				machineWithOneBall.turnCrank()

				expect(machineWithOneBall.getBallCount()).toBe(0)
				expect(machineWithOneBall.toString()).toContain('sold out')
				expect(consoleSpy).toHaveBeenCalledWith('You turned...')
				expect(consoleSpy).toHaveBeenCalledWith('A gumball comes rolling out the slot...')
				expect(consoleSpy).toHaveBeenCalledWith('Oops, out of gumballs')
			})
		})
	})

	describe('SoldState', () => {
		describe('dispense behavior during turnCrank', () => {
			test('Transition to NoQuarterState after dispensing when balls remain', () => {
				const machine = new GumballMachine(3)
				machine.insertQuarter()
				consoleSpy.mockClear()

				machine.turnCrank()

				expect(machine.getBallCount()).toBe(2)
				expect(machine.toString()).toContain('waiting for quarter')
				expect(consoleSpy).toHaveBeenCalledWith('You turned...')
				expect(consoleSpy).toHaveBeenCalledWith('A gumball comes rolling out the slot...')
			})

			test('Transition to SoldOutState after dispensing last ball', () => {
				const machine = new GumballMachine(1)
				machine.insertQuarter()
				consoleSpy.mockClear()

				machine.turnCrank()

				expect(machine.getBallCount()).toBe(0)
				expect(machine.toString()).toContain('sold out')
				expect(consoleSpy).toHaveBeenCalledWith('You turned...')
				expect(consoleSpy).toHaveBeenCalledWith('A gumball comes rolling out the slot...')
				expect(consoleSpy).toHaveBeenCalledWith('Oops, out of gumballs')
			})
		})

		describe('actions after dispense (in NoQuarterState)', () => {
			test('Allow inserting quarter after successful dispense', () => {
				const machine = new GumballMachine(5)
				machine.insertQuarter()
				machine.turnCrank()
				consoleSpy.mockClear()

				machine.insertQuarter()
				expect(machine.toString()).toContain('waiting for turn of crank')
				expect(consoleSpy).toHaveBeenCalledWith('You inserted a quarter')
			})
		})

		describe('multiple turnCrank calls', () => {
			test('should not dispense twice without inserting quarter', () => {
				const machine = new GumballMachine(5)
				machine.insertQuarter()
				machine.turnCrank()
				const countAfterFirst = machine.getBallCount()
				consoleSpy.mockClear()

				machine.turnCrank()

				expect(machine.getBallCount()).toBe(countAfterFirst)
				expect(consoleSpy).toHaveBeenCalledWith('You turned but there\'s no quarter')
				expect(consoleSpy).toHaveBeenCalledWith('You need to pay first')
			})
		})
	})

	describe('SoldOutState', () => {
		let machine: GumballMachine

		beforeEach(() => {
			machine = new GumballMachine(0)
		})

		test('should not allow inserting quarter when sold out', () => {
			machine.insertQuarter()
			expect(consoleSpy).toHaveBeenCalledWith('You can\'t insert a quarter, the machine is sold out')
			expect(machine.toString()).toContain('sold out')
		})
	})

	describe('refill in each state', () => {
		test('refill in NoQuarter adds balls and keeps state', () => {
			const machine = new GumballMachine(2)
			consoleSpy.mockClear()

			machine.refill(3)

			expect(machine.getBallCount()).toBe(5)
			expect(machine.toString()).toContain('waiting for quarter')
			expect(consoleSpy).toHaveBeenCalledWith('Refilled. New count: 5')
		})

		test('refill in HasQuarter adds balls and keeps state', () => {
			const machine = new GumballMachine(2)
			machine.insertQuarter()
			consoleSpy.mockClear()

			machine.refill(2)

			expect(machine.getBallCount()).toBe(4)
			expect(machine.toString()).toContain('waiting for turn of crank')
			expect(consoleSpy).toHaveBeenCalledWith('Refilled. New count: 4')
		})

		test('refill in SoldState adds balls and keeps state', () => {
			const machine = new GumballMachine(2)
			machine.insertQuarter()
			machine.setSoldState()
			consoleSpy.mockClear()

			machine.refill(3)

			expect(machine.getBallCount()).toBe(5)
			expect(machine.toString()).toContain('delivering a gumball')
			expect(consoleSpy).toHaveBeenCalledWith('Refilled. New count: 5')
		})

		test('refill in SoldOut switches to NoQuarter', () => {
			const machine = new GumballMachine(0)
			consoleSpy.mockClear()

			machine.refill(4)

			expect(machine.getBallCount()).toBe(4)
			expect(machine.toString()).toContain('waiting for quarter')
			expect(consoleSpy).toHaveBeenCalledWith('Refilled. New count: 4')
		})
	})

	describe('multiple operations', () => {
		test('multiple operations in SoldState should not change state incorrectly', () => {
			const machine = new GumballMachine(5)
			machine.insertQuarter()
			machine.turnCrank()

			const countAfterFirstDispense = machine.getBallCount()
			machine.insertQuarter()
			machine.ejectQuarter()
			machine.turnCrank()

			expect(machine.getBallCount()).toBe(countAfterFirstDispense)
		})

		test('should handle multiple quarter insertions in HasQuarterState', () => {
			const machine = new GumballMachine(5)
			machine.insertQuarter()
			machine.insertQuarter()
			machine.insertQuarter()

			expect(machine.toString()).toContain('waiting for turn of crank')
			expect(consoleSpy).toHaveBeenCalledTimes(3)
			expect(consoleSpy).toHaveBeenNthCalledWith(1, 'You inserted a quarter')
			expect(consoleSpy).toHaveBeenNthCalledWith(2, 'You can\'t insert another quarter')
			expect(consoleSpy).toHaveBeenNthCalledWith(3, 'You can\'t insert another quarter')
		})
	})
})
