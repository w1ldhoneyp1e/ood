import {type CondimentDecorator, Lemon} from './CondimentsDecorator'
import {type IBeverage} from './IBeverage'

class MakeLemon {
	private quantity: number

	constructor(quantity: number) {
		this.quantity = quantity
	}

	call(beverage: IBeverage): Lemon {
		return new Lemon(beverage, this.quantity)
	}
}

// function makeCinnamon(): (beverage: IBeverage) => Cinnamon {
// 	return (beverage: IBeverage) => new Cinnamon(beverage)
// }

function makeCondiment<T extends CondimentDecorator>(
	condimentClass: new (beverage: IBeverage, ...args: any[]) => T,
	...args: any[]
): (beverage: IBeverage) => T {
	return (beverage: IBeverage) => new condimentClass(beverage, ...args)
}

function decorate<T extends CondimentDecorator>(
	component: IBeverage,
	decorator: (beverage: IBeverage) => T,
): T {
	return decorator(component)
}

export {
	MakeLemon,
	makeCondiment,
	decorate,
}
