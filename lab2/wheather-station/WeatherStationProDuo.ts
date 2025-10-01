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
	source: 'in',
}

interface ProWeatherInfo {
	temperature: number,
	humidity: number,
	pressure: number,
	windSpeed: number,
	windDirection: number,
	source: 'out',
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
		if (data.source === 'in') {
			this.displayBasicData('Inside', data)
		}
		else {
			this.displayProData('Outside', data)
		}
	}

	private displayBasicData(stationName: string, data: BasicWeatherInfo): void {
		this.displayCommonData(stationName, data.temperature, data.humidity, data.pressure)
		console.log('----------------')
	}

	private displayProData(stationName: string, data: ProWeatherInfo): void {
		this.displayCommonData(stationName, data.temperature, data.humidity, data.pressure)
		const windDirectionName = this.getWindDirectionName(data.windDirection)
		console.log(`Current Wind: ${data.windSpeed} m/s from ${windDirectionName} (${data.windDirection}°)`)
		console.log('----------------')
	}

	private displayCommonData(stationName: string, temperature: number, humidity: number, pressure: number): void {
		console.log(`${stationName}:`)
		console.log(`Current Temp ${temperature}`)
		console.log(`Current Hum ${humidity}`)
		console.log(`Current Pressure ${pressure}`)
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
	private inTemperatureActions = getTemperatureStatsActions()
	private inHumidityActions = getHumidityStatsActions()
	private inPressureActions = getPressureStatsActions()

	private outTemperatureActions = getTemperatureStatsActions()
	private outHumidityActions = getHumidityStatsActions()
	private outPressureActions = getPressureStatsActions()
	private outWindSpeedActions = getWindSpeedStatsActions()
	private outWindDirectionActions = getWindDirectionStatsActions()

	update(data: WeatherInfoDuo): void {
		if (data.source === 'in') {
			this.inTemperatureActions.addValue(data.temperature)
			this.inHumidityActions.addValue(data.humidity)
			this.inPressureActions.addValue(data.pressure)

			console.log('Inside Stats:')
			this.inTemperatureActions.printStats()
			this.inHumidityActions.printStats()
			this.inPressureActions.printStats()
		}
		else {
			this.outTemperatureActions.addValue(data.temperature)
			this.outHumidityActions.addValue(data.humidity)
			this.outPressureActions.addValue(data.pressure)
			this.outWindSpeedActions.addValue(data.windSpeed)
			this.outWindDirectionActions.addValue(data.windDirection)

			console.log('Outside Stats:')
			this.outTemperatureActions.printStats()
			this.outHumidityActions.printStats()
			this.outPressureActions.printStats()
			this.outWindSpeedActions.printStats()
			this.outWindDirectionActions.printStats()
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
			source: 'in',
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
			source: 'out',
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
