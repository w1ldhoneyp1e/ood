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

	describe('State transitions', () => {
		test('complete flow: NoQuarter -> HasQuarter -> Sold -> NoQuarter', () => {
			const machine = new GumballMachine(5)

			expect(machine.toString()).toContain('waiting for quarter')

			machine.insertQuarter()
			expect(machine.toString()).toContain('waiting for turn of crank')

			machine.turnCrank()
			expect(machine.toString()).toContain('waiting for quarter')
			expect(machine.getBallCount()).toBe(4)
		})

		test('complete flow with ejection: NoQuarter -> HasQuarter -> NoQuarter', () => {
			const machine = new GumballMachine(5)

			machine.insertQuarter()
			expect(machine.toString()).toContain('waiting for turn of crank')

			machine.ejectQuarter()
			expect(machine.toString()).toContain('waiting for quarter')
		})

		test('complete flow to sold out: NoQuarter -> HasQuarter -> Sold -> SoldOut', () => {
			const machine = new GumballMachine(1)

			machine.insertQuarter()
			machine.turnCrank()

			expect(machine.getBallCount()).toBe(0)
			expect(machine.toString()).toContain('sold out')
		})
	})

	describe('Edge cases', () => {
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
