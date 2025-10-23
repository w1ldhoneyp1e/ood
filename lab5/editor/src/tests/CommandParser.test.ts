import {CommandParser} from '../parsers/CommandParser'

describe('CommandParser', () => {
	let parser: CommandParser

	beforeEach(() => {
		parser = new CommandParser()
	})

	test('parse insert paragraph command', () => {
		const result = parser.parseCommand('InsertParagraph end Hello World')
		expect(result.type).toBe('InsertParagraph')
		expect(result.args).toEqual(['end', 'Hello', 'World'])
	})

	test('parse set title command', () => {
		const result = parser.parseCommand('SetTitle My Document')
		expect(result.type).toBe('SetTitle')
		expect(result.args).toEqual(['My', 'Document'])
	})

	test('parse list command', () => {
		const result = parser.parseCommand('List')
		expect(result.type).toBe('List')
		expect(result.args).toEqual([])
	})

	test('parse help command', () => {
		const result = parser.parseCommand('Help')
		expect(result.type).toBe('Help')
		expect(result.args).toEqual([])
	})

	test('parse undo command', () => {
		const result = parser.parseCommand('Undo')
		expect(result.type).toBe('Undo')
		expect(result.args).toEqual([])
	})

	test('parse redo command', () => {
		const result = parser.parseCommand('Redo')
		expect(result.type).toBe('Redo')
		expect(result.args).toEqual([])
	})

	test('parse save command', () => {
		const result = parser.parseCommand('Save document.html')
		expect(result.type).toBe('Save')
		expect(result.args).toEqual(['document.html'])
	})

	test('parse command with multiple arguments', () => {
		const result = parser.parseCommand('InsertImage 0 100 200 image.png')
		expect(result.type).toBe('InsertImage')
		expect(result.args).toEqual(['0', '100', '200', 'image.png'])
	})

	test('handle empty command', () => {
		const result = parser.parseCommand('')
		expect(result.type).toBe('')
		expect(result.args).toEqual([])
	})

	test('handle command with only type', () => {
		const result = parser.parseCommand('List')
		expect(result.type).toBe('List')
		expect(result.args).toEqual([])
	})
})
