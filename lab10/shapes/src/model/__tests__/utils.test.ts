import {
	clamp,
	colorByIndex,
	normalizeSize,
	shapePalette,
} from '../utils'

describe('utils', () => {
	describe('clamp', () => {
		it('должен возвращать значение если оно в пределах min и max', () => {
			expect(clamp(50, 0, 100)).toBe(50)
			expect(clamp(25, 10, 30)).toBe(25)
		})

		it('должен возвращать min если значение меньше min', () => {
			expect(clamp(-10, 0, 100)).toBe(0)
			expect(clamp(5, 10, 30)).toBe(10)
		})

		it('должен возвращать max если значение больше max', () => {
			expect(clamp(150, 0, 100)).toBe(100)
			expect(clamp(50, 10, 30)).toBe(30)
		})

		it('должен возвращать min если значение равно min', () => {
			expect(clamp(0, 0, 100)).toBe(0)
		})

		it('должен возвращать max если значение равно max', () => {
			expect(clamp(100, 0, 100)).toBe(100)
		})

		it('должен работать с отрицательными числами', () => {
			expect(clamp(-50, -100, -10)).toBe(-50)
			expect(clamp(-150, -100, -10)).toBe(-100)
			expect(clamp(-5, -100, -10)).toBe(-10)
		})
	})

	describe('normalizeSize', () => {
		it('должен возвращать значение если оно больше или равно min', () => {
			expect(normalizeSize(100, 10)).toBe(100)
			expect(normalizeSize(50, 10)).toBe(50)
			expect(normalizeSize(10, 10)).toBe(10)
		})

		it('должен возвращать min если значение меньше min', () => {
			expect(normalizeSize(5, 10)).toBe(10)
			expect(normalizeSize(0, 10)).toBe(10)
			expect(normalizeSize(-10, 10)).toBe(10)
		})

		it('должен работать с разными минимальными значениями', () => {
			expect(normalizeSize(5, 20)).toBe(20)
			expect(normalizeSize(25, 20)).toBe(25)
			expect(normalizeSize(100, 50)).toBe(100)
		})
	})

	describe('colorByIndex', () => {
		it('должен возвращать цвет из палитры по индексу', () => {
			expect(colorByIndex(0)).toBe(shapePalette[0])
			expect(colorByIndex(1)).toBe(shapePalette[1])
			expect(colorByIndex(2)).toBe(shapePalette[2])
		})

		it('должен циклически возвращать цвета при индексе больше размера палитры', () => {
			const paletteLength = shapePalette.length
			expect(colorByIndex(paletteLength)).toBe(shapePalette[0])
			expect(colorByIndex(paletteLength + 1)).toBe(shapePalette[1])
			expect(colorByIndex(paletteLength * 2)).toBe(shapePalette[0])
		})

		it('должен возвращать правильный цвет для больших индексов', () => {
			const paletteLength = shapePalette.length
			for (let i = 0; i < paletteLength * 3; i++) {
				const expectedColor = shapePalette[i % paletteLength]
				expect(colorByIndex(i)).toBe(expectedColor)
			}
		})
	})
})

