import {type INumericStatsActions} from './IStats'
import {NumericStats} from './NumericStats'

function getPressureStatsActions(): INumericStatsActions {
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

			console.log(`Max pressure ${max}`)
			console.log(`Min pressure ${min}`)
			console.log(`Average pressure ${(avg)}`)
			console.log('----------------')
		},
	}
}

export {
	getPressureStatsActions,
}
