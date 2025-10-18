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
		it('create rectangle', () => {
			const shape = factory.createShape('rectangle #ff0000 10 20 100 80')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('create triangle', () => {
			const shape = factory.createShape('triangle #00ff00 0 0 50 0 25 50')

			expect(shape).toBeInstanceOf(Triangle)
			expect(shape.color.toString()).toBe('#00ff00')
		})

		it('create ellipse', () => {
			const shape = factory.createShape('ellipse #0000ff 100 100 50 30')

			expect(shape).toBeInstanceOf(Ellipse)
			expect(shape.color.toString()).toBe('#0000ff')
		})

		it('create polygon', () => {
			const shape = factory.createShape('polygon #ffff00 200 200 50 6')

			expect(shape).toBeInstanceOf(RegularPolygon)
			expect(shape.color.toString()).toBe('#ffff00')
		})

		it('unknown shape type', () => {
			expect(() => factory.createShape('unknown #ff0000 100 100 50'))
				.toThrow(/Unknown shape type/)
		})

		it('invalid color format', () => {
			expect(() => factory.createShape('rectangle orange 0 0 10 10'))
				.toThrow(/Invalid color format/)
		})

		it('incorrect parameter count', () => {
			expect(() => factory.createShape('rectangle #ff0000 0 0'))
				.toThrow(/requires 4 coordinates/)
		})

		it('handle extra spaces', () => {
			const shape = factory.createShape('  rectangle   #ff0000   10  20  100  80  ')

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('case insensitive for shape type', () => {
			expect(factory.createShape('RECTANGLE #ff0000 0 0 10 10')).toBeInstanceOf(Rectangle)
			expect(factory.createShape('Rectangle #ff0000 0 0 10 10')).toBeInstanceOf(Rectangle)
		})

		it('create circle', () => {
			const shape = factory.createShape('circle #0000ff 100 100 50')

			expect(shape).toBeInstanceOf(Circle)
			expect(shape.color.toString()).toBe('#0000ff')
		})

		it('create line', () => {
			const shape = factory.createShape('line #00ff00 0 0 100 100')

			expect(shape).toBeInstanceOf(Line)
			expect(shape.color.toString()).toBe('#00ff00')
		})

		it('create text', () => {
			const shape = factory.createShape('text #ff0000 50 100 16 Hello World')

			expect(shape).toBeInstanceOf(Text)
			expect(shape.color.toString()).toBe('#ff0000')
		})

		it('text with multiple words', () => {
			const shape = factory.createShape('text #000000 10 20 14 This is a test')

			expect(shape).toBeInstanceOf(Text)
		})

		it('empty string', () => {
			expect(() => factory.createShape('')).toThrow()
		})
	})
})
