import {type IStats} from './IStats'

class DirectionStats implements IStats<number> {
	private directions: number[] = []

	addValue(value: number): void {
		this.directions.push(value)
	}

	getStats(): Record<string, number> {
		if (this.directions.length === 0) {
			return {
				avg: 0,
			}
		}

		let xSum = 0
		let ySum = 0

		this.directions.forEach(direction => {
			const radians = (direction * Math.PI) / 180

			xSum += Math.sin(radians)
			ySum += Math.cos(radians)
		})

		const avgX = xSum / this.directions.length
		const avgY = ySum / this.directions.length

		const avgDirectionRadians = Math.atan2(avgX, avgY)

		let avgDirectionDegrees = (avgDirectionRadians * 180) / Math.PI
		if (avgDirectionDegrees < 0) {
			avgDirectionDegrees += 360
		}

		return {
			avg: Math.round(avgDirectionDegrees),
		}
	}
}

export {
	DirectionStats,
}
