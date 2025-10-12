import {type INumericStatsActions} from './IStats'
import {NumericStats} from './NumericStats'

function getWindSpeedStatsActions(): INumericStatsActions {
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

			console.log(`Max wind speed ${max}`)
			console.log(`Min wind speed ${min}`)
			console.log(`Average wind speed ${avg.toFixed(1)}`)
			console.log('----------------')
		},
	}
}

export {
	getWindSpeedStatsActions,
}
