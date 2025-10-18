import {Color} from '../Color'
import {Circle} from '../shapes/Circle'
import {Ellipse} from '../shapes/Ellipse'
import {Line} from '../shapes/Line'
import {Rectangle} from '../shapes/Rectangle'
import {RegularPolygon} from '../shapes/RegularPolygon'
import {ShapeFactory} from '../shapes/ShapeFactory'
import {Text} from '../shapes/Text'
import {Triangle} from '../shapes/Triangle'

describe('ShapeFactory', () => {
	let factory: ShapeFactory

	beforeEach(() => {
		factory = new ShapeFactory()
	})

	describe('createShape', () => {
		it('should create rectangle from description', () => {
			const shape = factory.createShape('rectangle #ff0000 10 20 100 80')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('should create triangle from description', () => {
			const shape = factory.createShape('triangle #00ff00 0 0 50 0 25 50')

			expect(shape).toBeInstanceOf(Triangle)
			expect(shape.color.toString()).toBe('#00ff00')
		})

		it('should create ellipse from description', () => {
			const shape = factory.createShape('ellipse #0000ff 100 100 50 30')

			expect(shape).toBeInstanceOf(Ellipse)
			expect(shape.color.toString()).toBe('#0000ff')
		})

		it('should create polygon from description', () => {
			const shape = factory.createShape('polygon #ffff00 200 200 50 6')

			expect(shape).toBeInstanceOf(RegularPolygon)
			expect(shape.color.toString()).toBe('#ffff00')
		})

		it('should create circle from description', () => {
			const shape = factory.createShape('circle #ffc0cb 100 100 50')

			expect(shape).toBeInstanceOf(Circle)
			expect(shape.color.toString()).toBe('#ffc0cb')
		})

		it('should create line from description', () => {
			const shape = factory.createShape('line #000000 0 0 100 100')

			expect(shape).toBeInstanceOf(Line)
			expect(shape.color.toString()).toBe('#000000')
		})

		it('should create text from description', () => {
			const shape = factory.createShape('text #ff0000 50 100 16 Hello World')

			expect(shape).toBeInstanceOf(Text)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('should handle extra spaces', () => {
			const shape = factory.createShape('  rectangle   #ff0000   10  20  100  80  ')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('should be case insensitive for command type', () => {
			const shape = factory.createShape('RECTANGLE #ff0000 0 0 10 10')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('should throw error for too few parameters', () => {
			expect(() => factory.createShape('rectangle #ff0000'))
				.toThrow(/Rectangle requires 4 coordinates/)
		})

		it('should throw error for invalid color format', () => {
			expect(() => factory.createShape('rectangle orange 0 0 10 10'))
				.toThrow(/Invalid color format/)
		})

		it('should throw error for empty string', () => {
			expect(() => factory.createShape('')).toThrow(/Invalid command description/)
		})

		it('should throw error for unknown shape type', () => {
			expect(() => factory.createShape('unknown #ff0000 100 100 50'))
				.toThrow(/Unknown shape type/)
		})
	})
})
