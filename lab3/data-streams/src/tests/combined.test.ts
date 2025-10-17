import {CompressOutputStream} from '../decorators/CompressOutputStream'
import {DecompressInputStream} from '../decorators/DecompressInputStream'
import {DecryptInputStream} from '../decorators/DecryptInputStream'
import {EncryptOutputStream} from '../decorators/EncryptOutputStream'
import {MemoryInputStream} from '../streams/MemoryInputStream'
import {MemoryOutputStreamMock} from './mocks/MemoryOutputStreamMock'

describe('Combined Decorators', () => {
	test('encrypt + compress pipeline', () => {
		const key = 99999
		const originalData = Buffer.alloc(100, 42)

		const out = new MemoryOutputStreamMock()
		const encryptStream = new EncryptOutputStream(out, key)
		const compressStream = new CompressOutputStream(encryptStream)
		compressStream.writeBlock(originalData)
		compressStream.close()

		const processedData = out.getData()

		const input = new MemoryInputStream(processedData)
		const decompressStream = new DecompressInputStream(input)
		const decryptStream = new DecryptInputStream(decompressStream, key)

		const restoredData = decryptStream.readBlock(originalData.length)
		expect(restoredData).toEqual(originalData)
	})

	test('should handle complex transformation pipeline', () => {
		const originalData = Buffer.from([
			10,
			10,
			10,
			20,
			20,
			30,
			40,
			40,
			40,
			40,
			50,
			60,
			60,
			70,
			70,
			70,
			80,
			90,
			90,
			100,
		])

		const key1 = 11111
		const key2 = 22222

		const out = new MemoryOutputStreamMock()
		const encryptStream1 = new EncryptOutputStream(out, key1)
		const encryptStream2 = new EncryptOutputStream(encryptStream1, key2)
		const compressStream = new CompressOutputStream(encryptStream2)
		compressStream.writeBlock(originalData)
		compressStream.close()

		const processedData = out.getData()

		const input = new MemoryInputStream(processedData)
		const decryptStream1 = new DecryptInputStream(input, key1)
		const decryptStream2 = new DecryptInputStream(decryptStream1, key2)
		const decompressStream = new DecompressInputStream(decryptStream2)

		const restoredData = decompressStream.readBlock(originalData.length)
		expect(restoredData).toEqual(originalData)
	})

	test('compress + encrypt pipeline', () => {
		const key = 54321
		const originalData = Buffer.from('AAAAABBBBBCCCCCDDDDD')

		const out = new MemoryOutputStreamMock()
		const compressStream = new CompressOutputStream(out)
		const encryptStream = new EncryptOutputStream(compressStream, key)
		encryptStream.writeBlock(originalData)
		encryptStream.close()

		const processedData = out.getData()

		const input = new MemoryInputStream(processedData)
		const decompressStream = new DecompressInputStream(input)
		const decryptStream = new DecryptInputStream(decompressStream, key)

		const restoredData = decryptStream.readBlock(originalData.length)
		expect(restoredData).toEqual(originalData)
	})

	test('empty data', () => {
		const originalData = Buffer.alloc(0)

		const out = new MemoryOutputStreamMock()
		const stream = new CompressOutputStream(out)
		stream.writeBlock(originalData)
		stream.close()

		const processedData = out.getData()
		expect(processedData.length).toBe(0)
	})

	test('multiple transformations', () => {
		const originalData = Buffer.from('hello world')
		const key = 77777

		const out = new MemoryOutputStreamMock()
		const encryptStream1 = new EncryptOutputStream(out, key)
		const encryptStream2 = new EncryptOutputStream(encryptStream1, key * 2)
		const compressStream = new CompressOutputStream(encryptStream2)
		const encryptStream3 = new EncryptOutputStream(compressStream, key * 3)
		encryptStream3.writeBlock(originalData)
		encryptStream3.close()

		const processedData = out.getData()

		const input = new MemoryInputStream(processedData)
		const decryptStream1 = new DecryptInputStream(input, key)
		const decryptStream2 = new DecryptInputStream(decryptStream1, key * 2)
		const decompressStream = new DecompressInputStream(decryptStream2)
		const decryptStream3 = new DecryptInputStream(decompressStream, key * 3)

		const restoredData = decryptStream3.readBlock(originalData.length)
		expect(restoredData.toString()).toBe(originalData.toString())
	})
})

