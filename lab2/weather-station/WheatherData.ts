import {type IObserver, CObservable} from './observer/Observer'
import {getHumidityStatsActions} from './stats/averageHumidity'
import {getPressureStatsActions} from './stats/averagePressure'
import {getTemperatureStatsActions} from './stats/averageTemperature'

interface SWeatherInfo {
	temperature: number,
	humidity: number,
	pressure: number,
}

class CDisplay implements IObserver<SWeatherInfo> {
	update(data: SWeatherInfo): void {
		console.log(`Current Temp ${data.temperature}`)
		console.log(`Current Hum ${data.humidity}`)
		console.log(`Current Pressure ${data.pressure}`)
		console.log('----------------')
	}
}

class CStatsDisplay implements IObserver<SWeatherInfo> {
	private temperatureActions = getTemperatureStatsActions()
	private humidityActions = getHumidityStatsActions()
	private pressureActions = getPressureStatsActions()

	update(data: SWeatherInfo): void {
		this.temperatureActions.addValue(data.temperature)
		this.humidityActions.addValue(data.humidity)
		this.pressureActions.addValue(data.pressure)

		this.temperatureActions.printStats()
		this.humidityActions.printStats()
		this.pressureActions.printStats()
	}
}

class CWeatherData extends CObservable<SWeatherInfo> {
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

	setMeasurements(temp: number, humidity: number, pressure: number): void {
		this.humidity = humidity
		this.temperature = temp
		this.pressure = pressure

		this.measurementsChanged()
	}

	protected getChangedData(): SWeatherInfo {
		return {
			temperature: this.getTemperature(),
			humidity: this.getHumidity(),
			pressure: this.getPressure(),
		}
	}
}

export {
	CWeatherData,
	CDisplay,
	CStatsDisplay,
}
