import {Tile} from '../Tile'

describe('Tile', () => {
	beforeEach(() => {
		Tile.resetInstanceCount()
	})

	it('increments instance count on creation and clone', () => {
		expect(Tile.getInstanceCount()).toBe(0)
		const tile = new Tile()
		expect(Tile.getInstanceCount()).toBe(1)
		const clone = tile.clone()
		expect(clone).not.toBe(tile)
		expect(Tile.getInstanceCount()).toBe(2)
	})

	it('returns space on out-of-bounds getPixel', () => {
		const tile = new Tile()
		expect(tile.getPixel(-1, 0)).toBe(' ')
		expect(tile.getPixel(0, -1)).toBe(' ')
		expect(tile.getPixel(8, 0)).toBe(' ')
		expect(tile.getPixel(0, 8)).toBe(' ')
	})

	it('sets and gets pixels within bounds', () => {
		const tile = new Tile('.')
		expect(tile.getPixel(2, 2)).toBe('.')
		tile.setPixel(2, 2, 'X')
		expect(tile.getPixel(2, 2)).toBe('X')
	})
})

