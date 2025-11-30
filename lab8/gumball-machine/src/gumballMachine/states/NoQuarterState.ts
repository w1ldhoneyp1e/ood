import {type IGumballMachine, type IState} from '../IGumballMachine'

class NoQuarterState implements IState {
	private gumballMachine: IGumballMachine

	constructor(gumballMachine: IGumballMachine) {
		this.gumballMachine = gumballMachine
	}

	insertQuarter(): void {
		console.log('You inserted a quarter')
		this.gumballMachine.setHasQuarterState()
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

	toString(): string {
		return 'waiting for quarter'
	}
}

export {
	NoQuarterState,
}

