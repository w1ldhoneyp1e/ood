import * as readline from 'readline'
import {
	Cappuccino,
	Coffee,
	Latte,
	Milkshake,
	Tea,
} from './Beverages'
import {
	type CondimentDecorator,
	Chocolate,
	ChocolateCrumbs,
	Cinnamon,
	CoconutFlakes,
	Cream,
	ICE_CUBE_TYPE,
	IceCubes,
	Lemon,
	Liqueur,
	LIQUEUR_TYPE,
	Syrup,
	SYRUP_TYPE,
} from './CondimentsDecorator'
import {makeCondiment} from './decoratorUtils'
import {type IBeverage} from './IBeverage'
import {
	DoubleCappuccino,
	DoubleLatte,
	LargeMilkshake,
	MediumMilkshake,
	SizeDecorator,
	SmallMilkshake,
	StandardCappuccino,
	StandardLatte,
} from './SizeDecorators'
import {
	BlackTea,
	ChamomileTea,
	EarlGreyTea,
	GreenTea,
	TeaVarietyDecorator,
} from './TeaVarietyDecorator'

async function dialogWithUser(): Promise<void> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	const question = (prompt: string): Promise<string> =>
		new Promise(resolve => {
			rl.question(prompt, resolve)
		})

	console.log('Choose beverage:')
	console.log('1 - Coffee')
	console.log('2 - Cappuccino')
	console.log('3 - Latte')
	console.log('4 - Tea')
	console.log('5 - Milkshake')
	const beverageChoice = await question('')

	let beverage: IBeverage

	switch (beverageChoice) {
		case '1':
			beverage = new Coffee()
			break
		case '2': {
			console.log('Choose size: 1 - Standard (80₽), 2 - Double (120₽)')
			const sizeChoice = await question('')
			const baseBeverage = new Cappuccino()
			beverage = sizeChoice === '2'
				? new DoubleCappuccino(baseBeverage)
				: new StandardCappuccino(baseBeverage)
			break
		}
		case '3': {
			console.log('Choose size: 1 - Standard (90₽), 2 - Double (130₽)')
			const sizeChoice = await question('')
			const baseBeverage = new Latte()
			beverage = sizeChoice === '2'
				? new DoubleLatte(baseBeverage)
				: new StandardLatte(baseBeverage)
			break
		}
		case '4': {
			console.log('Choose tea variety:')
			console.log('1 - Earl Grey (30₽)')
			console.log('2 - Green (30₽)')
			console.log('3 - Chamomile (30₽)')
			console.log('4 - Black (30₽)')
			const varietyChoice = await question('')
			const baseBeverage = new Tea()
			switch (varietyChoice) {
				case '1':
					beverage = new EarlGreyTea(baseBeverage)
					break
				case '2':
					beverage = new GreenTea(baseBeverage)
					break
				case '3':
					beverage = new ChamomileTea(baseBeverage)
					break
				case '4':
				default:
					beverage = new BlackTea(baseBeverage)
					break
			}
			break
		}
		case '5': {
			console.log('Choose size: 1 - Small (50₽), 2 - Medium (60₽), 3 - Large (80₽)')
			const sizeChoice = await question('')
			const baseBeverage = new Milkshake()
			switch (sizeChoice) {
				case '1':
					beverage = new SmallMilkshake(baseBeverage)
					break
				case '2':
					beverage = new MediumMilkshake(baseBeverage)
					break
				case '3':
					beverage = new LargeMilkshake(baseBeverage)
					break
				default:
					beverage = new MediumMilkshake(baseBeverage)
					break
			}
			break
		}
		default:
			rl.close()
			return
	}

	let condimentChoice: string
	for (;;) {
		console.log('Add condiment:')
		console.log('1 - Lemon (10₽ each)')
		console.log('2 - Cinnamon (20₽)')
		console.log('3 - Ice Cubes (5₽ each)')
		console.log('4 - Dry Ice Cubes (10₽ each)')
		console.log('5 - Chocolate Syrup (15₽)')
		console.log('6 - Maple Syrup (15₽)')
		console.log('7 - Chocolate Crumbs (2₽ per gram)')
		console.log('8 - Coconut Flakes (1₽ per gram)')
		console.log('9 - Cream (25₽)')
		console.log('10 - Chocolate (10₽ per piece, max 5)')
		console.log('11 - Nut Liqueur (50₽)')
		console.log('12 - Chocolate Liqueur (50₽)')
		console.log('0 - Checkout')
		condimentChoice = await question('')

		switch (condimentChoice) {
			case '1': {
				console.log('How many lemon slices?')
				const quantity = await question('')
				const qty = Number(quantity) || 1
				beverage = makeCondiment(Lemon, qty)(beverage)
				break
			}
			case '2':
				beverage = makeCondiment(Cinnamon)(beverage)
				break
			case '3': {
				console.log('How many ice cubes?')
				const quantity = await question('')
				const qty = Number(quantity) || 1
				beverage = makeCondiment(IceCubes, qty, ICE_CUBE_TYPE.water)(beverage)
				break
			}
			case '4': {
				console.log('How many dry ice cubes?')
				const quantity = await question('')
				const qty = Number(quantity) || 1
				beverage = makeCondiment(IceCubes, qty, ICE_CUBE_TYPE.dry)(beverage)
				break
			}
			case '5':
				beverage = makeCondiment(Syrup, SYRUP_TYPE.chocolate)(beverage)
				break
			case '6':
				beverage = makeCondiment(Syrup, SYRUP_TYPE.maple)(beverage)
				break
			case '7': {
				console.log('How many grams of chocolate crumbs?')
				const mass = await question('')
				const m = Number(mass) || 1
				beverage = makeCondiment(ChocolateCrumbs, m)(beverage)
				break
			}
			case '8': {
				console.log('How many grams of coconut flakes?')
				const mass = await question('')
				const m = Number(mass) || 1
				beverage = makeCondiment(CoconutFlakes, m)(beverage)
				break
			}
			case '9':
				beverage = makeCondiment(Cream)(beverage)
				break
			case '10': {
				console.log('How many chocolate pieces?')
				const pieces = await question('')
				const p = Math.min(Number(pieces) || 1)
				beverage = makeCondiment(Chocolate, p)(beverage)
				break
			}
			case '11':
				beverage = makeCondiment(Liqueur, LIQUEUR_TYPE.nut)(beverage)
				break
			case '12':
				beverage = makeCondiment(Liqueur, LIQUEUR_TYPE.chocolate)(beverage)
				break
			case '0':
				break
			default:
				rl.close()
				return
		}
		if (condimentChoice === '0') {
			break
		}
	}

	console.log(`${beverage.getDescription()}, cost: ${beverage.getCost()}`)
	rl.close()
}

export {
	dialogWithUser,
}
