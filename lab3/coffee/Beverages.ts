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
	constructor(description: string = 'Cappuccino') {
		super(description)
	}

	getCost(): number {
		return 80
	}
}

class StandardCappuccino extends Cappuccino {
	constructor() {
		super('Cappuccino, standard')
	}

	getCost(): number {
		return 80
	}
}

class DoubleCappuccino extends Cappuccino {
	constructor() {
		super('Cappuccino, double')
	}

	getCost(): number {
		return 120
	}
}

class Latte extends Coffee {
	constructor(description: string = 'Latte') {
		super(description)
	}

	getCost(): number {
		return 90
	}
}

class StandardLatte extends Latte {
	constructor() {
		super('Latte, standard')
	}

	getCost(): number {
		return 90
	}
}

class DoubleLatte extends Latte {
	constructor() {
		super('Latte, double')
	}

	getCost(): number {
		return 130
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
	constructor(description: string = 'Milkshake') {
		super(description)
	}

	getCost(): number {
		return 80
	}
}

class SmallMilkshake extends Milkshake {
	constructor() {
		super('Milkshake, small')
	}

	getCost(): number {
		return 50
	}
}

class MediumMilkshake extends Milkshake {
	constructor() {
		super('Milkshake, medium')
	}

	getCost(): number {
		return 60
	}
}

class LargeMilkshake extends Milkshake {
	constructor() {
		super('Milkshake, large')
	}

	getCost(): number {
		return 80
	}
}

export {
	Coffee,
	Cappuccino,
	StandardCappuccino,
	DoubleCappuccino,
	Latte,
	StandardLatte,
	DoubleLatte,
	Tea,
	Milkshake,
	SmallMilkshake,
	MediumMilkshake,
	LargeMilkshake,
}
