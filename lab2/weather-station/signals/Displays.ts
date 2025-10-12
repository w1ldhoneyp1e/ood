import {type Connection} from './Signal'
import {type WeatherData} from './WeatherDataSignals'

class CurrentConditionsDisplay {
	private connections: Connection[] = []

	constructor(private weatherData: WeatherData) {
		this.connections.push(
			this.weatherData.temperatureChanged.connect(temp => {
				console.log(`Current temperature: ${temp}°C`)
			}),
		)

		this.connections.push(
			this.weatherData.humidityChanged.connect(humidity => {
				console.log(`Current humidity: ${humidity}`)
			}),
		)

		this.connections.push(
			this.weatherData.pressureChanged.connect(pressure => {
				console.log(`Current pressure: ${pressure} mmHg`)
			}),
		)
	}

	disconnect(): void {
		this.connections.forEach(conn => conn.disconnect())
		this.connections = []
	}
}

class StatisticsDisplay {
	private connections: Connection[] = []
	private temperatures: number[] = []
	private pressures: number[] = []

	constructor(private weatherData: WeatherData) {
		this.connections.push(
			this.weatherData.temperatureChanged.connect(temp => {
				this.temperatures.push(temp)
				this.displayTemperatureStats()
			}),
		)

		this.connections.push(
			this.weatherData.pressureChanged.connect(pressure => {
				this.pressures.push(pressure)
				this.displayPressureStats()
			}),
		)
	}

	private displayTemperatureStats(): void {
		const avg = this.temperatures.reduce((a, b) => a + b, 0) / this.temperatures.length
		const min = Math.min(...this.temperatures)
		const max = Math.max(...this.temperatures)
		console.log(`Temperature stats: avg=${avg.toFixed(1)}°C, min=${min}°C, max=${max}°C`)
	}

	private displayPressureStats(): void {
		const avg = this.pressures.reduce((a, b) => a + b, 0) / this.pressures.length
		const min = Math.min(...this.pressures)
		const max = Math.max(...this.pressures)
		console.log(`Pressure stats: avg=${avg.toFixed(1)} mmHg, min=${min} mmHg, max=${max} mmHg`)
	}

	disconnect(): void {
		this.connections.forEach(conn => conn.disconnect())
		this.connections = []
	}
}

class WindDisplay {
	private connections: Connection[] = []

	constructor(private weatherData: WeatherData) {
		this.connections.push(
			this.weatherData.windSpeedChanged.connect(speed => {
				console.log(`Wind speed: ${speed} m/s`)
			}),
		)

		this.connections.push(
			this.weatherData.windDirectionChanged.connect(direction => {
				const directionName = this.getDirectionName(direction)
				console.log(`Wind direction: ${directionName} (${direction}°)`)
			}),
		)
	}

	private getDirectionName(degrees: number): string {
		const directions = [
			{
				name: 'North',
				min: 315,
				max: 45,
			},
			{
				name: 'East',
				min: 45,
				max: 135,
			},
			{
				name: 'South',
				min: 135,
				max: 225,
			},
			{
				name: 'West',
				min: 225,
				max: 315,
			},
		]

		for (const direction of directions) {
			if (direction.name === 'North') {
				if (degrees >= direction.min || degrees <= direction.max) {
					return direction.name
				}
			}
			else if (degrees >= direction.min && degrees < direction.max) {
				return direction.name
			}
		}

		return 'Unknown'
	}

	disconnect(): void {
		this.connections.forEach(conn => conn.disconnect())
		this.connections = []
	}
}

export {
	CurrentConditionsDisplay, StatisticsDisplay, WindDisplay,
}

