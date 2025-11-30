enum NAIVE_STATE {
	soldOut = 'SoldOut',
	noQuarter = 'NoQuarter',
	hasQuarter = 'HasQuarter',
	sold = 'Sold',
}

class NaiveMultiGumballMachine {
	private count = 0
	private quarterCount = 0
	private state: NAIVE_STATE

	constructor(count: number) {
		this.count = count
		this.state = count > 0
			? NAIVE_STATE.noQuarter
			: NAIVE_STATE.soldOut
	}

	insertQuarter(): void {
		switch (this.state) {
			case NAIVE_STATE.soldOut:
				console.log('You can\'t insert a quarter, the machine is sold out')
				break
			case NAIVE_STATE.noQuarter:
				console.log('You inserted a quarter')
				this.quarterCount++
				this.state = NAIVE_STATE.hasQuarter
				break
			case NAIVE_STATE.hasQuarter:
				if (this.quarterCount < 5) {
					console.log('You inserted a quarter')
					this.quarterCount++
				}
				else {
					console.log('You can\'t insert another quarter')
				}
				break
			case NAIVE_STATE.sold:
				console.log('Please wait, we\'re already giving you a gumball')
				break
		}
	}

	ejectQuarter(): void {
		switch (this.state) {
			case NAIVE_STATE.hasQuarter:
				console.log(`${this.quarterCount} quarter(s) returned`)
				this.quarterCount = 0
				this.state = NAIVE_STATE.noQuarter
				break
			case NAIVE_STATE.noQuarter:
				console.log('You haven\'t inserted a quarter')
				break
			case NAIVE_STATE.sold:
				console.log('Sorry you already turned the crank')
				break
			case NAIVE_STATE.soldOut:
				if (this.quarterCount > 0) {
					console.log(`${this.quarterCount} quarter(s) returned`)
					this.quarterCount = 0
				}
				else {
					console.log('You can\'t eject, you haven\'t inserted a quarter yet')
				}
				break
		}
	}

	turnCrank(): void {
		switch (this.state) {
			case NAIVE_STATE.soldOut:
				console.log('You turned but there\'s no gumballs')
				break
			case NAIVE_STATE.noQuarter:
				console.log('You turned but there\'s no quarter')
				break
			case NAIVE_STATE.hasQuarter:
				console.log('You turned...')
				this.state = NAIVE_STATE.sold
				this.dispense()
				break
			case NAIVE_STATE.sold:
				console.log('Turning twice doesn\'t get you another gumball')
				break
		}
	}

	private dispense(): void {
		switch (this.state) {
			case NAIVE_STATE.sold:
				console.log('A gumball comes rolling out the slot')
				this.count--
				this.quarterCount--

				if (this.count === 0) {
					console.log('Oops, out of gumballs')
					this.state = NAIVE_STATE.soldOut
				}
				else if (this.quarterCount > 0) {
					this.state = NAIVE_STATE.hasQuarter
				}
				else {
					this.state = NAIVE_STATE.noQuarter
				}
				break
			case NAIVE_STATE.noQuarter:
				console.log('You need to pay first')
				break
			case NAIVE_STATE.soldOut:
			case NAIVE_STATE.hasQuarter:
				console.log('No gumball dispensed')
				break
		}
	}

	refill(count: number): void {
		this.count += count
		console.log(`Refilled. New count: ${this.count}`)
		if (this.state === NAIVE_STATE.soldOut && this.count > 0) {
			if (this.quarterCount > 0) {
				this.state = NAIVE_STATE.hasQuarter
			}
			else {
				this.state = NAIVE_STATE.noQuarter
			}
		}
	}

	toString(): string {
		let stateDesc = ''
		switch (this.state) {
			case NAIVE_STATE.soldOut:
				stateDesc = 'sold out'
				break
			case NAIVE_STATE.noQuarter:
				stateDesc = 'waiting for quarter'
				break
			case NAIVE_STATE.hasQuarter:
				stateDesc = 'waiting for turn of crank'
				break
			case NAIVE_STATE.sold:
				stateDesc = 'delivering a gumball'
				break
		}

		const ending = this.count !== 1
			? 's'
			: ''
		const inventory = `Inventory: ${this.count} gumball${ending}`
		const quarters = `Quarters: ${this.quarterCount}`

		return `
            Mighty Gumball, Inc.
            TypeScript-enabled Standing Gumball Model #2024 (Naive Multi)
            ${inventory}
            ${quarters}
            Machine is ${stateDesc}
        `
	}

	getBallCount(): number {
		return this.count
	}

	getQuarterCount(): number {
		return this.quarterCount
	}
}

export {
	NAIVE_STATE,
	NaiveMultiGumballMachine,
}
