import {type ICanvas} from '../canvas/ICanvas'
import {Color} from '../Color'
import {PictureDraft} from '../designer/PictureDraft'
import {Painter} from '../painter/Painter'
import {Ellipse} from '../shapes/Ellipse'
import {Rectangle} from '../shapes/Rectangle'

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

	clear(): void {
		this.operations = []
	}
}

describe('Painter', () => {
	let painter: Painter
	let canvas: MockCanvas

	beforeEach(() => {
		painter = new Painter()
		canvas = new MockCanvas()
	})

	describe('drawPicture', () => {
		it('draw all shapes from draft', () => {
			const draft = new PictureDraft()
			draft.addShape(new Rectangle({
				color: new Color('#ff0000'),
				left: 10,
				top: 20,
				right: 100,
				bottom: 80,
			}))
			draft.addShape(new Ellipse({
				color: new Color('#0000ff'),
				cx: 50,
				cy: 50,
				rx: 30,
				ry: 20,
			}))

			painter.drawPicture(draft, canvas)

			expect(canvas.operations.length).toBeGreaterThan(0)
			expect(canvas.operations[0]).toContain('setColor')
		})

		it('draw shapes in correct order', () => {
			const draft = new PictureDraft()
			const rect = new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			})
			const ellipse = new Ellipse({
				color: new Color('#0000ff'),
				cx: 50,
				cy: 50,
				rx: 30,
				ry: 20,
			})

			draft.addShape(rect)
			draft.addShape(ellipse)

			painter.drawPicture(draft, canvas)

			expect(canvas.operations[0]).toBe(`setColor(${new Color('#ff0000')})`)
			const ellipseColorIndex = canvas.operations.lastIndexOf(`setColor(${new Color('#0000ff')})`)
			expect(ellipseColorIndex).toBeGreaterThan(0)
		})

		it('not perform any operations for empty draft', () => {
			const draft = new PictureDraft()

			painter.drawPicture(draft, canvas)

			expect(canvas.operations.length).toBe(0)
		})

		it('call draw for each shape', () => {
			const draft = new PictureDraft()
			const shapes = [
				new Rectangle({
					color: new Color('#ff0000'),
					left: 0,
					top: 0,
					right: 10,
					bottom: 10,
				}),
				new Rectangle({
					color: new Color('#00ff00'),
					left: 20,
					top: 20,
					right: 30,
					bottom: 30,
				}),
				new Ellipse({
					color: new Color('#0000ff'),
					cx: 50,
					cy: 50,
					rx: 20,
					ry: 15,
				}),
			]

			shapes.forEach(shape => draft.addShape(shape))

			painter.drawPicture(draft, canvas)

			const colorOperations = canvas.operations.filter(op => op.startsWith('setColor'))
			expect(colorOperations.length).toBe(shapes.length)
		})

		it('correctly handle draft with one shape', () => {
			const draft = new PictureDraft()
			draft.addShape(new Rectangle({
				color: new Color('#ffc0cb'),
				left: 5,
				top: 5,
				right: 15,
				bottom: 15,
			}))

			painter.drawPicture(draft, canvas)

			expect(canvas.operations[0]).toBe(`setColor(${new Color('#ffc0cb')})`)
			expect(canvas.operations.length).toBeGreaterThan(1)
		})
	})
})
