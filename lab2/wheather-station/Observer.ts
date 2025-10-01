interface IObserver<T> {
	update: (data: T) => void,
}

interface IObservable<T> {
	registerObserver: (observer: IObserver<T>) => void,
	notifyObservers: () => void,
	removeObserver: (observer: IObserver<T>) => void,
}

abstract class CObservable<T> implements IObservable<T> {
	private observers = new Set<IObserver<T>>()

	registerObserver(observer: IObserver<T>): void {
		this.observers.add(observer)
	}

	notifyObservers(): void {
		const data = this.getChangedData()
		this.observers.forEach(observer => {
			observer.update(data)
		})
	}

	removeObserver(observer: IObserver<T>): void {
		this.observers.delete(observer)
	}

	protected abstract getChangedData(): T
}

export {
	IObserver,
	IObservable,
	CObservable,
}
