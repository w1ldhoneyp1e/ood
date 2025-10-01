import {
	Latte,
	Milkshake,
	Tea,
} from './Beverages'
import {
	ChocolateCrumbs,
	Cinnamon,
	CoconutFlakes,
	ICE_CUBE_TYPE,
	IceCubes,
	Lemon,
	Syrup,
	SYRUP_TYPE,
} from './CondimentsDecorator'
import {decorate, makeCondiment} from './decoratorUtils'

function runSamples() {
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

runSamples()
