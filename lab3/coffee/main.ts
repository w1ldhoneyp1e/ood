import * as readline from 'readline'
import {
	Coffee,
	Latte,
	Milkshake,
	Tea,
} from './Beverages'
import {
	type CondimentDecorator,
	ChocolateCrumbs,
	Cinnamon,
	CoconutFlakes,
	ICE_CUBE_TYPE,
	IceCubes,
	Lemon,
	Syrup,
	SYRUP_TYPE,
} from './Condiments'
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

async function dialogWithUser(): Promise<void> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	const question = (prompt: string): Promise<string> =>
		new Promise(resolve => {
			rl.question(prompt, resolve)
		})

	console.log('Type 1 for coffee or 2 for tea')
	const beverageChoice = await question('')

	let beverage: IBeverage

	if (beverageChoice === '1') {
		beverage = new Coffee()
	}
	else if (beverageChoice === '2') {
		beverage = new Tea()
	}
	else {
		rl.close()
		return
	}

	let condimentChoice: string
	for (;;) {
		console.log('1 - Lemon, 2 - Cinnamon, 0 - Checkout')
		condimentChoice = await question('')

		if (condimentChoice === '1') {
			beverage = makeCondiment(Lemon, 2)(beverage)
		}
		else if (condimentChoice === '2') {
			beverage = makeCondiment(Cinnamon)(beverage)
		}
		else if (condimentChoice === '0') {
			break
		}
		else {
			rl.close()
			return
		}
	}

	console.log(`${beverage.getDescription()}, cost: ${beverage.getCost()}`)
	rl.close()
}

async function main(): Promise<void> {
	await dialogWithUser()
	console.log()

	{
		const latte = new Latte()
		const cinnamon = new Cinnamon(latte)
		const lemon = new Lemon(cinnamon, 2)
		const iceCubes = new IceCubes(lemon, 2, ICE_CUBE_TYPE.dry)
		const beverage = new ChocolateCrumbs(iceCubes, 2)

		console.log(`${beverage.getDescription()} costs ${beverage.getCost()}`)
	}

	{
		const beverage = new ChocolateCrumbs(
			new IceCubes(
				new Lemon(
					new Cinnamon(
						new Latte(),
					),
					2,
				),
				2,
				ICE_CUBE_TYPE.dry,
			),
			2,
		)

		console.log(`${beverage.getDescription()} costs ${beverage.getCost()}`)
	}

	{
		const lemon2 = makeCondiment(Lemon, 2)
		const iceCubes3 = makeCondiment(IceCubes, 3, ICE_CUBE_TYPE.water)

		const tea = new Tea()
		const lemonIceTea = iceCubes3(lemon2(tea))

		const oneMoreLemonIceTea = decorate(
			decorate(new Tea(), makeCondiment(Lemon, 2)),
			makeCondiment(IceCubes, 3, ICE_CUBE_TYPE.water),
		)

		console.log(`${lemonIceTea.getDescription()} costs ${lemonIceTea.getCost()}`)
		console.log(`${oneMoreLemonIceTea.getDescription()} costs ${oneMoreLemonIceTea.getCost()}`)
	}

	{
		const beverage = decorate(
			decorate(
				decorate(
					decorate(
						new Latte(),
						makeCondiment(Cinnamon),
					),
					makeCondiment(Lemon, 2),
				),
				makeCondiment(IceCubes, 2, ICE_CUBE_TYPE.dry),
			),
			makeCondiment(ChocolateCrumbs, 2),
		)

		console.log(`${beverage.getDescription()} costs ${beverage.getCost()}`)
	}

	{
		const beverage = decorate(
			decorate(
				new Milkshake(),
				makeCondiment(Syrup, SYRUP_TYPE.maple),
			),
			makeCondiment(CoconutFlakes, 8),
		)

		console.log(`${beverage.getDescription()} costs ${beverage.getCost()}`)
	}
}

main()
