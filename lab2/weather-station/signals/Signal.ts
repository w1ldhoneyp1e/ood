type SlotFunction<T> = (data: T) => void

class Connection {
	constructor(private disconnectFn: () => void) {}

	disconnect(): void {
		this.disconnectFn()
	}
}

class Signal<T = void> {
	private slots: Map<number, SlotFunction<T>> = new Map<number, SlotFunction<T>>()
	private nextId = 0

	connect(slot: SlotFunction<T>): Connection {
		const id = this.nextId++
		this.slots.set(id, slot)

		return new Connection(() => {
			this.slots.delete(id)
		})
	}

	emit(data: T): void {
		this.slots.forEach(slot => {
			slot(data)
		})
	}

	disconnectAll(): void {
		this.slots.clear()
	}

	get numSlots(): number {
		return this.slots.size
	}
}

export {
	Signal,
	Connection,
	SlotFunction,
}

