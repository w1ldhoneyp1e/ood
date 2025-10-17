import {type IInputDataStream} from '../interfaces/IInputDataStream'
import {InputStreamDecorator} from './InputStreamDecorator'

class DecompressInputStream extends InputStreamDecorator {
	private currentByte: number | null = null
	private remaining = 0

	isEOF(): boolean {
		return this.remaining === 0 && this.stream.isEOF()
	}

	readByte(): number {
		if (this.remaining === 0) {
			this.readNextChunk()
		}

		this.remaining--
		return this.currentByte!
	}

	readBlock(size: number): Buffer {
		const result: number[] = []

		while (result.length < size && !this.isEOF()) {
			result.push(this.readByte())
		}

		return Buffer.from(result)
	}

	private readNextChunk(): void {
		this.remaining = this.stream.readByte()
		this.currentByte = this.stream.readByte()
	}
}

export {
	DecompressInputStream,
}
