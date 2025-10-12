enum WEATHER_EVENT_TYPE {
	temperature = 'temperature',
	humidity = 'humidity',
	pressure = 'pressure',
	windSpeed = 'windSpeed',
	windDirection = 'windDirection',
}

interface IEvent<T = any> {
	type: string,
	data: T,
	timestamp: number,
}

interface WeatherEvent extends IEvent {
	type: WEATHER_EVENT_TYPE,
	data: {
		value: number,
	},
}

interface IEventObserver<T extends IEvent = IEvent> {
	update: (event: T) => void,
	getInterestedEventTypes: () => string[],
}

interface IEventObservable<T extends IEvent = IEvent> {
	registerObserver: (observer: IEventObserver<T>, eventTypes: string[], priority?: number) => void,
	unregisterObserver: (observer: IEventObserver<T>, eventTypes?: string[]) => void,
	notifyObservers: (event: T) => void,
}

export {
	WEATHER_EVENT_TYPE,
	type IEvent,
	type WeatherEvent,
	type IEventObserver,
	type IEventObservable,
}
