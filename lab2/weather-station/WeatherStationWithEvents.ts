import {CEventObservable} from './EventObservable'
import {
	type IEventObserver,
	type WeatherEvent,
	WeatherEventType,
} from './EventTypes'

// Базовые данные погоды
interface BasicWeatherData {
	temperature: number,
	humidity: number,
	pressure: number,
}

// Расширенные данные погоды
interface ProWeatherData extends BasicWeatherData {
	windSpeed: number,
	windDirection: number,
}

// Универсальная метеостанция с поддержкой событий
class CWeatherStationWithEvents extends CEventObservable<WeatherEvent> {
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

	// Установка данных для внутренней станции (базовые данные)
	setInsideMeasurements(data: BasicWeatherData): void {
		const oldData = {...this.inData}
		this.inData = {...data}

		// Уведомляем об изменениях только тех параметров, которые действительно изменились
		if (oldData.temperature !== data.temperature) {
			this.notifyTemperatureChange('in', data.temperature)
		}
		if (oldData.humidity !== data.humidity) {
			this.notifyHumidityChange('in', data.humidity)
		}
		if (oldData.pressure !== data.pressure) {
			this.notifyPressureChange('in', data.pressure)
		}
	}

	// Установка данных для внешней станции (расширенные данные)
	setOutsideMeasurements(data: ProWeatherData): void {
		const oldData = {...this.outData}
		this.outData = {...data}

		// Уведомляем об изменениях только тех параметров, которые действительно изменились
		if (oldData.temperature !== data.temperature) {
			this.notifyTemperatureChange('out', data.temperature)
		}
		if (oldData.humidity !== data.humidity) {
			this.notifyHumidityChange('out', data.humidity)
		}
		if (oldData.pressure !== data.pressure) {
			this.notifyPressureChange('out', data.pressure)
		}
		if (oldData.windSpeed !== data.windSpeed) {
			this.notifyWindSpeedChange(data.windSpeed)
		}
		if (oldData.windDirection !== data.windDirection) {
			this.notifyWindDirectionChange(data.windDirection)
		}
	}

	private notifyTemperatureChange(station: 'in' | 'out', value: number): void {
		const event: WeatherEvent = {
			type: WeatherEventType.TEMPERATURE,
			data: {
				value,
				station,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	private notifyHumidityChange(station: 'in' | 'out', value: number): void {
		const event: WeatherEvent = {
			type: WeatherEventType.HUMIDITY,
			data: {
				value,
				station,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	private notifyPressureChange(station: 'in' | 'out', value: number): void {
		const event: WeatherEvent = {
			type: WeatherEventType.PRESSURE,
			data: {
				value,
				station,
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	private notifyWindSpeedChange(value: number): void {
		const event: WeatherEvent = {
			type: WeatherEventType.WIND_SPEED,
			data: {
				value,
				station: 'out',
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	private notifyWindDirectionChange(value: number): void {
		const event: WeatherEvent = {
			type: WeatherEventType.WIND_DIRECTION,
			data: {
				value,
				station: 'out',
			},
			timestamp: Date.now(),
		}
		this.notifyObservers(event)
	}

	// Геттеры для получения текущих данных
	getInsideData(): BasicWeatherData {
		return {...this.inData}
	}

	getOutsideData(): ProWeatherData {
		return {...this.outData}
	}
}

// Специализированный дисплей для рыбаков (только температура и давление)
class FishingDisplay implements IEventObserver<WeatherEvent> {
	private interestedEventTypes = [WeatherEventType.TEMPERATURE, WeatherEventType.PRESSURE]

	update(event: WeatherEvent): void {
		switch (event.type) {
			case WeatherEventType.TEMPERATURE:
				this.displayTemperature(event.data.value, event.data.station)
				break
			case WeatherEventType.PRESSURE:
				this.displayPressure(event.data.value, event.data.station)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
	}

	private displayTemperature(value: number, station: 'in' | 'out'): void {
		const stationName = station === 'in'
			? 'Внутри'
			: 'Снаружи'
		console.log(`${stationName} температура: ${value}°C`)

		if (value < -10) {
			console.log('⚠️  КРИТИЧЕСКАЯ ТЕМПЕРАТУРА! Рекомендуется прекратить рыбалку!')
		}
		else if (value < 0) {
			console.log('❄️  Очень холодно, будьте осторожны!')
		}
		console.log('---')
	}

	private displayPressure(value: number, station: 'in' | 'out'): void {
		const stationName = station === 'in'
			? 'Внутри'
			: 'Снаружи'
		console.log(`${stationName} давление: ${value} мм рт.ст.`)

		if (value < 750) {
			console.log('🐟 Низкое давление - рыба может быть менее активна')
		}
		else if (value > 770) {
			console.log('🐟 Высокое давление - хорошие условия для рыбалки')
		}
		console.log('---')
	}
}

// Полный дисплей для всех параметров
class FullWeatherDisplay implements IEventObserver<WeatherEvent> {
	private interestedEventTypes = [
		WeatherEventType.TEMPERATURE,
		WeatherEventType.HUMIDITY,
		WeatherEventType.PRESSURE,
		WeatherEventType.WIND_SPEED,
		WeatherEventType.WIND_DIRECTION,
	]

	update(event: WeatherEvent): void {
		switch (event.type) {
			case WeatherEventType.TEMPERATURE:
				console.log(`Температура (${event.data.station}): ${event.data.value}°C`)
				break
			case WeatherEventType.HUMIDITY:
				console.log(`Влажность (${event.data.station}): ${event.data.value}`)
				break
			case WeatherEventType.PRESSURE:
				console.log(`Давление (${event.data.station}): ${event.data.value} мм рт.ст.`)
				break
			case WeatherEventType.WIND_SPEED:
				console.log(`Скорость ветра: ${event.data.value} м/с`)
				break
			case WeatherEventType.WIND_DIRECTION:
				const direction = this.getWindDirectionName(event.data.value)
				console.log(`Направление ветра: ${direction} (${event.data.value}°)`)
				break
		}
	}

	getInterestedEventTypes(): string[] {
		return [...this.interestedEventTypes]
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

export {
	CWeatherStationWithEvents,
	FishingDisplay,
	FullWeatherDisplay,
	type BasicWeatherData,
	type ProWeatherData,
}
