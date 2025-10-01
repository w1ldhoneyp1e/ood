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

		if (this.inData && this.outData) {
			this.displayBothStations()
		}
	}

	private displayBothStations(): void {
		console.log(`Inside:  Temp ${this.inData!.temperature}°C, Hum ${this.inData!.humidity}, Pressure ${this.inData!.pressure}`)
		console.log(`Outside: Temp ${this.outData!.temperature}°C, Hum ${this.outData!.humidity}, Pressure ${this.outData!.pressure}`)
	}
}

class CAdvancedStatsDisplay implements IObserver<SWeatherInfo> {
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

	private inDataReceived = false
	private outDataReceived = false

	update(data: SWeatherInfo): void {
		const actions = data.source === 'in'
			? this.inActions
			: this.outActions
		const values = [data.temperature, data.humidity, data.pressure]

		actions.forEach((action, index) => {
			action.addValue(values[index])
		})

		if (data.source === 'in') {
			this.inDataReceived = true
		}
		else {
			this.outDataReceived = true
		}

		if (this.inDataReceived && this.outDataReceived) {
			this.displayStats()
		}
	}

	private displayStats(): void {
		console.log('Inside')
		this.inActions.forEach(action => action.printStats())

		console.log('Outside')
		this.outActions.forEach(action => action.printStats())
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
	CAdvancedStatsDisplay,
	CWeatherDataWithSource,
	type SWeatherInfo,
}
