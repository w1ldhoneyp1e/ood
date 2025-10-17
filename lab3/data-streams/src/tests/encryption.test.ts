import {DecryptInputStream} from '../decorators/DecryptInputStream'
import {EncryptOutputStream} from '../decorators/EncryptOutputStream'
import {MemoryInputStream} from '../streams/MemoryInputStream'
import {MemoryOutputStreamMock} from './mocks/MemoryOutputStreamMock'

describe('Encryption and Decryption', () => {
	test('encrypt and decrypt', () => {
		const key = 12345
		const originalData = Buffer.from([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

		const encryptOut = new MemoryOutputStreamMock()
		const encryptStream = new EncryptOutputStream(encryptOut, key)
		encryptStream.writeBlock(originalData)
		encryptStream.close()

		const encryptedData = encryptOut.getData()

		expect(encryptedData.length).toBe(originalData.length)
		expect(encryptedData).not.toEqual(originalData)

		const decryptIn = new MemoryInputStream(encryptedData)
		const decryptStream = new DecryptInputStream(decryptIn, key)
		const decryptedData = decryptStream.readBlock(originalData.length)

		expect(decryptedData).toEqual(originalData)
	})

	test('multiple encryption layers', () => {
		const key1 = 111
		const key2 = 222
		const originalData = Buffer.from([1, 2, 3, 4, 5])

		const encryptOut = new MemoryOutputStreamMock()
		let stream = new EncryptOutputStream(encryptOut, key1)
		stream = new EncryptOutputStream(stream, key2)
		stream.writeBlock(originalData)
		stream.close()

		const encryptedData = encryptOut.getData()

		const decryptIn = new MemoryInputStream(encryptedData)
		let inStream = new DecryptInputStream(decryptIn, key1)
		inStream = new DecryptInputStream(inStream, key2)
		const decryptedData = inStream.readBlock(originalData.length)

		expect(decryptedData).toEqual(originalData)
	})

	test('different results with different keys', () => {
		const key1 = 100
		const key2 = 200
		const data = Buffer.from([1, 2, 3, 4, 5])

		const out1 = new MemoryOutputStreamMock()
		const enc1 = new EncryptOutputStream(out1, key1)
		enc1.writeBlock(data)
		enc1.close()

		const out2 = new MemoryOutputStreamMock()
		const enc2 = new EncryptOutputStream(out2, key2)
		enc2.writeBlock(data)
		enc2.close()

		expect(out1.getData()).not.toEqual(out2.getData())
	})

	test('encrypt byte by byte', () => {
		const key = 99999
		const data = [65, 66, 67]

		const encryptOut = new MemoryOutputStreamMock()
		const encryptStream = new EncryptOutputStream(encryptOut, key)

		data.forEach(byte => encryptStream.writeByte(byte))
		encryptStream.close()

		const encryptedData = encryptOut.getData()

		const decryptIn = new MemoryInputStream(encryptedData)
		const decryptStream = new DecryptInputStream(decryptIn, key)

		data.forEach(byte => {
			expect(decryptStream.readByte()).toBe(byte)
		})
	})
})

