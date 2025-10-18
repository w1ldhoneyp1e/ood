import {type ICanvas} from '../canvas/ICanvas'
import {Color} from '../Color'
import {Circle} from '../shapes/Circle'
import {Ellipse} from '../shapes/Ellipse'
import {Line} from '../shapes/Line'
import {Rectangle} from '../shapes/Rectangle'
import {RegularPolygon} from '../shapes/RegularPolygon'
import {Text} from '../shapes/Text'
import {Triangle} from '../shapes/Triangle'

class MockCanvas implements ICanvas {
	operations: string[] = []

	setColor(color: Color): void {
		this.operations.push(`setColor(${color})`)
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

describe('Rectangle', () => {
	it('create rectangle', () => {
		const rect = new Rectangle({
			color: new Color('#ff0000'),
			left: 10,
			top: 20,
			right: 100,
			bottom: 80,
		})

		expect(rect.color.toString()).toBe('#ff0000')
	})

	it('invalid coordinates', () => {
		expect(() => new Rectangle({
			color: new Color('#ff0000'),
			left: 100,
			top: 20,
			right: 10,
			bottom: 80,
		})).toThrow('Right-bottom corner must be below and to the right')
	})

	it('draw rectangle', () => {
		const canvas = new MockCanvas()
		const rect = new Rectangle({
			color: new Color('#0000ff'),
			left: 0,
			top: 0,
			right: 50,
			bottom: 50,
		})

		rect.draw(canvas)

		expect(canvas.operations[0]).toBe(`setColor(${new Color('#0000ff')})`)
		expect(canvas.operations).toContain('moveTo(0, 0)')
		expect(canvas.operations).toContain('lineTo(50, 0)')
		expect(canvas.operations).toContain('lineTo(50, 50)')
		expect(canvas.operations).toContain('lineTo(0, 50)')
		expect(canvas.operations).toContain('lineTo(0, 0)')
	})
})

describe('Triangle', () => {
	it('create triangle', () => {
		const triangle = new Triangle({
			color: new Color('#00ff00'),
			x1: 0,
			y1: 0,
			x2: 50,
			y2: 0,
			x3: 25,
			y3: 50,
		})

		expect(triangle.color.toString()).toBe('#00ff00')
	})

	it('draw triangle', () => {
		const canvas = new MockCanvas()
		const triangle = new Triangle({
			color: new Color('#ffff00'),
			x1: 0,
			y1: 0,
			x2: 100,
			y2: 0,
			x3: 50,
			y3: 100,
		})

		triangle.draw(canvas)

		expect(canvas.operations[0]).toBe(`setColor(${new Color('#ffff00')})`)
		expect(canvas.operations).toContain('moveTo(0, 0)')
		expect(canvas.operations).toContain('lineTo(100, 0)')
		expect(canvas.operations).toContain('lineTo(50, 100)')
		expect(canvas.operations).toContain('lineTo(0, 0)')
	})
})

describe('Ellipse', () => {
	it('create ellipse', () => {
		const ellipse = new Ellipse({
			color: new Color('#ffc0cb'),
			cx: 100,
			cy: 100,
			rx: 50,
			ry: 30,
		})

		expect(ellipse.color.toString()).toBe('#ffc0cb')
	})

	it('negative radii', () => {
		expect(() => new Ellipse({
			color: new Color('#ff0000'),
			cx: 0,
			cy: 0,
			rx: -10,
			ry: 20,
		})).toThrow('Radii must be non-negative')

		expect(() => new Ellipse({
			color: new Color('#ff0000'),
			cx: 0,
			cy: 0,
			rx: 10,
			ry: -20,
		})).toThrow('Radii must be non-negative')
	})

	it('draw ellipse', () => {
		const canvas = new MockCanvas()
		const ellipse = new Ellipse({
			color: new Color('#0000ff'),
			cx: 50,
			cy: 50,
			rx: 30,
			ry: 20,
		})

		ellipse.draw(canvas)

		expect(canvas.operations[0]).toBe(`setColor(${new Color('#0000ff')})`)
		expect(canvas.operations[1]).toBe('drawEllipse(50, 50, 30, 20)')
	})

	it('circle when rx equals ry', () => {
		const circle = new Ellipse({
			color: new Color('#000000'),
			cx: 100,
			cy: 100,
			rx: 40,
			ry: 40,
		})

		expect(circle.color.toString()).toBe('#000000')
	})
})

describe('RegularPolygon', () => {
	it('create polygon', () => {
		const polygon = new RegularPolygon({
			color: new Color('#ff0000'),
			cx: 200,
			cy: 200,
			radius: 50,
			vertexCount: 6,
		})

		expect(polygon.color.toString()).toBe('#ff0000')
	})

	it('negative radius', () => {
		expect(() => new RegularPolygon({
			color: new Color('#ff0000'),
			cx: 0,
			cy: 0,
			radius: -10,
			vertexCount: 5,
		})).toThrow('Radius must be non-negative')
	})

	it('vertex count less than 3', () => {
		expect(() => new RegularPolygon({
			color: new Color('#ff0000'),
			cx: 0,
			cy: 0,
			radius: 10,
			vertexCount: 2,
		})).toThrow('Polygon must have at least 3 vertices')
	})

	it('draw polygon', () => {
		const canvas = new MockCanvas()
		const triangle = new RegularPolygon({
			color: new Color('#00ff00'),
			cx: 100,
			cy: 100,
			radius: 50,
			vertexCount: 3,
		})

		triangle.draw(canvas)

		expect(canvas.operations[0]).toBe(`setColor(${new Color('#00ff00')})`)
		expect(canvas.operations.filter(op => op.startsWith('moveTo')).length).toBe(1)
		expect(canvas.operations.filter(op => op.startsWith('lineTo')).length).toBe(3)
	})

	it('regular pentagon', () => {
		const pentagon = new RegularPolygon({
			color: new Color('#ffff00'),
			cx: 150,
			cy: 150,
			radius: 60,
			vertexCount: 5,
		})

		expect(pentagon.color.toString()).toBe('#ffff00')
	})

	it('regular hexagon', () => {
		const hexagon = new RegularPolygon({
			color: new Color('#0000ff'),
			cx: 200,
			cy: 200,
			radius: 70,
			vertexCount: 6,
		})

		expect(hexagon.color.toString()).toBe('#0000ff')
	})
})

describe('Circle', () => {
	it('create circle', () => {
		const circle = new Circle({
			color: new Color('#ff0000'),
			cx: 100,
			cy: 100,
			radius: 50,
		})

		expect(circle.color.toString()).toBe('#ff0000')
	})

	it('negative radius', () => {
		expect(() => new Circle({
			color: new Color('#ff0000'),
			cx: 0,
			cy: 0,
			radius: -10,
		})).toThrow('Radius must be non-negative')
	})

	it('draw circle', () => {
		const canvas = new MockCanvas()
		const circle = new Circle({
			color: new Color('#0000ff'),
			cx: 50,
			cy: 50,
			radius: 30,
		})

		circle.draw(canvas)

		expect(canvas.operations[0]).toBe(`setColor(${new Color('#0000ff')})`)
		expect(canvas.operations[1]).toBe('drawEllipse(50, 50, 30, 30)')
	})
})

describe('Line', () => {
	it('create line', () => {
		const line = new Line({
			color: new Color('#00ff00'),
			x1: 0,
			y1: 0,
			x2: 100,
			y2: 100,
		})

		expect(line.color.toString()).toBe('#00ff00')
	})

	it('draw line', () => {
		const canvas = new MockCanvas()
		const line = new Line({
			color: new Color('#ffff00'),
			x1: 10,
			y1: 20,
			x2: 30,
			y2: 40,
		})

		line.draw(canvas)

		expect(canvas.operations[0]).toBe(`setColor(${new Color('#ffff00')})`)
		expect(canvas.operations[1]).toBe('moveTo(10, 20)')
		expect(canvas.operations[2]).toBe('lineTo(30, 40)')
	})
})

describe('Text', () => {
	it('create text', () => {
		const text = new Text({
			color: new Color('#ffc0cb'),
			left: 50,
			top: 100,
			fontSize: 16,
			text: 'Hello World',
		})

		expect(text.color.toString()).toBe('#ffc0cb')
	})

	it('negative font size', () => {
		expect(() => new Text({
			color: new Color('#ff0000'),
			left: 0,
			top: 0,
			fontSize: -10,
			text: 'test',
		})).toThrow('Font size must be non-negative')
	})

	it('draw text', () => {
		const canvas = new MockCanvas()
		const text = new Text({
			color: new Color('#000000'),
			left: 25,
			top: 75,
			fontSize: 20,
			text: 'Test Text',
		})

		text.draw(canvas)

		expect(canvas.operations[0]).toBe(`setColor(${new Color('#000000')})`)
		expect(canvas.operations[1]).toBe('drawText(25, 75, 20, "Test Text")')
	})
})
