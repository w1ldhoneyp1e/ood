import {CommandExecutor} from '../commands/CommandExecutor'
import {Circle} from '../shapes/Circle'
import {Ellipse} from '../shapes/Ellipse'
import {Line} from '../shapes/Line'
import {Rectangle} from '../shapes/Rectangle'
import {RegularPolygon} from '../shapes/RegularPolygon'
import {ShapeFactory} from '../shapes/ShapeFactory'
import {Text} from '../shapes/Text'
import {Triangle} from '../shapes/Triangle'

describe('CommandExecutor', () => {
	let executor: CommandExecutor
	let factory: ShapeFactory

	beforeEach(() => {
		factory = new ShapeFactory()
		executor = new CommandExecutor(factory)
	})

	describe('execute', () => {
		it('execute rectangle command', () => {
			const shape = executor.execute('rectangle #ff0000 10 20 100 80')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('execute triangle command', () => {
			const shape = executor.execute('triangle #00ff00 0 0 50 0 25 50')

			expect(shape).toBeInstanceOf(Triangle)
			expect(shape.color.toString()).toBe('#00ff00')
		})

		it('execute ellipse command', () => {
			const shape = executor.execute('ellipse #0000ff 100 100 50 30')

			expect(shape).toBeInstanceOf(Ellipse)
			expect(shape.color.toString()).toBe('#0000ff')
		})

		it('execute polygon command', () => {
			const shape = executor.execute('polygon #ffff00 200 200 50 6')

			expect(shape).toBeInstanceOf(RegularPolygon)
			expect(shape.color.toString()).toBe('#ffff00')
		})

		it('execute circle command', () => {
			const shape = executor.execute('circle #ffc0cb 100 100 50')

			expect(shape).toBeInstanceOf(Circle)
			expect(shape.color.toString()).toBe('#ffc0cb')
		})

		it('execute line command', () => {
			const shape = executor.execute('line #000000 0 0 100 100')

			expect(shape).toBeInstanceOf(Line)
			expect(shape.color.toString()).toBe('#000000')
		})

		it('execute text command', () => {
			const shape = executor.execute('text #ff0000 50 100 16 Hello World')

			expect(shape).toBeInstanceOf(Text)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('handle extra spaces', () => {
			const shape = executor.execute('  rectangle   #ff0000   10  20  100  80  ')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('be case insensitive for command type', () => {
			const shape = executor.execute('RECTANGLE #ff0000 0 0 10 10')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('throw error for too few parameters', () => {
			expect(() => executor.execute('rectangle #ff0000'))
				.toThrow(/Rectangle requires 4 coordinates/)
		})

		it('throw error for invalid color format', () => {
			expect(() => executor.execute('rectangle orange 0 0 10 10'))
				.toThrow(/Invalid color format/)
		})

		it('throw error for empty string', () => {
			expect(() => executor.execute('')).toThrow(/Invalid command description/)
		})

		it('throw error for unknown shape type', () => {
			expect(() => executor.execute('unknown #ff0000 100 100 50'))
				.toThrow(/Unknown shape type/)
		})
	})
})
