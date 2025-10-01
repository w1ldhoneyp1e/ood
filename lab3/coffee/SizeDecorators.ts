import {type IBeverage} from './IBeverage'

abstract class SizeDecorator implements IBeverage {
	protected beverage: IBeverage

	constructor(beverage: IBeverage) {
		this.beverage = beverage
	}

	getDescription(): string {
		return this.beverage.getDescription() + ', ' + this.getSizeDescription()
	}

	abstract getCost(): number
	protected abstract getSizeDescription(): string
}

class StandardLatte extends SizeDecorator {
	getCost(): number {
		return 90
	}

	protected getSizeDescription(): string {
		return 'standard'
	}
}

class DoubleLatte extends SizeDecorator {
	getCost(): number {
		return 130
	}

	protected getSizeDescription(): string {
		return 'double'
	}
}

class StandardCappuccino extends SizeDecorator {
	getCost(): number {
		return 80
	}

	protected getSizeDescription(): string {
		return 'standard'
	}
}

class DoubleCappuccino extends SizeDecorator {
	getCost(): number {
		return 120
	}

	protected getSizeDescription(): string {
		return 'double'
	}
}

class SmallMilkshake extends SizeDecorator {
	getCost(): number {
		return 50
	}

	protected getSizeDescription(): string {
		return 'small'
	}
}

class MediumMilkshake extends SizeDecorator {
	getCost(): number {
		return 60
	}

	protected getSizeDescription(): string {
		return 'medium'
	}
}

class LargeMilkshake extends SizeDecorator {
	getCost(): number {
		return 80
	}

	protected getSizeDescription(): string {
		return 'large'
	}
}

export {
	SizeDecorator,
	StandardLatte,
	DoubleLatte,
	StandardCappuccino,
	DoubleCappuccino,
	SmallMilkshake,
	MediumMilkshake,
	LargeMilkshake,
}
