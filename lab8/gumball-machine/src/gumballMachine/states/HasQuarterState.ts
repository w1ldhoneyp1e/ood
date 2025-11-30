import {type IGumballMachine, type IState} from '../IGumballMachine'

class HasQuarterState implements IState {
	private gumballMachine: IGumballMachine

	constructor(gumballMachine: IGumballMachine) {
		this.gumballMachine = gumballMachine
	}

	insertQuarter(): void {
		console.log('You can\'t insert another quarter')
	}

	ejectQuarter(): void {
		console.log('Quarter returned')
		this.gumballMachine.setNoQuarterState()
	}

	turnCrank(): void {
		console.log('You turned...')
		this.gumballMachine.setSoldState()
	}

	dispense(): void {
		console.log('No gumball dispensed')
	}

	toString(): string {
		return 'waiting for turn of crank'
	}
}

export {
	HasQuarterState,
}

