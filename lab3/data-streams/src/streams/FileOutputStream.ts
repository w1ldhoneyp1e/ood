import * as fs from 'fs'
import {type IOutputDataStream} from '../interfaces/IOutputDataStream'

class FileOutputStream implements IOutputDataStream {
	private fd: number
	private closed = false

	constructor(filename: string) {
		try {
			this.fd = fs.openSync(filename, 'w')
		}
		catch (error) {
			throw new Error(`Failed to open file for writing: ${filename}. ${error}`)
		}
	}

	writeByte(data: number): void {
		this.checkClosed()

		const buffer = Buffer.from([data & 0xFF])
		try {
			fs.writeSync(this.fd, buffer)
		}
		catch (error) {
			throw new Error(`Failed to write byte to file: ${error}`)
		}
	}

	writeBlock(data: Buffer): void {
		this.checkClosed()

		try {
			fs.writeSync(this.fd, data)
		}
		catch (error) {
			throw new Error(`Failed to write block to file: ${error}`)
		}
	}

	close(): void {
		if (this.closed) {
			return
		}

		this.closed = true
		if (this.fd !== undefined) {
			fs.closeSync(this.fd)
		}
	}

	private checkClosed(): void {
		if (this.closed) {
			throw new Error('Cannot write to closed stream')
		}
	}

	[Symbol.dispose]() {
		this.close()
	}
}

export {
	FileOutputStream,
}
