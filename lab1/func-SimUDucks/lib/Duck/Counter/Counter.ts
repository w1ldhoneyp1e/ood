class Counter {
	private counter = 0

	increase(): void {
		this.counter++
	}

	getCount(): number {
		return this.counter
	}

	sayCount(): void {
		console.log(`My counter is ${this.counter}`)
	}
}

export {
	Counter,
}
