import {type IObserver, CObservable} from './Observer'
import {getHumidityStatsActions} from './stats/averageHumidity'
import {getPressureStatsActions} from './stats/averagePressure'
import {getTemperatureStatsActions} from './stats/averageTemperature'
import {getWindDirectionStatsActions} from './stats/averageWindDirectionOnly'
import {getWindSpeedStatsActions} from './stats/averageWindSpeed'

interface BasicWeatherInfo {
	temperature: number,
	humidity: number,
	pressure: number,
}

interface ProWeatherInfo {
	temperature: number,
	humidity: number,
	pressure: number,
	windSpeed: number,
	windDirection: number,
}

type WeatherInfoDuo = BasicWeatherInfo | ProWeatherInfo

interface BasicMeasurements {
	temp: number,
	humidity: number,
	pressure: number,
}

interface ProMeasurements {
	temp: number,
	humidity: number,
	pressure: number,
	windSpeed: number,
	windDirection: number,
}

class ProDuoDisplay implements IObserver<WeatherInfoDuo> {
	update(data: WeatherInfoDuo): void {
		this.displayWeatherData(data)
	}

	private displayWeatherData(data: WeatherInfoDuo): void {
		console.log(`Current Temp ${data.temperature}`)
		console.log(`Current Hum ${data.humidity}`)
		console.log(`Current Pressure ${data.pressure}`)

		if ('windSpeed' in data && 'windDirection' in data) {
			const windDirectionName = this.getWindDirectionName(data.windDirection)
			console.log(`Current Wind: ${data.windSpeed} m/s from ${windDirectionName} (${data.windDirection}°)`)
		}

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

class ProDuoStatsDisplay implements IObserver<WeatherInfoDuo> {
	private temperatureActions = getTemperatureStatsActions()
	private humidityActions = getHumidityStatsActions()
	private pressureActions = getPressureStatsActions()
	private windSpeedActions = getWindSpeedStatsActions()
	private windDirectionActions = getWindDirectionStatsActions()

	update(data: WeatherInfoDuo): void {
		this.temperatureActions.addValue(data.temperature)
		this.humidityActions.addValue(data.humidity)
		this.pressureActions.addValue(data.pressure)

		if ('windSpeed' in data && 'windDirection' in data) {
			this.windSpeedActions.addValue(data.windSpeed)
			this.windDirectionActions.addValue(data.windDirection)
		}

		this.temperatureActions.printStats()
		this.humidityActions.printStats()
		this.pressureActions.printStats()

		if ('windSpeed' in data && 'windDirection' in data) {
			this.windSpeedActions.printStats()
			this.windDirectionActions.printStats()
		}
	}
}

class CWeatherDataBasic extends CObservable<BasicWeatherInfo> {
	private temperature = 0.0
	private humidity = 0.0
	private pressure = 760.0

	getTemperature(): number {
		return this.temperature
	}

	getHumidity(): number {
		return this.humidity
	}

	getPressure(): number {
		return this.pressure
	}

	measurementsChanged(): void {
		this.notifyObservers()
	}

	setMeasurements(measurements: BasicMeasurements): void {
		this.humidity = measurements.humidity
		this.temperature = measurements.temp
		this.pressure = measurements.pressure

		this.measurementsChanged()
	}

	protected getChangedData(): BasicWeatherInfo {
		return {
			temperature: this.getTemperature(),
			humidity: this.getHumidity(),
			pressure: this.getPressure(),
		}
	}
}

class CWeatherDataPro extends CObservable<ProWeatherInfo> {
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

	protected getChangedData(): ProWeatherInfo {
		return {
			temperature: this.getTemperature(),
			humidity: this.getHumidity(),
			pressure: this.getPressure(),
			windSpeed: this.getWindSpeed(),
			windDirection: this.getWindDirection(),
		}
	}
}

class CWeatherStationProDuo {
	private inStation: CWeatherDataBasic
	private outStation: CWeatherDataPro

	constructor() {
		this.inStation = new CWeatherDataBasic()
		this.outStation = new CWeatherDataPro()
	}

	registerObserver(observer: IObserver<WeatherInfoDuo>, priority: number = 0): void {
		this.inStation.registerObserver(observer as IObserver<BasicWeatherInfo>, priority)
		this.outStation.registerObserver(observer as IObserver<ProWeatherInfo>, priority)
	}

	removeObserver(observer: IObserver<WeatherInfoDuo>): void {
		this.inStation.removeObserver(observer as IObserver<BasicWeatherInfo>)
		this.outStation.removeObserver(observer as IObserver<ProWeatherInfo>)
	}

	setInsideMeasurements(measurements: BasicMeasurements): void {
		this.inStation.setMeasurements(measurements)
	}

	setOutsideMeasurements(measurements: ProMeasurements): void {
		this.outStation.setMeasurements(measurements)
	}

	getInStation(): CWeatherDataBasic {
		return this.inStation
	}

	getOutStation(): CWeatherDataPro {
		return this.outStation
	}
}

export {
	CWeatherStationProDuo,
	ProDuoDisplay,
	ProDuoStatsDisplay,
	CWeatherDataBasic,
	CWeatherDataPro,
	type WeatherInfoDuo,
	type BasicWeatherInfo,
	type ProWeatherInfo,
	type BasicMeasurements,
	type ProMeasurements,
}
