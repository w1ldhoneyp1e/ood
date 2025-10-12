import {type IStats} from './IStats'

class NumericStats implements IStats<number> {
	private minValue = Infinity
	private maxValue = -Infinity
	private accTemp = 0
	private count = 0

	addValue(value: number): void {
		if (this.minValue > value) {
			this.minValue = value
		}
		if (this.maxValue < value) {
			this.maxValue = value
		}
		this.accTemp += value
		this.count++
	}

	getStats(): Record<string, number> {
		return {
			min: this.minValue,
			max: this.maxValue,
			avg: this.accTemp / this.count,
		}
	}
}

export {
	NumericStats,
}
