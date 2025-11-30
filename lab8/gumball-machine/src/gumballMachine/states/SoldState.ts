import {type IGumballMachine, type IState} from '../IGumballMachine'

class SoldState implements IState {
	private gumballMachine: IGumballMachine

	constructor(gumballMachine: IGumballMachine) {
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
		if (this.gumballMachine.getBallCount() > 0) {
			this.gumballMachine.setNoQuarterState()
		}
		else {
			console.log('Oops, out of gumballs')
			this.gumballMachine.setSoldOutState()
		}
	}

	toString(): string {
		return 'delivering a gumball'
	}
}

export {
	SoldState,
}

