import {
	type EventTypeMap,
	type IEvent,
	type IEventObservable,
	type IEventObserver,
	type ObserverInfo,
	type ObserverToEventTypesMap,
} from './EventTypes'


abstract class EventObservable<T extends IEvent = IEvent> implements IEventObservable<T> {
	private eventMap: EventTypeMap<T> = new Map()
	private observerMap: ObserverToEventTypesMap<T> = new Map()

	registerObserver(observer: IEventObserver<T>, eventTypes: string[], priority: number = 0): void {
		const existingEventTypes = this.observerMap.get(observer)
		if (existingEventTypes) {
			for (const eventType of eventTypes) {
				if (existingEventTypes.has(eventType)) {
					console.log(`Observer already registered for event type: ${eventType}`)
					continue
				}
			}
		}

		for (const eventType of eventTypes) {
			let priorityMap = this.eventMap.get(eventType)
			if (!priorityMap) {
				priorityMap = new Map<number, Set<IEventObserver<T>>>()
				this.eventMap.set(eventType, priorityMap)
			}

			let observerSet = priorityMap.get(priority)
			if (!observerSet) {
				observerSet = new Set<IEventObserver<T>>()
				priorityMap.set(priority, observerSet)
			}

			observerSet.add(observer)

			if (!this.observerMap.has(observer)) {
				this.observerMap.set(observer, new Map<string, number>())
			}
			this.observerMap.get(observer)!.set(eventType, priority)
		}
	}

	unregisterObserver(observer: IEventObserver<T>, eventTypes?: string[]): void {
		const observerEventTypes = this.observerMap.get(observer)
		if (!observerEventTypes) {
			return
		}

		const typesToUnregister = eventTypes || Array.from(observerEventTypes.keys())

		for (const eventType of typesToUnregister) {
			this.removeObserverFromEventType(observer, eventType, observerEventTypes)
		}

		if (observerEventTypes.size === 0) {
			this.observerMap.delete(observer)
		}
	}

	private removeObserverFromEventType(
		observer: IEventObserver<T>,
		eventType: string,
		observerEventTypes: Map<string, number>,
	): void {
		const priority = observerEventTypes.get(eventType)
		if (priority === undefined) {
			return
		}

		const priorityMap = this.eventMap.get(eventType)
		if (!priorityMap) {
			return
		}

		const observerSet = priorityMap.get(priority)
		if (!observerSet) {
			return
		}

		observerSet.delete(observer)
		if (observerSet.size === 0) {
			priorityMap.delete(priority)
			if (priorityMap.size === 0) {
				this.eventMap.delete(eventType)
			}
		}

		observerEventTypes.delete(eventType)
	}

	notifyObservers(event: T): void {
		const priorityMap = this.eventMap.get(event.type)
		if (!priorityMap) {
			return
		}

		const priorities = Array.from(priorityMap.keys()).sort((a, b) => b - a)

		for (const priority of priorities) {
			const observerSet = priorityMap.get(priority)
			if (!observerSet || observerSet.size === 0) {
				continue
			}

			const observersCopy = Array.from(observerSet)
			observersCopy.forEach(observer => {
				observer.update(event)
			})
		}
	}
}

export {
	EventObservable,
}
