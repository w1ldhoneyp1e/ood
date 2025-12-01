import {type IMultiGumballMachine, type IMultiState} from '../IMultiGumballMachine'

class SoldOutState implements IMultiState {
	private gumballMachine: IMultiGumballMachine

	constructor(gumballMachine: IMultiGumballMachine) {
		this.gumballMachine = gumballMachine
	}

	insertQuarter(): void {
		console.log('You can\'t insert a quarter, the machine is sold out')
	}

	ejectQuarter(): void {
		if (this.gumballMachine.getQuarterCount() > 0) {
			this.gumballMachine.returnQuarters()
		}
		else {
			console.log('You can\'t eject, you haven\'t inserted a quarter yet')
		}
	}

	turnCrank(): void {
		console.log('You turned but there\'s no gumballs')
	}

	dispense(): void {
		console.log('No gumball dispensed')
	}

	refill(count: number): void {
		this.gumballMachine.addBalls(count)
		if (this.gumballMachine.getBallCount() > 0) {
			if (this.gumballMachine.getQuarterCount() > 0) {
				this.gumballMachine.setHasQuarterState()
			}
			else {
				this.gumballMachine.setNoQuarterState()
			}
		}
	}

	toString(): string {
		return 'sold out'
	}
}

export {
	SoldOutState,
}

