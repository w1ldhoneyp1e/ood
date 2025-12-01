import {type IMultiGumballMachine, type IMultiState} from './IMultiGumballMachine'
import {HasQuarterState} from './states/HasQuarterState'
import {NoQuarterState} from './states/NoQuarterState'
import {SoldOutState} from './states/SoldOutState'
import {SoldState} from './states/SoldState'

class MultiGumballMachine implements IMultiGumballMachine {
	private soldState: IMultiState
	private soldOutState: IMultiState
	private noQuarterState: IMultiState
	private hasQuarterState: IMultiState

	private state: IMultiState
	private count = 0
	private quarterCount = 0

	constructor(numberBalls: number) {
		this.soldState = new SoldState(this)
		this.soldOutState = new SoldOutState(this)
		this.noQuarterState = new NoQuarterState(this)
		this.hasQuarterState = new HasQuarterState(this)

		this.count = numberBalls
		if (this.count > 0) {
			this.state = this.noQuarterState
		}
		else {
			this.state = this.soldOutState
		}
	}

	insertQuarter(): void {
		this.state.insertQuarter()
	}

	ejectQuarter(): void {
		this.state.ejectQuarter()
	}

	turnCrank(): void {
		this.state.turnCrank()
		this.state.dispense()
	}

	refill(count: number): void {
		this.state.refill(count)
	}

	releaseBall(): void {
		if (this.count !== 0) {
			console.log('A gumball comes rolling out the slot...')
			this.count--
		}
	}

	addBalls(count: number): void {
		this.count += count
		console.log(`Refilled. New count: ${this.count}`)
	}

	getBallCount(): number {
		return this.count
	}

	addQuarter(): void {
		this.quarterCount++
	}

	getQuarterCount(): number {
		return this.quarterCount
	}

	useQuarter(): void {
		if (this.quarterCount > 0) {
			this.quarterCount--
		}
	}

	returnQuarters(): void {
		console.log(`${this.quarterCount} quarter(s) returned`)
		this.quarterCount = 0
	}

	setSoldOutState(): void {
		this.state = this.soldOutState
	}

	setNoQuarterState(): void {
		this.state = this.noQuarterState
	}

	setSoldState(): void {
		this.state = this.soldState
	}

	setHasQuarterState(): void {
		this.state = this.hasQuarterState
	}

	toString(): string {
		const stateDesc = this.state.toString()
		const ending = this.count !== 1
			? 's'
			: ''
		const inventory = `Inventory: ${this.count} gumball${ending}`
		const quarters = `Quarters: ${this.quarterCount}`
		const machineState = `Machine is ${stateDesc}`

		return `
            Mighty Gumball, Inc.
            TypeScript-enabled Standing Gumball Model #2024 (Multi State)
            ${inventory}
            ${quarters}
            ${machineState}
        `
	}
}

export {
	MultiGumballMachine,
}

