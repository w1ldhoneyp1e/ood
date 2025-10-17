import {type IOutputDataStream} from '../interfaces/IOutputDataStream'
import {OutputStreamDecorator} from './OutputStreamDecorator'

class CompressOutputStream extends OutputStreamDecorator {
	private currentByte: number | null = null
	private count = 0
	private closed = false

	writeByte(data: number): void {
		if (this.closed) {
			throw new Error('Cannot write to closed stream')
		}

		const byte = data & 0xFF

		if (this.currentByte === null) {
			this.currentByte = byte
			this.count = 1
		}
		else if (this.currentByte === byte && this.count < 255) {
			this.count++
		}
		else {
			this.flush()
			this.currentByte = byte
			this.count = 1
		}
	}

	writeBlock(data: Buffer): void {
		for (let i = 0; i < data.length; i++) {
			this.writeByte(data[i])
		}
	}

	close(): void {
		if (!this.closed) {
			this.flush()
			this.stream.close()
			this.closed = true
		}
	}

	private flush(): void {
		if (this.currentByte !== null && this.count > 0) {
			this.stream.writeByte(this.count)
			this.stream.writeByte(this.currentByte)
			this.currentByte = null
			this.count = 0
		}
	}
}

export {
	CompressOutputStream,
}
