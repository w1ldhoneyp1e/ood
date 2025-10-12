import {type INumericStatsActions} from './IStats'
import {NumericStats} from './NumericStats'

function getTemperatureStatsActions(): INumericStatsActions {
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

			console.log(`Max Temp ${max}`)
			console.log(`Min Temp ${min}`)
			console.log(`Average Temp ${(avg)}`)
			console.log('----------------')
		},
	}
}

export {
	getTemperatureStatsActions,
}
