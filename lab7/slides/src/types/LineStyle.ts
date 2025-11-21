import {type RGBA} from './RGBA'

class LineStyle {
	constructor(
		public enabled: boolean,
		public color: RGBA | undefined,
		public lineWidth: number,
	) {
		if (lineWidth < 0) {
			throw new Error('Line width must be non-negative')
		}
	}

	equals(other: LineStyle): boolean {
		if (this.enabled !== other.enabled) {
			return false
		}

		if (this.lineWidth !== other.lineWidth) {
			return false
		}

		if (this.color === undefined && other.color === undefined) {
			return true
		}

		if (this.color === undefined || other.color === undefined) {
			return false
		}

		return this.color.equals(other.color)
	}
}

export {
	LineStyle,
}

