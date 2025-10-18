import {Designer} from '../designer/Designer'
import {Ellipse} from '../shapes/Ellipse'
import {Rectangle} from '../shapes/Rectangle'
import {ShapeFactory} from '../shapes/ShapeFactory'
import {Triangle} from '../shapes/Triangle'

describe('Designer', () => {
	let designer: Designer

	beforeEach(() => {
		const factory = new ShapeFactory()
		designer = new Designer(factory)
	})

	describe('createDraft', () => {
		it('create draft from array of shape descriptions', () => {
			const input = [
				'rectangle #ff0000 10 20 100 80',
				'triangle #00ff00 0 0 50 0 25 50',
				'ellipse #0000ff 100 100 50 30',
			]

			const draft = designer.createDraft(input)

			expect(draft.getShapeCount()).toBe(3)
			expect(draft.getShape(0)).toBeInstanceOf(Rectangle)
			expect(draft.getShape(1)).toBeInstanceOf(Triangle)
			expect(draft.getShape(2)).toBeInstanceOf(Ellipse)
		})

		it('skip empty lines', () => {
			const input = [
				'rectangle #ff0000 10 20 100 80',
				'',
				'  ',
				'triangle #00ff00 0 0 50 0 25 50',
			]

			const draft = designer.createDraft(input)

			expect(draft.getShapeCount()).toBe(2)
		})

		it('create empty draft for empty input', () => {
			const draft = designer.createDraft([])

			expect(draft.getShapeCount()).toBe(0)
			expect(draft.isEmpty()).toBe(true)
		})

		it('skip invalid lines and continue processing', () => {
			const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

			const input = [
				'rectangle #ff0000 10 20 100 80',
				'invalid shape description',
				'triangle #00ff00 0 0 50 0 25 50',
			]

			const draft = designer.createDraft(input)

			expect(draft.getShapeCount()).toBe(2)
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				expect.stringContaining('Skipping invalid shape description'),
			)

			consoleErrorSpy.mockRestore()
		})

		it('process only valid lines when errors are present', () => {
			const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

			const input = [
				'rectangle #ff0000 10 20 100 80',
				'rectangle wrongcolor 0 0 10 10',
				'triangle #00ff00 0 0 50 0 25 50',
				'ellipse #0000ff 100',
			]

			const draft = designer.createDraft(input)

			expect(draft.getShapeCount()).toBe(2)
			expect(draft.getShape(0)).toBeInstanceOf(Rectangle)
			expect(draft.getShape(1)).toBeInstanceOf(Triangle)

			consoleErrorSpy.mockRestore()
		})

		it('preserve shape order', () => {
			const input = [
				'ellipse #0000ff 100 100 50 30',
				'rectangle #ff0000 10 20 100 80',
				'triangle #00ff00 0 0 50 0 25 50',
			]

			const draft = designer.createDraft(input)

			expect(draft.getShape(0)).toBeInstanceOf(Ellipse)
			expect(draft.getShape(1)).toBeInstanceOf(Rectangle)
			expect(draft.getShape(2)).toBeInstanceOf(Triangle)
		})
	})
})

