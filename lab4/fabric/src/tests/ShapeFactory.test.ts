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

	describe('createRectangle', () => {
		it('create rectangle', () => {
			const shape = factory.createRectangle('#ff0000', 10, 20, 100, 80)

			expect(shape).toBeInstanceOf(Rectangle)
			expect(shape.color.toString()).toBe('#ff0000')
		})
	})

	describe('createTriangle', () => {
		it('create triangle', () => {
			const shape = factory.createTriangle('#00ff00', 0, 0, 50, 0, 25, 50)

			expect(shape).toBeInstanceOf(Triangle)
			expect(shape.color.toString()).toBe('#00ff00')
		})
	})

	describe('createEllipse', () => {
		it('create ellipse', () => {
			const shape = factory.createEllipse('#0000ff', 100, 100, 50, 30)

			expect(shape).toBeInstanceOf(Ellipse)
			expect(shape.color.toString()).toBe('#0000ff')
		})
	})

	describe('createPolygon', () => {
		it('create polygon', () => {
			const shape = factory.createPolygon('#ffff00', 200, 200, 50, 6)

			expect(shape).toBeInstanceOf(RegularPolygon)
			expect(shape.color.toString()).toBe('#ffff00')
		})
	})

	describe('createCircle', () => {
		it('create circle', () => {
			const shape = factory.createCircle('#ffc0cb', 100, 100, 50)

			expect(shape).toBeInstanceOf(Circle)
			expect(shape.color.toString()).toBe('#ffc0cb')
		})
	})

	describe('createLine', () => {
		it('create line', () => {
			const shape = factory.createLine('#000000', 0, 0, 100, 100)

			expect(shape).toBeInstanceOf(Line)
			expect(shape.color.toString()).toBe('#000000')
		})
	})

	describe('createText', () => {
		it('create text', () => {
			const shape = factory.createText('#ff0000', 50, 100, 16, 'Hello World')

			expect(shape).toBeInstanceOf(Text)
			expect(shape.color.toString()).toBe('#ff0000')
		})
	})
})
