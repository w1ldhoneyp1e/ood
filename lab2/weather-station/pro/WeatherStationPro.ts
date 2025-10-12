import {type IObserver, CObservable} from '../observer/Observer'
import {getHumidityStatsActions} from '../stats/averageHumidity'
import {getPressureStatsActions} from '../stats/averagePressure'
import {getTemperatureStatsActions} from '../stats/averageTemperature'
import {getWindDirectionStatsActions} from '../stats/averageWindDirectionOnly'
import {getWindSpeedStatsActions} from '../stats/averageWindSpeed'

interface WeatherInfoPro {
	temperature: number,
	humidity: number,
	pressure: number,
	windSpeed: number,
	windDirection: number,
}

interface ProMeasurements {
	temp: number,
	humidity: number,
	pressure: number,
	windSpeed: number,
	windDirection: number,
}

class ProDisplay implements IObserver<WeatherInfoPro> {
	update(data: WeatherInfoPro): void {
		const windDirectionName = this.getWindDirectionName(data.windDirection)
		console.log(`Current Temp ${data.temperature}`)
		console.log(`Current Hum ${data.humidity}`)
		console.log(`Current Pressure ${data.pressure}`)
		console.log(`Wind: ${data.windSpeed} m/s from ${windDirectionName} (${data.windDirection}°)`)
		console.log('----------------')
	}

	private getWindDirectionName(degrees: number): string {
		const directions = [
			{
				name: 'Север',
				min: 315,
				max: 45,
			},
			{
				name: 'Восток',
				min: 45,
				max: 135,
			},
			{
				name: 'Юг',
				min: 135,
				max: 225,
			},
			{
				name: 'Запад',
				min: 225,
				max: 315,
			},
		]

		for (const direction of directions) {
			if (direction.name === 'Север') {
				if (degrees >= direction.min || degrees <= direction.max) {
					return direction.name
				}
			}
			else if (degrees >= direction.min && degrees < direction.max) {
				return direction.name
			}
		}

		return 'Неизвестно'
	}
}

class ProStatsDisplay implements IObserver<WeatherInfoPro> {
	private temperatureActions = getTemperatureStatsActions()
	private humidityActions = getHumidityStatsActions()
	private pressureActions = getPressureStatsActions()
	private windSpeedActions = getWindSpeedStatsActions()
	private windDirectionActions = getWindDirectionStatsActions()

	update(data: WeatherInfoPro): void {
		this.temperatureActions.addValue(data.temperature)
		this.humidityActions.addValue(data.humidity)
		this.pressureActions.addValue(data.pressure)
		this.windSpeedActions.addValue(data.windSpeed)
		this.windDirectionActions.addValue(data.windDirection)

		this.temperatureActions.printStats()
		this.humidityActions.printStats()
		this.pressureActions.printStats()
		this.windSpeedActions.printStats()
		this.windDirectionActions.printStats()
	}
}

class CWeatherDataPro extends CObservable<WeatherInfoPro> {
	private temperature = 0.0
	private humidity = 0.0
	private pressure = 760.0
	private windSpeed = 0.0
	private windDirection = 0.0

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

	measurementsChanged(): void {
		this.notifyObservers()
	}

	setMeasurements(measurements: ProMeasurements): void {
		this.humidity = measurements.humidity
		this.temperature = measurements.temp
		this.pressure = measurements.pressure
		this.windSpeed = measurements.windSpeed
		this.windDirection = measurements.windDirection

		this.measurementsChanged()
	}

	protected getChangedData(): WeatherInfoPro {
		return {
			temperature: this.getTemperature(),
			humidity: this.getHumidity(),
			pressure: this.getPressure(),
			windSpeed: this.getWindSpeed(),
			windDirection: this.getWindDirection(),
		}
	}
}

export {
	CWeatherDataPro,
	ProDisplay,
	ProStatsDisplay,
	type WeatherInfoPro,
	type ProMeasurements,
}
