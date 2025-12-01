import {type IMultiGumballMachine, type IMultiState} from '../IMultiGumballMachine'

class SoldState implements IMultiState {
	private gumballMachine: IMultiGumballMachine

	constructor(gumballMachine: IMultiGumballMachine) {
		this.gumballMachine = gumballMachine
	}

	insertQuarter(): void {
		console.log('Please wait, we\'re already giving you a gumball')
	}

	ejectQuarter(): void {
		console.log('Sorry you already turned the crank')
	}

	turnCrank(): void {
		console.log('Turning twice doesn\'t get you another gumball')
	}

	dispense(): void {
		this.gumballMachine.releaseBall()
		this.gumballMachine.useQuarter()

		if (this.gumballMachine.getBallCount() > 0) {
			if (this.gumballMachine.getQuarterCount() > 0) {
				this.gumballMachine.setHasQuarterState()
			}
			else {
				this.gumballMachine.setNoQuarterState()
			}
		}
		else {
			console.log('Oops, out of gumballs')
			this.gumballMachine.setSoldOutState()
		}
	}

	refill(count: number): void {
		console.log('Cannot refill while dispensing')
	}

	toString(): string {
		return 'delivering a gumball'
	}
}

export {
	SoldState,
}

