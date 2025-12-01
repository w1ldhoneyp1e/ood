import {type IMultiGumballMachine, type IMultiState} from '../IMultiGumballMachine'

class HasQuarterState implements IMultiState {
	private gumballMachine: IMultiGumballMachine

	constructor(gumballMachine: IMultiGumballMachine) {
		this.gumballMachine = gumballMachine
	}

	insertQuarter(): void {
		if (this.gumballMachine.getQuarterCount() < 5) {
			console.log('You inserted a quarter')
			this.gumballMachine.addQuarter()
		}
		else {
			console.log('You can\'t insert another quarter')
		}
	}

	ejectQuarter(): void {
		this.gumballMachine.returnQuarters()
		this.gumballMachine.setNoQuarterState()
	}

	turnCrank(): void {
		console.log('You turned...')
		this.gumballMachine.setSoldState()
	}

	dispense(): void {
		console.log('No gumball dispensed')
	}

	refill(count: number): void {
		this.gumballMachine.addBalls(count)
	}

	toString(): string {
		return 'waiting for turn of crank'
	}
}

export {
	HasQuarterState,
}

