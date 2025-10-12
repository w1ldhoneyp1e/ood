import {
	type IEvent,
	type IEventObservable,
	type IEventObserver,
} from './EventTypes'


abstract class EventObservable<T extends IEvent = IEvent> implements IEventObservable<T> {
	private eventTypeToPriorityToObservers = new Map<string, Map<number, Set<IEventObserver<T>>>>()
	private observerToEventTypesToPriority = new Map<IEventObserver<T>, Map<string, number>>()

	registerObserver(observer: IEventObserver<T>, eventTypes: string[], priority: number = 0): void {
		const existingEventTypes = this.observerToEventTypesToPriority.get(observer)
		if (existingEventTypes) {
			for (const eventType of eventTypes) {
				if (existingEventTypes.has(eventType)) {
					console.log(`Observer already registered for event type: ${eventType}`)
					continue
				}
			}
		}

		for (const eventType of eventTypes) {
			let priorityMap = this.eventTypeToPriorityToObservers.get(eventType)
			if (!priorityMap) {
				priorityMap = new Map<number, Set<IEventObserver<T>>>()
				this.eventTypeToPriorityToObservers.set(eventType, priorityMap)
			}

			let observerSet = priorityMap.get(priority)
			if (!observerSet) {
				observerSet = new Set<IEventObserver<T>>()
				priorityMap.set(priority, observerSet)
			}

			observerSet.add(observer)

			if (!this.observerToEventTypesToPriority.has(observer)) {
				this.observerToEventTypesToPriority.set(observer, new Map<string, number>())
			}
			this.observerToEventTypesToPriority.get(observer)!.set(eventType, priority)
		}
	}

	unregisterObserver(observer: IEventObserver<T>, eventTypes?: string[]): void {
		const observerEventTypes = this.observerToEventTypesToPriority.get(observer)
		if (!observerEventTypes) {
			return
		}

		const typesToUnregister = eventTypes || Array.from(observerEventTypes.keys())

		for (const eventType of typesToUnregister) {
			this.removeObserverFromEventType(observer, eventType, observerEventTypes)
		}

		if (observerEventTypes.size === 0) {
			this.observerToEventTypesToPriority.delete(observer)
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

		const priorityMap = this.eventTypeToPriorityToObservers.get(eventType)
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
				this.eventTypeToPriorityToObservers.delete(eventType)
			}
		}

		observerEventTypes.delete(eventType)
	}

	notifyObservers(event: T): void {
		const priorityMap = this.eventTypeToPriorityToObservers.get(event.type)
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

	getObserverInfo(observer: IEventObserver<T>): {
		eventTypes: string[],
		priorities: Map<string, number>,
	} | null {
		const eventTypesMap = this.observerToEventTypesToPriority.get(observer)
		if (!eventTypesMap) {
			return null
		}

		return {
			eventTypes: Array.from(eventTypesMap.keys()),
			priorities: new Map(eventTypesMap),
		}
	}

	getObserversForEventType(eventType: string): IEventObserver<T>[] {
		const priorityMap = this.eventTypeToPriorityToObservers.get(eventType)
		if (!priorityMap) {
			return []
		}

		const observers: IEventObserver<T>[] = []
		const priorities = Array.from(priorityMap.keys()).sort((a, b) => b - a)

		for (const priority of priorities) {
			const observerSet = priorityMap.get(priority)
			if (observerSet) {
				observers.push(...Array.from(observerSet))
			}
		}

		return observers
	}
}

export {
	EventObservable,
}
