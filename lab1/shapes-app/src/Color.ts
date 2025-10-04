class Color {
	private readonly hex: string

	constructor(color: string) {
		this.hex = this.validateAndNormalize(color)
	}

	private validateAndNormalize(color: string): string {
		const normalized = color.trim().toLowerCase()

		const hexPattern = /^#[0-9a-f]{6}$/
		if (!hexPattern.test(normalized)) {
			throw new Error(`Invalid color format: ${color}. Expected format: #RRGGBB`)
		}

		return normalized
	}

	toString(): string {
		return this.hex
	}
}

export {
	Color,
}
