import {Signal} from './Signal'

interface BasicWeatherData {
	temperature: number,
	humidity: number,
	pressure: number,
}

interface ProWeatherData extends BasicWeatherData {
	windSpeed: number,
	windDirection: number,
}

class WeatherData {
	readonly temperatureChanged = new Signal<number>()
	readonly humidityChanged = new Signal<number>()
	readonly pressureChanged = new Signal<number>()
	readonly windSpeedChanged = new Signal<number>()
	readonly windDirectionChanged = new Signal<number>()

	private temperature = 0
	private humidity = 0
	private pressure = 760
	private windSpeed = 0
	private windDirection = 0

	setMeasurements(data: BasicWeatherData): void {
		if (this.temperature !== data.temperature) {
			this.temperature = data.temperature
			this.temperatureChanged.emit(this.temperature)
		}

		if (this.humidity !== data.humidity) {
			this.humidity = data.humidity
			this.humidityChanged.emit(this.humidity)
		}

		if (this.pressure !== data.pressure) {
			this.pressure = data.pressure
			this.pressureChanged.emit(this.pressure)
		}
	}

	setProMeasurements(data: ProWeatherData): void {
		this.setMeasurements(data)

		if (this.windSpeed !== data.windSpeed) {
			this.windSpeed = data.windSpeed
			this.windSpeedChanged.emit(this.windSpeed)
		}

		if (this.windDirection !== data.windDirection) {
			this.windDirection = data.windDirection
			this.windDirectionChanged.emit(this.windDirection)
		}
	}

	getTemperature(): number {
		return this.temperature
	}

	getHumidity(): number {
		return this.humidity
	}

	getPressure(): number {
		return this.pressure
	}

	getWindSpeed(): number {
		return this.windSpeed
	}

	getWindDirection(): number {
		return this.windDirection
	}
}

export {
	WeatherData,
	BasicWeatherData,
	ProWeatherData,
}

