import {Writable} from 'stream'
import {ModernGraphicsRendererClassAdapter} from '../adapter/ClassAdapter'
import {CanvasPainter} from '../shapeDrawingLib/CanvasPainter'
import {Rectangle} from '../shapeDrawingLib/Rectangle'
import {Triangle} from '../shapeDrawingLib/Triangle'

describe('Class Adapter', () => {
	let output: string[]
	let stream: Writable
	let adapter: ModernGraphicsRendererClassAdapter

	beforeEach(() => {
		output = []
		stream = new Writable({
			write(chunk, encoding, callback) {
				output.push(chunk.toString())
				callback()
			},
		})
		adapter = new ModernGraphicsRendererClassAdapter(stream)
	})

	afterEach(() => {
		if (adapter.isDrawing()) {
			adapter.endDraw()
		}
	})

	test('should adapt moveTo and lineTo to modern graphics renderer', () => {
		adapter.moveTo(10, 20)
		adapter.lineTo(30, 40)

		const outputStr = output.join('')
		expect(outputStr).toContain('<draw>')
		expect(outputStr).toContain('fromX="10" fromY="20"')
		expect(outputStr).toContain('toX="30" toY="40"')
	})

	test('should convert RGB color to RGBA', () => {
		adapter.setColor(0xFF0000)
		adapter.moveTo(0, 0)
		adapter.lineTo(10, 10)

		const outputStr = output.join('')
		expect(outputStr).toContain('r="1" g="0" b="0"')
	})

	test('should work with CanvasPainter and shapes', () => {
		const painter = new CanvasPainter(adapter)
		const triangle = new Triangle(
			{
				x: 10,
				y: 15,
			},
			{
				x: 100,
				y: 200,
			},
			{
				x: 150,
				y: 250,
			},
		)
		const rectangle = new Rectangle({
			x: 30,
			y: 40,
		}, 18, 24)

		painter.draw(rectangle)
		painter.draw(triangle)
		adapter.endDraw()

		const outputStr = output.join('')
		expect(outputStr).toContain('<draw>')
		expect(outputStr).toContain('</draw>')
		expect(outputStr.match(/<line/g)).toHaveLength(7)
	})

	test('should handle lineTo without moveTo (starts at 0,0)', () => {
		adapter.lineTo(10, 20)

		const outputStr = output.join('')
		expect(outputStr).toContain('fromX="0" fromY="0"')
		expect(outputStr).toContain('toX="10" toY="20"')
	})

	test('should handle colored shapes', () => {
		const painter = new CanvasPainter(adapter)
		const coloredTriangle = new Triangle(
			{
				x: 0,
				y: 0,
			},
			{
				x: 10,
				y: 0,
			},
			{
				x: 5,
				y: 10,
			},
			0x0000FF,
		)

		painter.draw(coloredTriangle)

		const outputStr = output.join('')
		expect(outputStr).toContain('r="0" g="0" b="1"')
	})
})
