import {type IMultiGumballMachine, type IMultiState} from '../IMultiGumballMachine'

class NoQuarterState implements IMultiState {
	private gumballMachine: IMultiGumballMachine

	constructor(gumballMachine: IMultiGumballMachine) {
		this.gumballMachine = gumballMachine
	}

	insertQuarter(): void {
		const added = this.gumballMachine.tryAddQuarter()
		if (added) {
			this.gumballMachine.setHasQuarterState()
		}
	}

	ejectQuarter(): void {
		console.log('You haven\'t inserted a quarter')
	}

	turnCrank(): void {
		console.log('You turned but there\'s no quarter')
	}

	dispense(): void {
		console.log('You need to pay first')
	}

	refill(count: number): void {
		this.gumballMachine.addBalls(count)
	}

	toString(): string {
		return 'waiting for quarter'
	}
}

export {
	NoQuarterState,
}

