import {type IBeverage} from './IBeverage'

abstract class CondimentDecorator implements IBeverage {
	protected beverage: IBeverage

	constructor(beverage: IBeverage) {
		this.beverage = beverage
	}

	getDescription(): string {
		return this.beverage.getDescription() + ', ' + this.getCondimentDescription()
	}

	getCost(): number {
		return this.beverage.getCost() + this.getCondimentCost()
	}

	protected abstract getCondimentDescription(): string
	protected abstract getCondimentCost(): number
}

class Cinnamon extends CondimentDecorator {
	protected getCondimentCost(): number {
		return 20
	}

	protected getCondimentDescription(): string {
		return 'Cinnamon'
	}
}

class Lemon extends CondimentDecorator {
	private quantity: number

	constructor(beverage: IBeverage, quantity: number = 1) {
		super(beverage)
		this.quantity = quantity
	}

	protected getCondimentCost(): number {
		return 10.0 * this.quantity
	}

	protected getCondimentDescription(): string {
		return `Lemon x ${this.quantity}`
	}
}

enum ICE_CUBE_TYPE {
	dry = 'Dry',
	water = 'Water',
}

class IceCubes extends CondimentDecorator {
	private quantity: number
	private type: ICE_CUBE_TYPE

	constructor(beverage: IBeverage, quantity: number, type: ICE_CUBE_TYPE = ICE_CUBE_TYPE.water) {
		super(beverage)
		this.quantity = quantity
		this.type = type
	}

	protected getCondimentCost(): number {
		const cost = this.type === ICE_CUBE_TYPE.dry
			? 10
			: 5
		return cost * this.quantity
	}

	protected getCondimentDescription(): string {
		return `${this.type} ice cubes x ${this.quantity}`
	}
}

enum SYRUP_TYPE {
	chocolate = 'Chocolate',
	maple = 'Maple',
}

class Syrup extends CondimentDecorator {
	private syrupType: SYRUP_TYPE

	constructor(beverage: IBeverage, syrupType: SYRUP_TYPE) {
		super(beverage)
		this.syrupType = syrupType
	}

	protected getCondimentCost(): number {
		return 15
	}

	protected getCondimentDescription(): string {
		return `${this.syrupType} syrup`
	}
}

class ChocolateCrumbs extends CondimentDecorator {
	private mass: number

	constructor(beverage: IBeverage, mass: number) {
		super(beverage)
		this.mass = mass
	}

	protected getCondimentCost(): number {
		return 2.0 * this.mass
	}

	protected getCondimentDescription(): string {
		return `Chocolate crumbs ${this.mass}g`
	}
}

class CoconutFlakes extends CondimentDecorator {
	private mass: number

	constructor(beverage: IBeverage, mass: number) {
		super(beverage)
		this.mass = mass
	}

	protected getCondimentCost(): number {
		return this.mass
	}

	protected getCondimentDescription(): string {
		return `Coconut flakes ${this.mass}g`
	}
}

class Cream extends CondimentDecorator {
	protected getCondimentCost(): number {
		return 25
	}

	protected getCondimentDescription(): string {
		return 'Cream'
	}
}

class Chocolate extends CondimentDecorator {
	private pieces: number

	constructor(beverage: IBeverage, pieces: number) {
		super(beverage)
		this.pieces = Math.min(pieces, 5)
	}

	protected getCondimentCost(): number {
		return 10 * this.pieces
	}

	protected getCondimentDescription(): string {
		return `${this.pieces} chocolate pieces`
	}
}

enum LIQUEUR_TYPE {
	nut = 'Nut',
	chocolate = 'Chocolate',
}

class Liqueur extends CondimentDecorator {
	private liqueurType: LIQUEUR_TYPE

	constructor(beverage: IBeverage, liqueurType: LIQUEUR_TYPE) {
		super(beverage)
		this.liqueurType = liqueurType
	}

	protected getCondimentCost(): number {
		return 50
	}

	protected getCondimentDescription(): string {
		return `${this.liqueurType} liqueur`
	}
}

export {
	CondimentDecorator,
	Cinnamon,
	Lemon,
	IceCubes,
	ICE_CUBE_TYPE,
	Syrup,
	SYRUP_TYPE,
	ChocolateCrumbs,
	CoconutFlakes,
	Cream,
	Chocolate,
	Liqueur,
	LIQUEUR_TYPE,
}
