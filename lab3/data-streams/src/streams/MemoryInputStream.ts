import {type IInputDataStream} from '../interfaces/IInputDataStream'

class MemoryInputStream implements IInputDataStream {
	private data: Buffer
	private position = 0

	constructor(data: Buffer) {
		this.data = Buffer.from(data)
	}

	isEOF(): boolean {
		return this.position >= this.data.length
	}

	readByte(): number {
		if (this.isEOF()) {
			throw new Error('Cannot read byte: end of stream')
		}

		return this.data[this.position++]
	}

	readBlock(size: number): Buffer {
		if (this.isEOF()) {
			return Buffer.alloc(0)
		}

		const bytesToRead = Math.min(size, this.data.length - this.position)
		const result = this.data.subarray(this.position, this.position + bytesToRead)
		this.position += bytesToRead

		return result
	}
}

export {
	MemoryInputStream,
}
