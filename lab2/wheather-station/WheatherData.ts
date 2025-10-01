import {type IObserver, CObservable} from './Observer'

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
	private minTemperature = Infinity
	private maxTemperature = -Infinity
	private accTemperature = 0
	private countAcc = 0

	update(data: SWeatherInfo): void {
		if (this.minTemperature > data.temperature) {
			this.minTemperature = data.temperature
		}
		if (this.maxTemperature < data.temperature) {
			this.maxTemperature = data.temperature
		}
		this.accTemperature += data.temperature
		this.countAcc++

		console.log(`Max Temp ${this.maxTemperature}`)
		console.log(`Min Temp ${this.minTemperature}`)
		console.log(`Average Temp ${(this.accTemperature / this.countAcc)}`)
		console.log('----------------')
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
