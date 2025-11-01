import {CommandManager} from '../classes/CommandManager'
import {Document} from '../classes/Document'
import {type ParsedCommand} from '../parser/CommandParser'

describe('CommandManager', () => {
	let commandManager: CommandManager
	let document: Document

	beforeEach(() => {
		document = new Document()
		commandManager = new CommandManager(document)
	})

	test('process help command', () => {
		const parsed: ParsedCommand = {
			type: 'help',
			args: [],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toContain('Доступные команды:')
		expect(result).toContain('InsertParagraph')
		expect(result).toContain('SetTitle')
		expect(result).toContain('List')
		expect(result).toContain('Undo')
		expect(result).toContain('Redo')
		expect(result).toContain('Save')
		expect(result).toContain('Help')
	})

	test('process list command', () => {
		document.setTitle('Test Document')
		document.insertParagraph('Test paragraph')

		const parsed: ParsedCommand = {
			type: 'list',
			args: [],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toContain('Title: Test Document')
		expect(result).toContain('1. Paragraph: Test paragraph')
	})

	test('process set title command', () => {
		const parsed: ParsedCommand = {
			type: 'settitle',
			args: ['My Document'],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toBe('Заголовок установлен')
		expect(document.getTitle()).toBe('My Document')
	})

	test('process insert paragraph command', () => {
		const parsed: ParsedCommand = {
			type: 'insertparagraph',
			args: ['end', 'Hello World'],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toBe('Параграф добавлен')
		expect(document.getItemsCount()).toBe(1)
	})

	test('process undo command', () => {
		const setTitleParsed: ParsedCommand = {
			type: 'settitle',
			args: ['Test'],
		}
		commandManager.processCommand(setTitleParsed)
		expect(document.getTitle()).toBe('Test')

		const undoParsed: ParsedCommand = {
			type: 'undo',
			args: [],
		}
		const result = commandManager.processCommand(undoParsed)

		expect(result).toBe('Операция отменена')
		expect(document.getTitle()).toBe('')
	})

	test('process redo command', () => {
		const setTitleParsed: ParsedCommand = {
			type: 'settitle',
			args: ['Test'],
		}
		commandManager.processCommand(setTitleParsed)
		expect(document.getTitle()).toBe('Test')

		const undoParsed: ParsedCommand = {
			type: 'undo',
			args: [],
		}
		commandManager.processCommand(undoParsed)
		expect(document.getTitle()).toBe('')

		const redoParsed: ParsedCommand = {
			type: 'redo',
			args: [],
		}
		const result = commandManager.processCommand(redoParsed)

		expect(result).toBe('Операция повторена')
		expect(document.getTitle()).toBe('Test')
	})

	test('handle undo when no commands', () => {
		const parsed: ParsedCommand = {
			type: 'undo',
			args: [],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toBe('Ошибка: Нет доступных операций для отмены')
	})

	test('handle redo when no commands', () => {
		const parsed: ParsedCommand = {
			type: 'redo',
			args: [],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toBe('Ошибка: Нет доступных операций для повтора')
	})

	test('process save command', () => {
		document.setTitle('Test Document')
		document.insertParagraph('Test paragraph')

		const parsed: ParsedCommand = {
			type: 'save',
			args: ['test.html'],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toBe('Документ сохранен в test.html')
	})

	test('handle save command without arguments', () => {
		const parsed: ParsedCommand = {
			type: 'save',
			args: [],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toBe('Ошибка: Недостаточно аргументов. Использование: Save <путь>')
	})

	test('handle unknown command', () => {
		const parsed: ParsedCommand = {
			type: 'unknown',
			args: [],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toContain('Ошибка: Неизвестная команда: unknown')
		expect(result).toContain('Введите \'help\' для справки')
	})

	test('handle invalid arguments for insert paragraph', () => {
		const parsed: ParsedCommand = {
			type: 'insertparagraph',
			args: ['end'],
		}
		const result = commandManager.processCommand(parsed)

		expect(result).toContain('Ошибка: Недостаточно аргументов')
		expect(result).toContain('Введите \'help\' для справки')
	})
})
