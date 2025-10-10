import {Color} from '../Color'
import {Circle} from '../shapes/Circle'
import {Line} from '../shapes/Line'
import {Rectangle} from '../shapes/Rectangle'
import {Text} from '../shapes/Text'
import {Triangle} from '../shapes/Triangle'

class MockCanvas {
	operations: string[] = []
	color = ''

	setColor(color: Color): void {
		this.color = color.toString()
		this.operations.push(`setColor(${this.color})`)
	}

	moveTo(x: number, y: number): void {
		this.operations.push(`moveTo(${x}, ${y})`)
	}

	lineTo(x: number, y: number): void {
		this.operations.push(`lineTo(${x}, ${y})`)
	}

	drawEllipse(cx: number, cy: number, rx: number, ry: number): void {
		this.operations.push(`drawEllipse(${cx}, ${cy}, ${rx}, ${ry})`)
	}

	drawText(left: number, top: number, fontSize: number, text: string): void {
		this.operations.push(`drawText(${left}, ${top}, ${fontSize}, "${text}")`)
	}
}

describe('Shape', () => {
	const red = new Color('#ff0000')
	const blue = new Color('#0000ff')

	describe('Circle', () => {
		test('create valid circle', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 200,
				radius: 50,
			})

			expect(circle.id).toBe('c1')
			expect(circle.color).toBe(red)
			expect(circle.x).toBe(100)
			expect(circle.y).toBe(200)
			expect(circle.radius).toBe(50)
		})

		test('negative radius', () => {
			expect(() => new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 200,
				radius: -10,
			})).toThrow('Radius must be non-negative')
		})

		test('draw circle', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 200,
				radius: 50,
			})

			const canvas = new MockCanvas()
			circle.draw(canvas)

			expect(canvas.operations).toEqual([
				'setColor(#ff0000)',
				'drawEllipse(100, 200, 50, 50)',
			])
		})

		test('move circle', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 200,
				radius: 50,
			})

			circle.move(30, 40)

			expect(circle.x).toBe(130)
			expect(circle.y).toBe(240)
		})

		test('get correct description', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 200,
				radius: 50,
			})

			expect(circle.getDescription()).toBe('circle 100 200 50')
		})

		test('clone circle', () => {
			const original = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 200,
				radius: 50,
			})

			const clone = original.clone('c2')

			expect(clone.id).toBe('c2')
			expect(clone.color).toBe(red)
			expect(clone.x).toBe(100)
			expect(clone.y).toBe(200)
			expect(clone.radius).toBe(50)
			expect(clone).not.toBe(original)
		})
	})

	describe('Rectangle', () => {
		test('create valid rectangle', () => {
			const rect = new Rectangle({
				id: 'r1',
				color: blue,
				left: 10,
				top: 20,
				width: 100,
				height: 80,
			})

			expect(rect.id).toBe('r1')
			expect(rect.color).toBe(blue)
			expect(rect.left).toBe(10)
			expect(rect.top).toBe(20)
			expect(rect.width).toBe(100)
			expect(rect.height).toBe(80)
		})

		test('negative dimensions', () => {
			expect(() => new Rectangle({
				id: 'r1',
				color: blue,
				left: 10,
				top: 20,
				width: -100,
				height: 80,
			})).toThrow('Width and height must be non-negative')

			expect(() => new Rectangle({
				id: 'r1',
				color: blue,
				left: 10,
				top: 20,
				width: 100,
				height: -80,
			})).toThrow('Width and height must be non-negative')
		})

		test('draw rectangle', () => {
			const rect = new Rectangle({
				id: 'r1',
				color: blue,
				left: 10,
				top: 20,
				width: 100,
				height: 80,
			})

			const canvas = new MockCanvas()
			rect.draw(canvas)

			expect(canvas.operations).toEqual([
				'setColor(#0000ff)',
				'moveTo(10, 20)',
				'lineTo(110, 20)',
				'lineTo(110, 100)',
				'lineTo(10, 100)',
				'lineTo(10, 20)',
			])
		})

		test('move rectangle', () => {
			const rect = new Rectangle({
				id: 'r1',
				color: blue,
				left: 10,
				top: 20,
				width: 100,
				height: 80,
			})

			rect.move(5, 15)

			expect(rect.left).toBe(15)
			expect(rect.top).toBe(35)
		})

		test('clone rectangle', () => {
			const original = new Rectangle({
				id: 'r1',
				color: blue,
				left: 10,
				top: 20,
				width: 100,
				height: 80,
			})

			const clone = original.clone('r2')

			expect(clone.id).toBe('r2')
			expect(clone.color).toBe(blue)
			expect(clone.left).toBe(10)
			expect(clone.top).toBe(20)
			expect(clone.width).toBe(100)
			expect(clone.height).toBe(80)
			expect(clone).not.toBe(original)
		})
	})

	describe('Triangle', () => {
		test('create valid triangle', () => {
			const triangle = new Triangle({
				id: 't1',
				color: red,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 0,
				x3: 50,
				y3: 100,
			})

			expect(triangle.id).toBe('t1')
			expect(triangle.x1).toBe(0)
			expect(triangle.y1).toBe(0)
			expect(triangle.x2).toBe(100)
			expect(triangle.y2).toBe(0)
			expect(triangle.x3).toBe(50)
			expect(triangle.y3).toBe(100)
		})

		test('draw triangle', () => {
			const triangle = new Triangle({
				id: 't1',
				color: red,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 0,
				x3: 50,
				y3: 100,
			})

			const canvas = new MockCanvas()
			triangle.draw(canvas)

			expect(canvas.operations).toEqual([
				'setColor(#ff0000)',
				'moveTo(0, 0)',
				'lineTo(100, 0)',
				'lineTo(50, 100)',
				'lineTo(0, 0)',
			])
		})

		test('move triangle', () => {
			const triangle = new Triangle({
				id: 't1',
				color: red,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 0,
				x3: 50,
				y3: 100,
			})

			triangle.move(10, 20)

			expect(triangle.x1).toBe(10)
			expect(triangle.y1).toBe(20)
			expect(triangle.x2).toBe(110)
			expect(triangle.y2).toBe(20)
			expect(triangle.x3).toBe(60)
			expect(triangle.y3).toBe(120)
		})

		test('clone triangle', () => {
			const original = new Triangle({
				id: 't1',
				color: red,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 0,
				x3: 50,
				y3: 100,
			})

			const clone = original.clone('t2')

			expect(clone.id).toBe('t2')
			expect(clone.x1).toBe(0)
			expect(clone.y1).toBe(0)
			expect(clone.x2).toBe(100)
			expect(clone.y2).toBe(0)
			expect(clone.x3).toBe(50)
			expect(clone.y3).toBe(100)
			expect(clone).not.toBe(original)
		})
	})

	describe('Line', () => {
		test('create valid line', () => {
			const line = new Line({
				id: 'l1',
				color: blue,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100,
			})

			expect(line.id).toBe('l1')
			expect(line.x1).toBe(0)
			expect(line.y1).toBe(0)
			expect(line.x2).toBe(100)
			expect(line.y2).toBe(100)
		})

		test('draw line', () => {
			const line = new Line({
				id: 'l1',
				color: blue,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100,
			})

			const canvas = new MockCanvas()
			line.draw(canvas)

			expect(canvas.operations).toEqual([
				'setColor(#0000ff)',
				'moveTo(0, 0)',
				'lineTo(100, 100)',
			])
		})

		test('move line', () => {
			const line = new Line({
				id: 'l1',
				color: blue,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100,
			})

			line.move(10, 20)

			expect(line.x1).toBe(10)
			expect(line.y1).toBe(20)
			expect(line.x2).toBe(110)
			expect(line.y2).toBe(120)
		})

		test('clone line', () => {
			const original = new Line({
				id: 'l1',
				color: blue,
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100,
			})

			const clone = original.clone('l2')

			expect(clone.id).toBe('l2')
			expect(clone.x1).toBe(0)
			expect(clone.y1).toBe(0)
			expect(clone.x2).toBe(100)
			expect(clone.y2).toBe(100)
			expect(clone).not.toBe(original)
		})
	})

	describe('Text', () => {
		test('create valid text', () => {
			const text = new Text({
				id: 'txt1',
				color: red,
				left: 100,
				top: 200,
				fontSize: 16,
				text: 'Hello World',
			})

			expect(text.id).toBe('txt1')
			expect(text.left).toBe(100)
			expect(text.top).toBe(200)
			expect(text.fontSize).toBe(16)
			expect(text.text).toBe('Hello World')
		})

		test('negative font size', () => {
			expect(() => new Text({
				id: 'txt1',
				color: red,
				left: 100,
				top: 200,
				fontSize: -16,
				text: 'Hello',
			})).toThrow('Font size must be non-negative')
		})

		test('draw text', () => {
			const text = new Text({
				id: 'txt1',
				color: red,
				left: 100,
				top: 200,
				fontSize: 16,
				text: 'Hello World',
			})

			const canvas = new MockCanvas()
			text.draw(canvas)

			expect(canvas.operations).toEqual([
				'setColor(#ff0000)',
				'drawText(100, 200, 16, "Hello World")',
			])
		})

		test('move text', () => {
			const text = new Text({
				id: 'txt1',
				color: red,
				left: 100,
				top: 200,
				fontSize: 16,
				text: 'Hello World',
			})

			text.move(10, 20)

			expect(text.left).toBe(110)
			expect(text.top).toBe(220)
		})

		test('clone text', () => {
			const original = new Text({
				id: 'txt1',
				color: red,
				left: 100,
				top: 200,
				fontSize: 16,
				text: 'Hello World',
			})

			const clone = original.clone('txt2')

			expect(clone.id).toBe('txt2')
			expect(clone.left).toBe(100)
			expect(clone.top).toBe(200)
			expect(clone.fontSize).toBe(16)
			expect(clone.text).toBe('Hello World')
			expect(clone).not.toBe(original)
		})
	})
})
