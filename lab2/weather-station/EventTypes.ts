// Типы событий для метеостанции
export enum WeatherEventType {
	TEMPERATURE = 'temperature',
	HUMIDITY = 'humidity', 
	PRESSURE = 'pressure',
	WIND_SPEED = 'windSpeed',
	WIND_DIRECTION = 'windDirection',
}

// Универсальный интерфейс для событий
export interface IEvent<T = any> {
	type: string
	data: T
	timestamp: number
}

// Специфичные события для погоды
export interface WeatherEvent extends IEvent {
	type: WeatherEventType
	data: {
		value: number
		station: 'in' | 'out'
	}
}

// Универсальный интерфейс наблюдателя с поддержкой типов событий
export interface IEventObserver<T extends IEvent = IEvent> {
	update(event: T): void
	getInterestedEventTypes(): string[]
}

// Универсальный интерфейс наблюдаемого с поддержкой типов событий
export interface IEventObservable<T extends IEvent = IEvent> {
	registerObserver(observer: IEventObserver<T>, eventTypes: string[], priority?: number): void
	unregisterObserver(observer: IEventObserver<T>, eventTypes?: string[]): void
	notifyObservers(event: T): void
}
