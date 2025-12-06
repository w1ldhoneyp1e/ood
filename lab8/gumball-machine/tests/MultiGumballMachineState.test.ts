import {MultiGumballMachine} from '../src/multiGumballMachine/state/MultiGumballMachine'

describe('MultiGumballMachine (State Pattern)', () => {
	let consoleSpy: jest.SpyInstance

	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
	})

	afterEach(() => {
		consoleSpy.mockRestore()
	})

	// проверить каждое состояние на insertQuarter
	// проверить каждое состояние на refill

	test('should accept up to 5 quarters', () => {
		const machine = new MultiGumballMachine(5)

		for (let i = 0; i < 5; i++) {
			machine.insertQuarter()
		}
		expect(machine.getQuarterCount()).toBe(5)

		machine.insertQuarter()
		expect(machine.getQuarterCount()).toBe(5)
		expect(consoleSpy).toHaveBeenCalledWith('You can\'t insert another quarter')
	})

	test('should dispense one ball per turn and decrement quarters', () => {
		const machine = new MultiGumballMachine(5)
		machine.insertQuarter()
		machine.insertQuarter()

		machine.turnCrank()
		expect(machine.getBallCount()).toBe(4)
		expect(machine.getQuarterCount()).toBe(1)
		expect(consoleSpy).toHaveBeenCalledWith('A gumball comes rolling out the slot...')

		machine.turnCrank()
		expect(machine.getBallCount()).toBe(3)
		expect(machine.getQuarterCount()).toBe(0)
	})

	test('should return all quarters on eject', () => {
		const machine = new MultiGumballMachine(5)
		machine.insertQuarter()
		machine.insertQuarter()

		machine.ejectQuarter()
		expect(machine.getQuarterCount()).toBe(0)
		expect(consoleSpy).toHaveBeenCalledWith('2 quarter(s) returned')
	})

	test('should allow ejecting quarters after sold out', () => {
		const machine = new MultiGumballMachine(1)
		machine.insertQuarter()
		machine.insertQuarter()

		machine.turnCrank()
		expect(machine.getBallCount()).toBe(0)
		expect(machine.getQuarterCount()).toBe(1)
		expect(machine.toString()).toContain('sold out')

		machine.ejectQuarter()
		expect(machine.getQuarterCount()).toBe(0)
		expect(consoleSpy).toHaveBeenCalledWith('1 quarter(s) returned')
	})

	test('should allow refill in NoQuarter state', () => {
		const machine = new MultiGumballMachine(0)
		machine.refill(5)
		expect(machine.getBallCount()).toBe(5)
		expect(machine.toString()).toContain('waiting for quarter')
	})

	test('should allow refill in SoldOut state with coins (updating to HasQuarter)', () => {
		const machine = new MultiGumballMachine(1)
		machine.insertQuarter()
		machine.insertQuarter()
		machine.turnCrank()

		expect(machine.getBallCount()).toBe(0)
		expect(machine.getQuarterCount()).toBe(1)

		machine.refill(5)
		expect(machine.getBallCount()).toBe(5)
		expect(machine.getQuarterCount()).toBe(1)
		expect(machine.toString()).toContain('waiting for turn of crank')
	})

	describe('refill in each state', () => {
		test('refill in NoQuarter keeps NoQuarter', () => {
			const machine = new MultiGumballMachine(2)
			machine.refill(3)
			expect(machine.getBallCount()).toBe(5)
			expect(machine.toString()).toContain('waiting for quarter')
		})

		test('refill in HasQuarter keeps HasQuarter', () => {
			const machine = new MultiGumballMachine(2)
			machine.insertQuarter()
			consoleSpy.mockClear()

			machine.refill(3)
			expect(machine.getBallCount()).toBe(5)
			expect(machine.toString()).toContain('waiting for turn of crank')
			expect(consoleSpy).toHaveBeenCalledWith('Refilled. New count: 5')
		})

		test('refill in SoldState is rejected', () => {
			const machine = new MultiGumballMachine(2)
			machine.insertQuarter()
			machine.setSoldState()
			consoleSpy.mockClear()

			machine.refill(3)
			expect(machine.getBallCount()).toBe(2)
			expect(consoleSpy).toHaveBeenCalledWith('Cannot refill while dispensing')
		})

		test('refill in SoldOut switches to correct state', () => {
			const machine = new MultiGumballMachine(0)
			machine.refill(4)
			expect(machine.getBallCount()).toBe(4)
			expect(machine.toString()).toContain('waiting for quarter')

			const machineWithCoins = new MultiGumballMachine(1)
			machineWithCoins.insertQuarter()
			machineWithCoins.turnCrank()
			expect(machineWithCoins.getQuarterCount()).toBe(1)
			consoleSpy.mockClear()

			machineWithCoins.refill(4)
			expect(machineWithCoins.getBallCount()).toBe(4)
			expect(machineWithCoins.toString()).toContain('waiting for turn of crank')
		})
	})

	describe('insertQuarter in each state', () => {
		test('NoQuarter -> HasQuarter on insert', () => {
			const machine = new MultiGumballMachine(3)
			machine.insertQuarter()
			expect(machine.getQuarterCount()).toBe(1)
			expect(machine.toString()).toContain('waiting for turn of crank')
			expect(consoleSpy).toHaveBeenCalledWith('You inserted a quarter')
		})

		test('HasQuarter accepts until limit', () => {
			const machine = new MultiGumballMachine(5)
			machine.insertQuarter()
			consoleSpy.mockClear()

			for (let i = 0; i < 5; i++) {
				machine.insertQuarter()
			}

			expect(machine.getQuarterCount()).toBe(5)
			expect(consoleSpy).toHaveBeenLastCalledWith('You can\'t insert another quarter')
		})

		test('SoldState rejects insert', () => {
			const machine = new MultiGumballMachine(2)
			machine.insertQuarter()
			machine.setSoldState()
			consoleSpy.mockClear()

			machine.insertQuarter()
			expect(consoleSpy).toHaveBeenCalledWith('Please wait, we\'re already giving you a gumball')
		})

		test('SoldOut rejects insert', () => {
			const machine = new MultiGumballMachine(0)

			machine.insertQuarter()
			expect(consoleSpy).toHaveBeenCalledWith('You can\'t insert a quarter, the machine is sold out')
		})
	})
})

