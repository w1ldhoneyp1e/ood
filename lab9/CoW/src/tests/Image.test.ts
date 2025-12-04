import {Image} from '../Image'
import {Tile} from '../Tile'

describe('Image', () => {
	beforeEach(() => {
		Tile.resetInstanceCount()
	})

	it('fills with one tile on creation', () => {
		const image = new Image(8, 8, '.')
		expect(image.getPixel(0, 0)).toBe('.')
		expect(Tile.getInstanceCount()).toBe(1)
	})

	it('no new tiles are created when modifying the same tile', () => {
		const image = new Image(8, 8, '.')
		expect(Tile.getInstanceCount()).toBe(1)
		image.setPixel(0, 0, 'X')
		expect(Tile.getInstanceCount()).toBe(2)
		expect(image.getPixel(0, 0)).toBe('X')
		expect(image.getPixel(1, 1)).toBe('.')
		image.setPixel(5, 5, 'X')
		expect(Tile.getInstanceCount()).toBe(2)
		expect(image.getPixel(5, 5)).toBe('X')
		expect(image.getPixel(1, 1)).toBe('.')
	})

	it('new tiles are created when modifying different tiles', () => {
		const image = new Image(9, 8, '.')
		expect(Tile.getInstanceCount()).toBe(1)
		image.setPixel(0, 0, 'A')
		expect(Tile.getInstanceCount()).toBe(2)
		image.setPixel(8, 0, 'B')
		expect(Tile.getInstanceCount()).toBe(3)
		expect(image.getPixel(0, 0)).toBe('A')
		expect(image.getPixel(8, 0)).toBe('B')
		expect(image.getPixel(4, 4)).toBe('.')
	})
})

