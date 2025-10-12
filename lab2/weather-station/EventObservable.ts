import {
	type IEvent,
	type IEventObservable,
	type IEventObserver,
} from './EventTypes'

// Универсальная базовая реализация наблюдаемого с поддержкой типов событий
export abstract class CEventObservable<T extends IEvent = IEvent> implements IEventObservable<T> {
	// Map: eventType -> priority -> Set<observers>
	private eventTypeToPriorityToObservers = new Map<string, Map<number, Set<IEventObserver<T>>>>()
	// Map: observer -> Set<eventTypes> -> priority
	private observerToEventTypesToPriority = new Map<IEventObserver<T>, Map<string, number>>()

	registerObserver(observer: IEventObserver<T>, eventTypes: string[], priority: number = 0): void {
		// Проверяем, не зарегистрирован ли уже этот наблюдатель на эти типы событий
		const existingEventTypes = this.observerToEventTypesToPriority.get(observer)
		if (existingEventTypes) {
			// Проверяем пересечения
			for (const eventType of eventTypes) {
				if (existingEventTypes.has(eventType)) {
					console.warn(`Observer already registered for event type: ${eventType}`)
					continue
				}
			}
		}

		// Регистрируем наблюдателя для каждого типа события
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

			// Сохраняем связь observer -> eventType -> priority
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

		// Если не указаны конкретные типы событий, отписываем от всех
		const typesToUnregister = eventTypes || Array.from(observerEventTypes.keys())

		for (const eventType of typesToUnregister) {
			const priority = observerEventTypes.get(eventType)
			if (priority === undefined) {
				continue
			}

			const priorityMap = this.eventTypeToPriorityToObservers.get(eventType)
			if (priorityMap) {
				const observerSet = priorityMap.get(priority)
				if (observerSet) {
					observerSet.delete(observer)
					if (observerSet.size === 0) {
						priorityMap.delete(priority)
						if (priorityMap.size === 0) {
							this.eventTypeToPriorityToObservers.delete(eventType)
						}
					}
				}
			}

			observerEventTypes.delete(eventType)
		}

		// Если у наблюдателя больше нет подписок, удаляем его полностью
		if (observerEventTypes.size === 0) {
			this.observerToEventTypesToPriority.delete(observer)
		}
	}

	notifyObservers(event: T): void {
		const priorityMap = this.eventTypeToPriorityToObservers.get(event.type)
		if (!priorityMap) {
			return
		}

		// Сортируем приоритеты по убыванию (высший приоритет первым)
		const priorities = Array.from(priorityMap.keys()).sort((a, b) => b - a)

		for (const priority of priorities) {
			const observerSet = priorityMap.get(priority)
			if (!observerSet || observerSet.size === 0) {
				continue
			}

			// Создаем копию множества для безопасной итерации
			const observersCopy = Array.from(observerSet)
			observersCopy.forEach(observer => {
				observer.update(event)
			})
		}
	}

	// Вспомогательный метод для получения информации о подписках
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

	// Вспомогательный метод для получения всех наблюдателей определенного типа события
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
