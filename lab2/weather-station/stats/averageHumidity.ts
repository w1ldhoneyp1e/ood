import {type INumericStatsActions} from './IStats'
import {NumericStats} from './NumericStats'

function getHumidityStatsActions(): INumericStatsActions {
	const numericStats = new NumericStats()

	return {
		addValue: (value: number) => {
			numericStats.addValue(value)
		},
		printStats: () => {
			const {
				avg,
				min,
				max,
			} = numericStats.getStats()

			console.log(`Max hum ${max}`)
			console.log(`Min hum ${min}`)
			console.log(`Average hum ${(avg)}`)
			console.log('----------------')
		},
	}
}

export {
	getHumidityStatsActions,
}
