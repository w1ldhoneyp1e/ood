import * as fs from 'fs'
import {type IInputDataStream} from '../interfaces/IInputDataStream'

class FileInputStream implements IInputDataStream {
	private fd: number
	private position = 0
	private fileSize: number
	private closed = false

	constructor(filename: string) {
		try {
			this.fd = fs.openSync(filename, 'r')
			const stats = fs.fstatSync(this.fd)
			this.fileSize = stats.size
		}
		catch (error) {
			throw new Error(`Failed to open file: ${filename}. ${error}`)
		}
	}

	isEOF(): boolean {
		return this.position >= this.fileSize
	}

	readByte(): number {
		if (this.closed) {
			throw new Error('Cannot read from closed stream')
		}

		if (this.isEOF()) {
			throw new Error('Cannot read byte: end of file')
		}

		const buffer = Buffer.allocUnsafe(1)
		const bytesRead = fs.readSync(this.fd, buffer, 0, 1, this.position)

		if (bytesRead === 0) {
			throw new Error('Failed to read byte from file')
		}

		this.position++
		return buffer[0]
	}

	readBlock(size: number): Buffer {
		if (this.closed) {
			throw new Error('Cannot read from closed stream')
		}

		if (this.isEOF()) {
			return Buffer.alloc(0)
		}

		const bytesToRead = Math.min(size, this.fileSize - this.position)
		const buffer = Buffer.allocUnsafe(bytesToRead)

		try {
			const bytesRead = fs.readSync(this.fd, buffer, 0, bytesToRead, this.position)
			this.position += bytesRead
			return buffer.subarray(0, bytesRead)
		}
		catch (error) {
			throw new Error(`Failed to read block from file: ${error}`)
		}
	}

	close(): void {
		if (!this.closed && this.fd !== undefined) {
			fs.closeSync(this.fd)
			this.closed = true
		}
	}

	[Symbol.dispose]() {
		this.close()
	}
}

export {
	FileInputStream,
}
