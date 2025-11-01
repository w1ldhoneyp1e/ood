import * as path from 'path'
import * as fs from 'fs-extra'
import {Document} from '../classes/Document'
import {CommandFactory} from '../commands/CommandFactory'
import {type ParsedCommand} from '../parser/CommandParser'

describe('CommandFactory', () => {
	let commandFactory: CommandFactory
	let document: Document

	beforeEach(() => {
		document = new Document()
		commandFactory = new CommandFactory(document)
	})

	test('create insert paragraph command', () => {
		const parsed: ParsedCommand = {
			type: 'insertparagraph',
			args: ['end', 'Hello World'],
		}
		const command = commandFactory.createCommand(parsed)

		expect(command).toBeDefined()
		expect(typeof command.execute).toBe('function')
		expect(typeof command.undo).toBe('function')
	})

	test('create insert image command', () => {
		const tempImagePath = path.join(__dirname, 'temp-test.png')
		fs.writeFileSync(tempImagePath, 'mock image data')

		try {
			const parsed: ParsedCommand = {
				type: 'insertimage',
				args: ['0', '100', '200', tempImagePath],
			}
			const command = commandFactory.createCommand(parsed)

			expect(command).toBeDefined()
			expect(typeof command.execute).toBe('function')
			expect(typeof command.undo).toBe('function')
		}
		finally {
			if (fs.existsSync(tempImagePath)) {
				fs.unlinkSync(tempImagePath)
			}
		}
	})

	test('create set title command', () => {
		const parsed: ParsedCommand = {
			type: 'settitle',
			args: ['My Document'],
		}
		const command = commandFactory.createCommand(parsed)

		expect(command).toBeDefined()
		expect(typeof command.execute).toBe('function')
		expect(typeof command.undo).toBe('function')
	})

	test('create replace text command', () => {
		document.insertParagraph('Original text')

		const parsed: ParsedCommand = {
			type: 'replacetext',
			args: ['0', 'New text'],
		}
		const command = commandFactory.createCommand(parsed)

		expect(command).toBeDefined()
		expect(typeof command.execute).toBe('function')
		expect(typeof command.undo).toBe('function')
	})

	test('create resize image command', () => {
		const tempImagePath = path.join(__dirname, 'temp-test.png')
		fs.writeFileSync(tempImagePath, 'fake image data')

		try {
			document.insertImage(tempImagePath, 100, 200)

			const parsed: ParsedCommand = {
				type: 'resizeimage',
				args: ['0', '300', '400'],
			}
			const command = commandFactory.createCommand(parsed)

			expect(command).toBeDefined()
			expect(typeof command.execute).toBe('function')
			expect(typeof command.undo).toBe('function')
		}
		finally {
			if (fs.existsSync(tempImagePath)) {
				fs.unlinkSync(tempImagePath)
			}
		}
	})

	test('create delete item command', () => {
		document.insertParagraph('Test paragraph')

		const parsed: ParsedCommand = {
			type: 'deleteitem',
			args: ['0'],
		}
		const command = commandFactory.createCommand(parsed)

		expect(command).toBeDefined()
		expect(typeof command.execute).toBe('function')
		expect(typeof command.undo).toBe('function')
	})

	test('throw error for unknown command', () => {
		const parsed: ParsedCommand = {
			type: 'unknown',
			args: [],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Неизвестная команда: unknown')
	})

	test('throw error for insert paragraph with insufficient arguments', () => {
		const parsed: ParsedCommand = {
			type: 'insertparagraph',
			args: ['end'],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Недостаточно аргументов')
	})

	test('throw error for insert image with insufficient arguments', () => {
		const parsed: ParsedCommand = {
			type: 'insertimage',
			args: ['0', '100'],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Недостаточно аргументов')
	})

	test('throw error for set title with no arguments', () => {
		const parsed: ParsedCommand = {
			type: 'settitle',
			args: [],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Недостаточно аргументов')
	})

	test('throw error for replace text with insufficient arguments', () => {
		const parsed: ParsedCommand = {
			type: 'replacetext',
			args: ['0'],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Недостаточно аргументов')
	})

	test('throw error for resize image with insufficient arguments', () => {
		const parsed: ParsedCommand = {
			type: 'resizeimage',
			args: ['0', '100'],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Недостаточно аргументов')
	})

	test('throw error for delete item with no arguments', () => {
		const parsed: ParsedCommand = {
			type: 'deleteitem',
			args: [],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Недостаточно аргументов')
	})

	test('throw error for invalid position in insert paragraph', () => {
		const parsed: ParsedCommand = {
			type: 'insertparagraph',
			args: ['abc', 'Hello'],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Позиция должна быть числом или "end"')
	})

	test('throw error for invalid dimensions in insert image', () => {
		const parsed: ParsedCommand = {
			type: 'insertimage',
			args: ['0', 'abc', '200', 'test.png'],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Ширина и высота должны быть числами')
	})

	test('throw error for non-existent image file', () => {
		const parsed: ParsedCommand = {
			type: 'insertimage',
			args: ['end', '100', '200', 'non-existent-file.jpg'],
		}

		expect(() => commandFactory.createCommand(parsed)).toThrow('Файл изображения не найден')
	})
})
