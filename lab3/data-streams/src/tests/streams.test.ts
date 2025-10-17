import * as fs from 'fs'
import * as path from 'path'
import {FileInputStream} from '../streams/FileInputStream'
import {FileOutputStream} from '../streams/FileOutputStream'
import {MemoryInputStream} from '../streams/MemoryInputStream'
import {MemoryOutputStreamMock} from './mocks/MemoryOutputStreamMock'

describe('MemoryInputStream', () => {
	test('read bytes', () => {
		const data = Buffer.from([1, 2, 3, 4, 5])
		const stream = new MemoryInputStream(data)

		expect(stream.isEOF()).toBe(false)
		expect(stream.readByte()).toBe(1)
		expect(stream.readByte()).toBe(2)
		expect(stream.readByte()).toBe(3)
		expect(stream.readByte()).toBe(4)
		expect(stream.readByte()).toBe(5)
		expect(stream.isEOF()).toBe(true)
	})

	test('read blocks', () => {
		const data = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8])
		const stream = new MemoryInputStream(data)

		const block1 = stream.readBlock(4)
		expect(block1).toEqual(Buffer.from([1, 2, 3, 4]))

		const block2 = stream.readBlock(4)
		expect(block2).toEqual(Buffer.from([5, 6, 7, 8]))

		expect(stream.isEOF()).toBe(true)
	})

	test('reading past EOF', () => {
		const data = Buffer.from([1])
		const stream = new MemoryInputStream(data)

		stream.readByte()
		expect(() => stream.readByte()).toThrow('Cannot read byte: end of stream')
	})

	test('empty buffer at EOF', () => {
		const data = Buffer.from([1, 2, 3])
		const stream = new MemoryInputStream(data)

		stream.readBlock(3)
		expect(stream.readBlock(10).length).toBe(0)
	})
})

describe('MemoryOutputStream', () => {
	test('write bytes', () => {
		const stream = new MemoryOutputStreamMock()

		stream.writeByte(10)
		stream.writeByte(20)
		stream.writeByte(30)

		const data = stream.getData()
		expect(data).toEqual(Buffer.from([10, 20, 30]))
	})

	test('write blocks', () => {
		const stream = new MemoryOutputStreamMock()

		const data = Buffer.from([1, 2, 3, 4, 5])
		stream.writeBlock(data)

		expect(stream.getData()).toEqual(data)
	})

	test('writing after close', () => {
		const stream = new MemoryOutputStreamMock()
		stream.writeByte(1)
		stream.close()

		expect(() => stream.writeByte(2)).toThrow('Cannot write to closed stream')
	})
})

describe('FileInputStream and FileOutputStream', () => {
	const testFile = path.join(__dirname, 'test_file.dat')

	afterEach(() => {
		if (fs.existsSync(testFile)) {
			fs.unlinkSync(testFile)
		}
	})

	test('write and read file', () => {
		const output = new FileOutputStream(testFile)
		output.writeByte(100)
		output.writeByte(200)
		output.writeByte(150)
		output.close()

		const input = new FileInputStream(testFile)
		expect(input.readByte()).toBe(100)
		expect(input.readByte()).toBe(200)
		expect(input.readByte()).toBe(150)
		expect(input.isEOF()).toBe(true)
		input.close()
	})

	test('write and read blocks', () => {
		const writeData = Buffer.from([10, 20, 30, 40, 50, 60, 70, 80])

		const output = new FileOutputStream(testFile)
		output.writeBlock(writeData)
		output.close()

		const input = new FileInputStream(testFile)
		const readData = input.readBlock(8)
		expect(readData).toEqual(writeData)
		input.close()
	})

	test('non-existent file', () => {
		expect(() => new FileInputStream('non_existent_file.dat')).toThrow()
	})

	test('byte truncation with & 0xFF', () => {
		const output = new FileOutputStream(testFile)

		output.writeByte(300)  // 300 & 0xFF = 44
		output.writeByte(1000) // 1000 & 0xFF = 232
		output.writeByte(256)  // 256 & 0xFF = 0
		output.writeByte(255)  // 255 & 0xFF = 255
		output.close()

		const input = new FileInputStream(testFile)
		expect(input.readByte()).toBe(44)
		expect(input.readByte()).toBe(232)
		expect(input.readByte()).toBe(0)
		expect(input.readByte()).toBe(255)
		input.close()
	})

	test('negative numbers with & 0xFF', () => {
		const output = new FileOutputStream(testFile)

		output.writeByte(-1)   // -1 & 0xFF = 255
		output.writeByte(-100) // -100 & 0xFF = 156
		output.writeByte(-256) // -256 & 0xFF = 0
		output.close()

		const input = new FileInputStream(testFile)
		expect(input.readByte()).toBe(255)
		expect(input.readByte()).toBe(156)
		expect(input.readByte()).toBe(0)
		input.close()
	})

	test('reading beyond file size', () => {
		const output = new FileOutputStream(testFile)
		output.writeBlock(Buffer.from([1, 2, 3, 4, 5]))
		output.close()

		const input = new FileInputStream(testFile)

		const block = input.readBlock(10)
		expect(block.length).toBe(5)
		expect(block).toEqual(Buffer.from([1, 2, 3, 4, 5]))
		expect(input.isEOF()).toBe(true)
		input.close()
	})
})

