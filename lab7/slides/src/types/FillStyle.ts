import {type RGBA} from './RGBA'

class FillStyle {
	constructor(
		public enabled: boolean,
		public color: RGBA | undefined,
	) {}

	equals(other: FillStyle): boolean {
		if (this.enabled !== other.enabled) {
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
	FillStyle,
}
