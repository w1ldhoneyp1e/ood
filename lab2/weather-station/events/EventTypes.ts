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

type ObserverSet<T extends IEvent = IEvent> = Set<IEventObserver<T>>
type PriorityMap<T extends IEvent = IEvent> = Map<number, ObserverSet<T>>
type EventTypeMap<T extends IEvent = IEvent> = Map<string, PriorityMap<T>>
type ObserverEventTypesMap = Map<string, number>
type ObserverToEventTypesMap<T extends IEvent = IEvent> = Map<IEventObserver<T>, ObserverEventTypesMap>

interface ObserverInfo {
	eventTypes: string[],
	priorities: ObserverEventTypesMap,
}

export {
	WEATHER_EVENT_TYPE,
	type IEvent,
	type WeatherEvent,
	type IEventObserver,
	type IEventObservable,
	type ObserverSet,
	type PriorityMap,
	type EventTypeMap,
	type ObserverEventTypesMap,
	type ObserverToEventTypesMap,
	type ObserverInfo,
}
