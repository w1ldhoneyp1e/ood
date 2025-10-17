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
		it('should create rectangle from correct description', () => {
			const shape = factory.createShape('rectangle #ff0000 10 20 100 80')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('should create triangle from correct description', () => {
			const shape = factory.createShape('triangle #00ff00 0 0 50 0 25 50')

			expect(shape).toBeInstanceOf(Triangle)
			expect(shape.color.toString()).toBe('#00ff00')
		})

		it('should create ellipse from correct description', () => {
			const shape = factory.createShape('ellipse #0000ff 100 100 50 30')

			expect(shape).toBeInstanceOf(Ellipse)
			expect(shape.color.toString()).toBe('#0000ff')
		})

		it('should create polygon from correct description', () => {
			const shape = factory.createShape('polygon #ffff00 200 200 50 6')

			expect(shape).toBeInstanceOf(RegularPolygon)
			expect(shape.color.toString()).toBe('#ffff00')
		})

		it('should support hex color format', () => {
			expect(factory.createShape('rectangle #00ff00 0 0 10 10').color
				.toString()).toBe('#00ff00')
			expect(factory.createShape('rectangle #ff0000 0 0 10 10').color
				.toString()).toBe('#ff0000')
			expect(factory.createShape('rectangle #0000ff 0 0 10 10').color
				.toString()).toBe('#0000ff')
			expect(factory.createShape('rectangle #ffff00 0 0 10 10').color
				.toString()).toBe('#ffff00')
			expect(factory.createShape('rectangle #ffc0cb 0 0 10 10').color
				.toString()).toBe('#ffc0cb')
			expect(factory.createShape('rectangle #000000 0 0 10 10').color
				.toString()).toBe('#000000')
		})

		it('should throw error for unknown shape type', () => {
			expect(() => factory.createShape('unknown #ff0000 100 100 50'))
				.toThrow(/Unknown shape type/)
		})

		it('should throw error for invalid color format', () => {
			expect(() => factory.createShape('rectangle orange 0 0 10 10'))
				.toThrow(/Invalid color format/)
		})

		it('should throw error for incorrect parameter count', () => {
			expect(() => factory.createShape('rectangle #ff0000 0 0'))
				.toThrow(/requires 4 coordinates/)
		})

		it('should handle extra spaces', () => {
			const shape = factory.createShape('  rectangle   #ff0000   10  20  100  80  ')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('should be case insensitive for shape type', () => {
			expect(factory.createShape('RECTANGLE #ff0000 0 0 10 10')).toBeInstanceOf(Rectangle)
			expect(factory.createShape('Rectangle #ff0000 0 0 10 10')).toBeInstanceOf(Rectangle)
		})

		it('should create circle from correct description', () => {
			const shape = factory.createShape('circle #0000ff 100 100 50')

			expect(shape).toBeInstanceOf(Circle)
			expect(shape.color.toString()).toBe('#0000ff')
		})

		it('should create line from correct description', () => {
			const shape = factory.createShape('line #00ff00 0 0 100 100')

			expect(shape).toBeInstanceOf(Line)
			expect(shape.color.toString()).toBe('#00ff00')
		})

		it('should create text from correct description', () => {
			const shape = factory.createShape('text #ff0000 50 100 16 Hello World')

			expect(shape).toBeInstanceOf(Text)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('should create text with multiple words', () => {
			const shape = factory.createShape('text #000000 10 20 14 This is a test')

			expect(shape).toBeInstanceOf(Text)
		})

		it('should throw error for empty string', () => {
			expect(() => factory.createShape('')).toThrow()
		})
	})
})
