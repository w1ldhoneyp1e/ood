const TILE_SIZE = 8

class Tile {
	private static instanceCount = 0
	private pixels: string[][]

	constructor(fillChar: string = ' ') {
		this.pixels = Array(TILE_SIZE)
			.fill(null)
			.map(() => Array(TILE_SIZE).fill(fillChar))
		Tile.instanceCount++
	}

	setPixel(x: number, y: number, color: string): void {
		if (x >= 0 && x < TILE_SIZE && y >= 0 && y < TILE_SIZE) {
			this.pixels[y][x] = color
		}
	}

	getPixel(x: number, y: number): string {
		if (x >= 0 && x < TILE_SIZE && y >= 0 && y < TILE_SIZE) {
			return this.pixels[y][x]
		}

		return ' '
	}

	static getInstanceCount(): number {
		return Tile.instanceCount
	}

	static resetInstanceCount(): void {
		Tile.instanceCount = 0
	}

	getSize(): number {
		return TILE_SIZE
	}

	clone(): Tile {
		const newTile = new Tile()
		for (let y = 0; y < TILE_SIZE; y++) {
			for (let x = 0; x < TILE_SIZE; x++) {
				newTile.pixels[y][x] = this.pixels[y][x]
			}
		}

		return newTile
	}

	getPixels(): string[][] {
		return this.pixels
	}
}

export {
	Tile,
	TILE_SIZE,
}

