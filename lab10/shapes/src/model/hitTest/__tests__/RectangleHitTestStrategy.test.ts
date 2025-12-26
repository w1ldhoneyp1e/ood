import {type Point, type Rect} from '../../types'
import {rectangleHitTestStrategy} from '../rectangle/RectangleHitTestStrategy'

describe('RectangleHitTestStrategy', () => {
	describe('isPointInside', () => {
		it('должен возвращать true для точки внутри прямоугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 50,
				y: 40,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать true для точки на левой границе', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 10,
				y: 40,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать true для точки на правой границе', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 110,
				y: 40,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать true для точки на верхней границе', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 50,
				y: 20,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать true для точки на нижней границе', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 50,
				y: 70,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать false для точки слева от прямоугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 5,
				y: 40,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки справа от прямоугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 120,
				y: 40,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки выше прямоугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 50,
				y: 10,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки ниже прямоугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 50,
				y: 80,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать true для точки в углу', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 10,
				y: 20,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен работать с прямоугольником в начале координат', () => {
			const frame: Rect = {
				x: 0,
				y: 0,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 50,
				y: 25,
			}

			const result = rectangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})
	})
})

