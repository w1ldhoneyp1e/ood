import {Picture} from '../canvas/Picture'
import {Color} from '../Color'
import {Circle} from '../shapes/Circle'
import {Rectangle} from '../shapes/Rectangle'

class MockCanvas {
	operations: string[] = []

	setColor(color: Color): void {
		this.operations.push(`setColor(${color.toString()})`)
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

describe('Picture', () => {
	let picture: Picture
	let red: Color
	let blue: Color

	beforeEach(() => {
		picture = new Picture()
		red = new Color('#ff0000')
		blue = new Color('#0000ff')
	})

	describe('addShape', () => {
		test('add shape', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			picture.addShape(circle)

			expect(picture.getShape('c1')).toBe(circle)
		})

		test('adding shape with existing id', () => {
			const circle1 = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			const circle2 = new Circle({
				id: 'c1',
				color: blue,
				x: 200,
				y: 200,
				radius: 30,
			})

			picture.addShape(circle1)

			expect(() => picture.addShape(circle2)).toThrow('Shape with id \'c1\' already exists')
		})
	})

	describe('getShape', () => {
		test('return shape by id', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			picture.addShape(circle)

			expect(picture.getShape('c1')).toBe(circle)
		})

		test('return undefined for non-existent shape', () => {
			expect(picture.getShape('nonexistent')).toBeUndefined()
		})
	})

	describe('deleteShape', () => {
		test('delete shape successfully', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			picture.addShape(circle)
			picture.deleteShape('c1')

			expect(picture.getShape('c1')).toBeUndefined()
		})

		test('deleting non-existent shape', () => {
			expect(() => picture.deleteShape('nonexistent')).toThrow('Shape with id \'nonexistent\' not found')
		})

		test('maintain order after deletion', () => {
			const circle1 = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			const circle2 = new Circle({
				id: 'c2',
				color: blue,
				x: 200,
				y: 200,
				radius: 30,
			})

			const circle3 = new Circle({
				id: 'c3',
				color: red,
				x: 300,
				y: 300,
				radius: 40,
			})

			picture.addShape(circle1)
			picture.addShape(circle2)
			picture.addShape(circle3)

			picture.deleteShape('c2')

			const shapes = picture.listShapes()
			expect(shapes).toHaveLength(2)
			expect(shapes[0]).toContain('c1')
			expect(shapes[1]).toContain('c3')
		})
	})

	describe('movePicture', () => {
		test('move all shapes', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			const rect = new Rectangle({
				id: 'r1',
				color: blue,
				left: 200,
				top: 200,
				width: 100,
				height: 80,
			})

			picture.addShape(circle)
			picture.addShape(rect)

			picture.movePicture(10, 20)

			expect(circle.x).toBe(110)
			expect(circle.y).toBe(120)
			expect(rect.left).toBe(210)
			expect(rect.top).toBe(220)
		})
	})

	describe('draw', () => {
		test('draw all shapes', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			const rect = new Rectangle({
				id: 'r1',
				color: blue,
				left: 200,
				top: 200,
				width: 100,
				height: 80,
			})

			picture.addShape(circle)
			picture.addShape(rect)

			const canvas = new MockCanvas()
			picture.draw(canvas)

			expect(canvas.operations).toContain('setColor(#ff0000)')
			expect(canvas.operations).toContain('drawEllipse(100, 100, 50, 50)')
			expect(canvas.operations).toContain('setColor(#0000ff)')
			expect(canvas.operations).toContain('moveTo(200, 200)')
		})
	})

	describe('listShapes', () => {
		test('return empty list for empty picture', () => {
			expect(picture.listShapes()).toEqual([])
		})

		test('should return shapes in order', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			const rect = new Rectangle({
				id: 'r1',
				color: blue,
				left: 200,
				top: 200,
				width: 100,
				height: 80,
			})

			picture.addShape(circle)
			picture.addShape(rect)

			const shapes = picture.listShapes()

			expect(shapes).toHaveLength(2)
			expect(shapes[0]).toContain('1 circle c1 #ff0000 circle 100 100 50')
			expect(shapes[1]).toContain('2 rectangle r1 #0000ff rectangle 200 200 100 80')
		})
	})

	describe('changeColor', () => {
		test('change color', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			picture.addShape(circle)
			picture.changeColor('c1', '#00ff00')

			expect(circle.color.toString()).toBe('#00ff00')
		})

		test('non-existent shape', () => {
			expect(() => picture.changeColor('nonexistent', '#00ff00')).toThrow('Shape with id \'nonexistent\' not found')
		})
	})

	describe('changeShape', () => {
		test('change shape type and parameters', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			picture.addShape(circle)
			picture.changeShape('c1', 'rectangle', [200, 200, 100, 80])

			const newShape = picture.getShape('c1')
			expect(newShape).not.toBe(circle)
			expect(newShape?.constructor.name).toBe('Rectangle')
			expect(newShape?.color).toBe(red)
		})

		test('non-existent shape', () => {
			expect(() => picture.changeShape('nonexistent', 'circle', [100, 100, 50])).toThrow('Shape with id \'nonexistent\' not found')
		})
	})

	describe('cloneShape', () => {
		test('clone existing shape', () => {
			const circle = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			picture.addShape(circle)
			picture.cloneShape('c1', 'c2')

			const clone = picture.getShape('c2')
			expect(clone).not.toBe(circle)
			expect(clone?.id).toBe('c2')
			expect(clone?.color).toBe(red)
			expect((clone as Circle).x).toBe(100)
			expect((clone as Circle).y).toBe(100)
			expect((clone as Circle).radius).toBe(50)
		})

		test('non-existent original shape', () => {
			expect(() => picture.cloneShape('nonexistent', 'c2')).toThrow('Shape with id \'nonexistent\' not found')
		})

		test('new id already exists', () => {
			const circle1 = new Circle({
				id: 'c1',
				color: red,
				x: 100,
				y: 100,
				radius: 50,
			})

			const circle2 = new Circle({
				id: 'c2',
				color: blue,
				x: 200,
				y: 200,
				radius: 30,
			})

			picture.addShape(circle1)
			picture.addShape(circle2)

			expect(() => picture.cloneShape('c1', 'c2')).toThrow('Shape with id \'c2\' already exists')
		})
	})
})
