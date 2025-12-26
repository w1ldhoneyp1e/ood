import {type Point, type Rect} from '../../types'
import {ellipseHitTestStrategy} from '../ellipse/EllipseHitTestStrategy'

describe('EllipseHitTestStrategy', () => {
	describe('isPointInside', () => {
		it('должен возвращать true для точки в центре эллипса', () => {
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

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать true для точки внутри эллипса', () => {
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

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать true для точки на границе эллипса', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const point: Point = {
				x: 60,
				y: 20,
			}

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен возвращать false для точки вне эллипса', () => {
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

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки в углу ограничивающего прямоугольника', () => {
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

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки справа от эллипса', () => {
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

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен возвращать false для точки выше эллипса', () => {
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

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(false)
		})

		it('должен работать с кругом', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 100,
			}
			const point: Point = {
				x: 60,
				y: 70,
			}

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен работать с эллипсом в начале координат', () => {
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

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})

		it('должен корректно обрабатывать вытянутый эллипс', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 200,
				height: 50,
			}
			const point: Point = {
				x: 110,
				y: 45,
			}

			const result = ellipseHitTestStrategy.isPointInside(frame, point)

			expect(result).toBe(true)
		})
	})
})

