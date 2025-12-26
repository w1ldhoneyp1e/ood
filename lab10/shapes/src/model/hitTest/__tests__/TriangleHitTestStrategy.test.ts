import {type Point, type Rect} from '../../types'
import {triangleHitTestStrategy} from '../triangle/TriangleHitTestStrategy'

describe('TriangleHitTestStrategy', () => {
	describe('isPointInside', () => {
		it('должен возвращать true для точки внутри треугольника', () => {
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

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать true для точки в центре треугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 60,
				y: 45,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать false для точки вне треугольника', () => {
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

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки справа от треугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 120,
				y: 45,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки выше треугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 60,
				y: 10,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки ниже треугольника', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 60,
				y: 80,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен работать с треугольником в начале координат', () => {
			const frame: Rect = {
				x: 0,
				y: 0,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 50,
				y: 30,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен корректно обрабатывать точку близко к границе', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 60,
				y: 21,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен корректно обрабатывать точку в левом нижнем углу', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 10,
				y: 70,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен корректно обрабатывать точку в правом нижнем углу', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 110,
				y: 70,
			}

			const result = triangleHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})
	})
})

