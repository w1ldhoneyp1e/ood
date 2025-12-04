interface Shared<T> {
	data: T,
	refCount: number,
}

class CoW<T> {
	private shared: Shared<T>

	constructor(data: T, shared?: Shared<T>) {
		this.shared = shared ?? {
			data,
			refCount: 1,
		}
	}

	get(): T {
		return this.shared.data
	}

	getRefCount(): number {
		return this.shared.refCount
	}

	clone(): CoW<T> {
		this.shared.refCount++

		return new CoW(this.shared.data, this.shared)
	}

	unshare(): T {
		if (this.shared.refCount > 1) {
			this.shared.refCount--
			this.shared = {
				data: this.deepCopy(this.shared.data),
				refCount: 1,
			}
		}

		return this.shared.data
	}

	private deepCopy(data: T): T {
		if (data && typeof data === 'object') {
			if (Array.isArray(data)) {
				return data.map(item => this.deepCopy(item)) as unknown as T
			}

			const dataWithClone = data as unknown as {clone?: () => T}
			if (typeof dataWithClone.clone === 'function') {
				return dataWithClone.clone()
			}

			const copy = {} as Record<string, unknown>
			for (const key in data) {
				if (Object.prototype.hasOwnProperty.call(data, key)) {
					copy[key] = this.deepCopy((data as Record<string, unknown>)[key] as T)
				}
			}

			return copy as T
		}

		return data
	}

}

export {
	CoW,
}
