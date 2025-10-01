import {type IBeverage} from './IBeverage'

abstract class Beverage implements IBeverage {
	protected description: string

	constructor(description: string) {
		this.description = description
	}

	getDescription(): string {
		return this.description
	}

	abstract getCost(): number
}

class Coffee extends Beverage {
	constructor(description: string = 'Coffee') {
		super(description)
	}

	getCost(): number {
		return 60
	}
}

class Cappuccino extends Coffee {
	constructor() {
		super('Cappuccino')
	}

	getCost(): number {
		return 80
	}
}

class Latte extends Coffee {
	constructor() {
		super('Latte')
	}

	getCost(): number {
		return 90
	}
}

class Tea extends Beverage {
	constructor() {
		super('Tea')
	}

	getCost(): number {
		return 30
	}
}

class Milkshake extends Beverage {
	constructor() {
		super('Milkshake')
	}

	getCost(): number {
		return 80
	}
}

export {
	Coffee,
	Cappuccino,
	Latte,
	Tea,
	Milkshake,
}
