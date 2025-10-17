import {CompressOutputStream} from '../decorators/CompressOutputStream'
import {DecompressInputStream} from '../decorators/DecompressInputStream'
import {MemoryInputStream} from '../streams/MemoryInputStream'
import {MemoryOutputStreamMock} from './mocks/MemoryOutputStreamMock'

describe('Compression and Decompression', () => {
	test('compress and decompress', () => {
		const originalData = Buffer.from([5, 5, 5, 5, 10, 10, 15, 20, 20, 20])

		const compressOut = new MemoryOutputStreamMock()
		const compressStream = new CompressOutputStream(compressOut)
		compressStream.writeBlock(originalData)
		compressStream.close()

		const compressedData = compressOut.getData()

		expect(compressedData.length).toBeLessThan(originalData.length)

		const decompressIn = new MemoryInputStream(compressedData)
		const decompressStream = new DecompressInputStream(decompressIn)
		const decompressedData = decompressStream.readBlock(originalData.length)

		expect(decompressedData).toEqual(originalData)
	})

	test('compress data with long runs', () => {
		const originalData = Buffer.alloc(300, 65)

		const compressOut = new MemoryOutputStreamMock()
		const compressStream = new CompressOutputStream(compressOut)
		compressStream.writeBlock(originalData)
		compressStream.close()

		const compressedData = compressOut.getData()

		expect(compressedData.length).toBeLessThan(10)

		const decompressIn = new MemoryInputStream(compressedData)
		const decompressStream = new DecompressInputStream(decompressIn)
		const decompressedData = decompressStream.readBlock(originalData.length)

		expect(decompressedData).toEqual(originalData)
	})

	test('single byte', () => {
		const compressOut = new MemoryOutputStreamMock()
		const compressStream = new CompressOutputStream(compressOut)
		compressStream.writeByte(42)
		compressStream.close()

		const compressedData = compressOut.getData()
		expect(compressedData.length).toBe(2)
		expect(compressedData[0]).toBe(1)
		expect(compressedData[1]).toBe(42)

		const decompressIn = new MemoryInputStream(compressedData)
		const decompressStream = new DecompressInputStream(decompressIn)
		expect(decompressStream.readByte()).toBe(42)
		expect(decompressStream.isEOF()).toBe(true)
	})

	test('maximum run length(255)', () => {
		const originalData = Buffer.alloc(300, 65)

		const compressOut = new MemoryOutputStreamMock()
		const compressStream = new CompressOutputStream(compressOut)
		compressStream.writeBlock(originalData)
		compressStream.close()

		const compressedData = compressOut.getData()
		expect(compressedData.length).toBe(4)
		expect(compressedData[0]).toBe(255)
		expect(compressedData[2]).toBe(45)

		const decompressIn = new MemoryInputStream(compressedData)
		const decompressStream = new DecompressInputStream(decompressIn)
		const decompressedData = decompressStream.readBlock(originalData.length)

		expect(decompressedData).toEqual(originalData)
	})

	test('compress byte by byte', () => {
		const data = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4]

		const compressOut = new MemoryOutputStreamMock()
		const compressStream = new CompressOutputStream(compressOut)

		data.forEach(byte => compressStream.writeByte(byte))
		compressStream.close()

		const compressedData = compressOut.getData()

		const decompressIn = new MemoryInputStream(compressedData)
		const decompressStream = new DecompressInputStream(decompressIn)

		const result: number[] = []
		while (!decompressStream.isEOF()) {
			result.push(decompressStream.readByte())
		}

		expect(result).toEqual(data)
	})
})

