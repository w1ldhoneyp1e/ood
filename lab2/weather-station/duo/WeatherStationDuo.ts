import {type IObserver, CObservable} from './Observer'
import {getHumidityStatsActions} from './stats/averageHumidity'
import {getPressureStatsActions} from './stats/averagePressure'
import {getTemperatureStatsActions} from './stats/averageTemperature'

interface SWeatherInfo {
	temperature: number,
	humidity: number,
	pressure: number,
	source: 'in' | 'out',
}

class CAdvancedDisplay implements IObserver<SWeatherInfo> {
	private inData: SWeatherInfo | null = null
	private outData: SWeatherInfo | null = null

	update(data: SWeatherInfo): void {
		if (data.source === 'in') {
			this.inData = data
		}
		else {
			this.outData = data
		}

		this.displayCurrentData()
	}

	private displayCurrentData(): void {
		if (this.inData) {
			this.displayStationData('Inside', this.inData)
		}
		if (this.outData) {
			this.displayStationData('Outside', this.outData)
		}
	}

	private displayStationData(stationName: string, data: SWeatherInfo): void {
		console.log(`${stationName}:`)
		console.log(`Current Temp ${data.temperature}`)
		console.log(`Current Hum ${data.humidity}`)
		console.log(`Current Pressure ${data.pressure}`)
		console.log('----------------')
	}
}

class DuoStatsDisplay implements IObserver<SWeatherInfo> {
	private inActions = [
		getTemperatureStatsActions(),
		getHumidityStatsActions(),
		getPressureStatsActions(),
	]

	private outActions = [
		getTemperatureStatsActions(),
		getHumidityStatsActions(),
		getPressureStatsActions(),
	]

	update(data: SWeatherInfo): void {
		const actions = data.source === 'in'
			? this.inActions
			: this.outActions
		const values = [data.temperature, data.humidity, data.pressure]

		actions.forEach((action, index) => {
			action.addValue(values[index])
		})

		this.displayStationStats(
			data.source === 'in'
				? 'Inside'
				: 'Outside',
			actions,
		)
	}

	private displayStationStats(stationName: string, actions: any[]): void {
		console.log(stationName)
		actions.forEach(action => action.printStats())
	}
}

class CWeatherDataWithSource extends CObservable<SWeatherInfo> {
	private temperature = 0.0
	private humidity = 0.0
	private pressure = 760.0
	private source: 'in' | 'out'

	constructor(source: 'in' | 'out') {
		super()
		this.source = source
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

	getSource(): 'in' | 'out' {
		return this.source
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
			source: this.getSource(),
		}
	}
}

class CWeatherStationDuo {
	private inStation: CWeatherDataWithSource
	private outStation: CWeatherDataWithSource

	constructor() {
		this.inStation = new CWeatherDataWithSource('in')
		this.outStation = new CWeatherDataWithSource('out')
	}

	registerObserver(observer: IObserver<SWeatherInfo>, priority: number = 0): void {
		this.inStation.registerObserver(observer, priority)
		this.outStation.registerObserver(observer, priority)
	}

	removeObserver(observer: IObserver<SWeatherInfo>): void {
		this.inStation.removeObserver(observer)
		this.outStation.removeObserver(observer)
	}

	setInsideMeasurements(temp: number, humidity: number, pressure: number): void {
		this.inStation.setMeasurements(temp, humidity, pressure)
	}

	setOutsideMeasurements(temp: number, humidity: number, pressure: number): void {
		this.outStation.setMeasurements(temp, humidity, pressure)
	}

	getInStation(): CWeatherDataWithSource {
		return this.inStation
	}

	getOutStation(): CWeatherDataWithSource {
		return this.outStation
	}
}

export {
	CWeatherStationDuo,
	CAdvancedDisplay,
	DuoStatsDisplay,
	CWeatherDataWithSource,
	type SWeatherInfo,
}
