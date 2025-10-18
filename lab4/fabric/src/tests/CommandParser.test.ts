import {type ParsedCommand, CommandParser} from '../commands/CommandParser'

describe('CommandParser', () => {
	let parser: CommandParser

	beforeEach(() => {
		parser = new CommandParser()
	})

	describe('parse', () => {
		it('should parse rectangle command', () => {
			const parsed = parser.parse('rectangle #ff0000 10 20 100 80')

			expect(parsed).toEqual({
				type: 'rectangle',
				color: '#ff0000',
				args: [10, 20, 100, 80],
			})
		})

		it('should parse triangle command', () => {
			const parsed = parser.parse('triangle #00ff00 0 0 50 0 25 50')

			expect(parsed).toEqual({
				type: 'triangle',
				color: '#00ff00',
				args: [0, 0, 50, 0, 25, 50],
			})
		})

		it('should parse ellipse command', () => {
			const parsed = parser.parse('ellipse #0000ff 100 100 50 30')

			expect(parsed).toEqual({
				type: 'ellipse',
				color: '#0000ff',
				args: [100, 100, 50, 30],
			})
		})

		it('should parse polygon command', () => {
			const parsed = parser.parse('polygon #ffff00 200 200 50 6')

			expect(parsed).toEqual({
				type: 'polygon',
				color: '#ffff00',
				args: [200, 200, 50, 6],
			})
		})

		it('should parse circle command', () => {
			const parsed = parser.parse('circle #ffc0cb 100 100 50')

			expect(parsed).toEqual({
				type: 'circle',
				color: '#ffc0cb',
				args: [100, 100, 50],
			})
		})

		it('should parse line command', () => {
			const parsed = parser.parse('line #000000 0 0 100 100')

			expect(parsed).toEqual({
				type: 'line',
				color: '#000000',
				args: [0, 0, 100, 100],
			})
		})

		it('should parse text command', () => {
			const parsed = parser.parse('text #ff0000 50 100 16 Hello World')

			expect(parsed).toEqual({
				type: 'text',
				color: '#ff0000',
				args: [50, 100, 16],
				text: 'Hello World',
			})
		})

		it('should handle extra spaces', () => {
			const parsed = parser.parse('  rectangle   #ff0000   10  20  100  80  ')

			expect(parsed).toEqual({
				type: 'rectangle',
				color: '#ff0000',
				args: [10, 20, 100, 80],
			})
		})

		it('should be case insensitive for command type', () => {
			const parsed = parser.parse('RECTANGLE #ff0000 0 0 10 10')

			expect(parsed).toEqual({
				type: 'rectangle',
				color: '#ff0000',
				args: [0, 0, 10, 10],
			})
		})

		it('should throw error for too few parameters', () => {
			expect(() => parser.parse('rectangle #ff0000'))
				.toThrow(/Rectangle requires 4 coordinates/)
		})

		it('should throw error for empty string', () => {
			expect(() => parser.parse('')).toThrow(/Invalid command description/)
		})

		it('should throw error for unknown shape type', () => {
			expect(() => parser.parse('unknown #ff0000 100 100 50'))
				.toThrow(/Unknown shape type/)
		})
	})
})
