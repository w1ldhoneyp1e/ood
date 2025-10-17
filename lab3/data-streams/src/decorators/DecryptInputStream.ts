import {type IInputDataStream} from '../interfaces/IInputDataStream'
import {InputStreamDecorator} from './InputStreamDecorator'
import {generateDecryptionTable} from './encryptionUtils'

class DecryptInputStream extends InputStreamDecorator {
	private decryptTable: number[]

	constructor(stream: IInputDataStream, key: number) {
		super(stream)
		this.decryptTable = generateDecryptionTable(key)
	}

	isEOF(): boolean {
		return this.stream.isEOF()
	}

	readByte(): number {
		const encrypted = this.stream.readByte()
		return this.decryptTable[encrypted]
	}

	readBlock(size: number): Buffer {
		const encrypted = this.stream.readBlock(size)
		const decrypted = Buffer.alloc(encrypted.length)

		for (let i = 0; i < encrypted.length; i++) {
			decrypted[i] = this.decryptTable[encrypted[i]]
		}

		return decrypted
	}
}

export {
	DecryptInputStream,
}
