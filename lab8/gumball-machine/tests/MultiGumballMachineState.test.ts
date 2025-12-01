import {MultiGumballMachine} from '../src/multiGumballMachine/state/MultiGumballMachine'

describe('MultiGumballMachine (State Pattern)', () => {
	let consoleSpy: jest.SpyInstance

	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
	})

	afterEach(() => {
		consoleSpy.mockRestore()
	})

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
})

