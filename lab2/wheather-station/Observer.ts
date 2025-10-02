interface IObserver<T> {
	update: (data: T) => void,
}

interface IObservable<T> {
	registerObserver: (observer: IObserver<T>, priority?: number) => void,
	notifyObservers: () => void,
	removeObserver: (observer: IObserver<T>) => void,
}

abstract class CObservable<T> implements IObservable<T> {
	private observerToPriority = new Map<IObserver<T>, number>()
	// Тесты для обсерверов в одном бакете. Какой первый вернется?
	// [x] - Добавил тест. Возвращается в порядке регистрации.
	private priorityToObservers = new Map<number, Set<IObserver<T>>>()

	registerObserver(observer: IObserver<T>, priority: number = 0): void {
		if (this.observerToPriority.has(observer)) {
			return
		}

		let bucket = this.priorityToObservers.get(priority)
		if (!bucket) {
			bucket = new Set<IObserver<T>>()
			this.priorityToObservers.set(priority, bucket)
		}

		bucket.add(observer)
		this.observerToPriority.set(observer, priority)
	}

	notifyObservers(): void {
		const data = this.getChangedData()
		const priorities = Array.from(this.priorityToObservers.keys()).sort((a, b) => b - a)

		for (const priority of priorities) {
			const set = this.priorityToObservers.get(priority)
			if (!set || set.size === 0) {
				continue
			}

			const observersCopy = Array.from(set)
			observersCopy.forEach(observer => {
				observer.update(data)
			})
		}
	}

	removeObserver(observer: IObserver<T>): void {
		const priority = this.observerToPriority.get(observer)
		if (priority === undefined) {
			return
		}
		const bucket = this.priorityToObservers.get(priority)
		if (bucket) {
			bucket.delete(observer)
			if (bucket.size === 0) {
				this.priorityToObservers.delete(priority)
			}
		}
		this.observerToPriority.delete(observer)
	}

	protected abstract getChangedData(): T
}

export {
	IObserver,
	IObservable,
	CObservable,
}
