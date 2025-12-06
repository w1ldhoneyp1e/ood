
interface IMultiState {
	insertQuarter: () => void,
	ejectQuarter: () => void,
	turnCrank: () => void,
	dispense: () => void,
	refill: (count: number) => void,
	toString: () => string,
}

interface IMultiGumballMachine {
	releaseBall: () => void,
	getBallCount: () => number,
	addBalls: (count: number) => void,

	tryAddQuarter: () => boolean,
	getQuarterCount: () => number,
	useQuarter: () => void,
	returnQuarters: () => void,

	setSoldOutState: () => void,
	setNoQuarterState: () => void,
	setSoldState: () => void,
	setHasQuarterState: () => void,
}

export {
	IMultiState,
	IMultiGumballMachine,
}

