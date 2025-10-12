import {DirectionStats} from './DirectionStats'
import {type INumericStatsActions} from './IStats'

function getWindDirectionStatsActions(): INumericStatsActions {
	const directionStats = new DirectionStats()

	return {
		addValue: (value: number) => {
			directionStats.addValue(value)
		},
		printStats: () => {
			const {avg} = directionStats.getStats()
			console.log(`Average wind direction ${avg}°`)
			console.log('----------------')
		},
	}
}

export {
	getWindDirectionStatsActions,
}
