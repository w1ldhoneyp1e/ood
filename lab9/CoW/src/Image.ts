import {CoW} from './CoW'
import {Tile, TILE_SIZE} from './Tile'
import {type Point, type Size} from './types'


class Image {
	private tiles: CoW<Tile>[][]
	private size: Size

	constructor(width: number, height: number, fillChar: string = ' ') {
		if (width <= 0 || height <= 0) {
			throw new Error('Размеры изображения должны быть положительными')
		}

		this.size = {
			width,
			height,
		}
		const tilesX = Math.ceil(width / TILE_SIZE)
		const tilesY = Math.ceil(height / TILE_SIZE)

		const initialTile = new Tile(fillChar)
		const sharedTile = new CoW(initialTile)

		this.tiles = Array(tilesY)
			.fill(null)
			.map(() => Array(tilesX)
				.fill(null)
				.map(() => sharedTile.clone()))
	}

	getPixel(x: number, y: number): string {
		if (x < 0 || x >= this.size.width || y < 0 || y >= this.size.height) {
			return ' '
		}

		const tileX = Math.floor(x / TILE_SIZE)
		const tileY = Math.floor(y / TILE_SIZE)
		const localX = x % TILE_SIZE
		const localY = y % TILE_SIZE

		const tile = this.tiles[tileY][tileX].get()

		return tile.getPixel(localX, localY)
	}

	setPixel(x: number, y: number, color: string): void {
		if (x < 0 || x >= this.size.width || y < 0 || y >= this.size.height) {
			return
		}

		const tileX = Math.floor(x / TILE_SIZE)
		const tileY = Math.floor(y / TILE_SIZE)
		const localX = x % TILE_SIZE
		const localY = y % TILE_SIZE

		const cowTile = this.tiles[tileY][tileX]
		const tile = cowTile.unshare()
		tile.setPixel(localX, localY, color)
	}

	getSize(): Size {
		return {...this.size}
	}
}

export {
	Image,
}

