import {type IOutputDataStream} from '../interfaces/IOutputDataStream'
import {generateEncryptionTable} from './encryptionUtils'
import {OutputStreamDecorator} from './OutputStreamDecorator'

class EncryptOutputStream extends OutputStreamDecorator {
	private encryptTable: number[]

	constructor(stream: IOutputDataStream, key: number) {
		super(stream)
		this.encryptTable = generateEncryptionTable(key)
	}

	writeByte(data: number): void {
		const encrypted = this.encryptTable[data & 0xFF]
		this.stream.writeByte(encrypted)
	}

	writeBlock(data: Buffer): void {
		const encrypted = Buffer.alloc(data.length)
		for (let i = 0; i < data.length; i++) {
			encrypted[i] = this.encryptTable[data[i]]
		}
		this.stream.writeBlock(encrypted)
	}
}

export {
	EncryptOutputStream,
}
