import {Color} from '../Color'
import {PictureDraft} from '../designer/PictureDraft'
import {Rectangle} from '../shapes/Rectangle'
import {Triangle} from '../shapes/Triangle'

describe('PictureDraft', () => {
	let draft: PictureDraft

	beforeEach(() => {
		draft = new PictureDraft()
	})

	describe('addShape', () => {
		it('should add shape to draft', () => {
			const rect = new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			})

			draft.addShape(rect)

			expect(draft.getShapeCount()).toBe(1)
		})

		it('should add multiple shapes', () => {
			const rect = new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			})
			const triangle = new Triangle({
				color: new Color('#00ff00'),
				x1: 0,
				y1: 0,
				x2: 10,
				y2: 0,
				x3: 5,
				y3: 10,
			})

			draft.addShape(rect)
			draft.addShape(triangle)

			expect(draft.getShapeCount()).toBe(2)
		})
	})

	describe('getShapeCount', () => {
		it('should return 0 for empty draft', () => {
			expect(draft.getShapeCount()).toBe(0)
		})

		it('should return correct shape count', () => {
			draft.addShape(new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			}))
			draft.addShape(new Triangle({
				color: new Color('#00ff00'),
				x1: 0,
				y1: 0,
				x2: 10,
				y2: 0,
				x3: 5,
				y3: 10,
			}))

			expect(draft.getShapeCount()).toBe(2)
		})
	})

	describe('getShape', () => {
		it('should return shape by index', () => {
			const rect = new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			})
			const triangle = new Triangle({
				color: new Color('#00ff00'),
				x1: 0,
				y1: 0,
				x2: 10,
				y2: 0,
				x3: 5,
				y3: 10,
			})

			draft.addShape(rect)
			draft.addShape(triangle)

			expect(draft.getShape(0)).toBe(rect)
			expect(draft.getShape(1)).toBe(triangle)
		})

		it('should throw error for negative index', () => {
			draft.addShape(new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			}))

			expect(() => draft.getShape(-1)).toThrow('Shape index out of bounds')
		})

		it('should throw error for index >= shape count', () => {
			draft.addShape(new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			}))

			expect(() => draft.getShape(1)).toThrow('Shape index out of bounds')
			expect(() => draft.getShape(100)).toThrow('Shape index out of bounds')
		})
	})

	describe('isEmpty', () => {
		it('should return true for empty draft', () => {
			expect(draft.isEmpty()).toBe(true)
		})

		it('should return false for non-empty draft', () => {
			draft.addShape(new Rectangle({
				color: new Color('#ff0000'),
				left: 0,
				top: 0,
				right: 10,
				bottom: 10,
			}))

			expect(draft.isEmpty()).toBe(false)
		})
	})

	describe('порядок фигур', () => {
		it('должен сохранять порядок добавления фигур', () => {
			const shapes = [
				new Rectangle({
					color: new Color('#ff0000'),
					left: 0,
					top: 0,
					right: 10,
					bottom: 10,
				}),
				new Triangle({
					color: new Color('#00ff00'),
					x1: 0,
					y1: 0,
					x2: 10,
					y2: 0,
					x3: 5,
					y3: 10,
				}),
				new Rectangle({
					color: new Color('#0000ff'),
					left: 20,
					top: 20,
					right: 30,
					bottom: 30,
				}),
			]

			shapes.forEach(shape => draft.addShape(shape))

			for (let i = 0; i < shapes.length; i++) {
				expect(draft.getShape(i)).toBe(shapes[i])
			}
		})
	})
})
