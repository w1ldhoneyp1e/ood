import {type IOutputDataStream} from '../interfaces/IOutputDataStream'

class MemoryOutputStream implements IOutputDataStream {
	private data: number[] = []
	private closed = false

	writeByte(data: number): void {
		this.checkClosed()
		this.data.push(data & 0xFF)
	}

	writeBlock(data: Buffer): void {
		this.checkClosed()
		for (let i = 0; i < data.length; i++) {
			this.data.push(data[i])
		}
	}

	close(): void {
		this.closed = true
	}

	private checkClosed(): void {
		if (this.closed) {
			throw new Error('Cannot write to closed stream')
		}
	}
}

export {
	MemoryOutputStream,
}
