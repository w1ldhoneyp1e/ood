class RGBA {
	constructor(
		public r: number,
		public g: number,
		public b: number,
		public a: number,
	) {
		if (!inRangeOf(r, 0, 255) || !inRangeOf(g, 0, 255) || !inRangeOf(b, 0, 255)) {
			throw new Error('RGB values must be in range [0, 255]')
		}
		if (!inRangeOf(a, 0, 1)) {
			throw new Error('Alpha value must be in range [0, 1]')
		}
	}

	equals(other: RGBA): boolean {
		return this.r === other.r
            && this.g === other.g
            && this.b === other.b
            && this.a === other.a
	}

	toString(): string {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
	}
}

function inRangeOf(value: number, min: number, max: number): boolean {
	return value >= min && value <= max
}

export {
	RGBA,
}

