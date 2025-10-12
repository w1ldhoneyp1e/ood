import {EventObservable} from './EventObservable'
import {
	type IEventObserver,
	type WeatherEvent,
	WEATHER_EVENT_TYPE,
} from './EventTypes'

interface BasicWeatherData {
	temperature: number,
	humidity: number,
	pressure: number,
}

interface ProWeatherData extends BasicWeatherData {
	windSpeed: number,
	windDirection: number,
}

class WeatherStationWithEvents extends EventObservable<WeatherEvent> {
	private inData: BasicWeatherData = {
		temperature: 0,
		humidity: 0,
		pressure: 760,
	}
	private outData: ProWeatherData = {
		temperature: 0,
		humidity: 0,
		pressure: 760,
		windSpeed: 0,
		windDirection: 0,
	}

	setInsideMeasurements(data: BasicWeatherData): void {
		const oldData = {...this.inData}
		this.inData = {...data}

		if (oldData.temperature !== data.temperature) {
			this.notifyTemperatureChange(data.temperature)
		}
		if (oldData.humidity !== data.humidity) {
			this.notifyHumidityChange(data.humidity)
		}
		if (oldData.pressure !== data.pressure) {
			this.notifyPressureChange(data.pressure)
		}
	}

	setOutsideMeasurements(data: ProWeatherData): void {
		const oldData = {...this.outData}
		this.outData = {...data}

		if (oldData.temperature !== data.temperature) {
			this.notifyTemperatureChange(data.temperature)
		}
		if (oldData.humidity !== data.humidity) {
			this.notifyHumidityChange(data.humidity)
		}
		if (oldData.pressure !== data.pressure) {
			this.notifyPressureChange(data.pressure)
		}
		if (oldData.windSpeed !== data.windSpeed) {
			this.notifyWindSpeedChange(data.windSpeed)
		}
		if (oldData.windDirection !== data.windDirection) {
			this.notifyWindDirectionChange(data.windDirection)
		}
	}

	private notifyTemperatureChange(value: number): void {
		const event: WeatherEvent = {
			type: WEATHER_EVENT_TYPE.temperature,
			data: {
				value,
			},
		}
		this.notifyObservers(event)
	}

	private notifyHumidityChange(value: number): void {
		const event: WeatherEvent = {
			type: WEATHER_EVENT_TYPE.humidity,
			data: {
				value,
			},
		}
		this.notifyObservers(event)
	}

	private notifyPressureChange(value: number): void {
		const event: WeatherEvent = {
			type: WEATHER_EVENT_TYPE.pressure,
			data: {
				value,
			},
		}
		this.notifyObservers(event)
	}

	private notifyWindSpeedChange(value: number): void {
		const event: WeatherEvent = {
			type: WEATHER_EVENT_TYPE.windSpeed,
			data: {
				value,
			},
		}
		this.notifyObservers(event)
	}

	private notifyWindDirectionChange(value: number): void {
		const event: WeatherEvent = {
			type: WEATHER_EVENT_TYPE.windDirection,
			data: {
				value,
			},
		}
		this.notifyObservers(event)
	}

	getInsideData(): BasicWeatherData {
		return {...this.inData}
	}

	getOutsideData(): ProWeatherData {
		return {...this.outData}
	}
}

class FishingDisplay implements IEventObserver<WeatherEvent> {
	private interestedEventTypes = [
		WEATHER_EVENT_TYPE.temperature,
		WEATHER_EVENT_TYPE.pressure,
	]

	update(event: WeatherEvent): void {
		switch (event.type) {
			case WEATHER_EVENT_TYPE.temperature:
				this.displayTemperature(event.data.value)
				break
			case WEATHER_EVENT_TYPE.pressure:
				this.displayPressure(event.data.value)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}

	private displayTemperature(value: number): void {
		console.log(`Temperature: ${value}°C`)
	}

	private displayPressure(value: number): void {
		console.log(`Pressure: ${value} mmHg`)
	}
}

class FullWeatherDisplay implements IEventObserver<WeatherEvent> {
	private interestedEventTypes = [
		WEATHER_EVENT_TYPE.temperature,
		WEATHER_EVENT_TYPE.humidity,
		WEATHER_EVENT_TYPE.pressure,
		WEATHER_EVENT_TYPE.windSpeed,
		WEATHER_EVENT_TYPE.windDirection,
	]

	update(event: WeatherEvent): void {
		switch (event.type) {
			case WEATHER_EVENT_TYPE.temperature:
				console.log(`Temperature: ${event.data.value}°C`)
				break
			case WEATHER_EVENT_TYPE.humidity:
				console.log(`Humidity: ${event.data.value}`)
				break
			case WEATHER_EVENT_TYPE.pressure:
				console.log(`Pressure: ${event.data.value} mmHg`)
				break
			case WEATHER_EVENT_TYPE.windSpeed:
				console.log(`Wind speed: ${event.data.value} m/s`)
				break
			case WEATHER_EVENT_TYPE.windDirection: {
				const direction = this.getWindDirectionName(event.data.value)
				console.log(`Wind direction: ${direction} (${event.data.value}°)`)
				break
			}
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}

	private getWindDirectionName(degrees: number): string {
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
}

export {
	WeatherStationWithEvents,
	FishingDisplay,
	FullWeatherDisplay,
	type BasicWeatherData,
	type ProWeatherData,
}
