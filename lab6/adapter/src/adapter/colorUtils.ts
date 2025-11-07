import {RGBAColor} from '../modernGraphicsLib/RGBAColor'

function hexToRGBA(hex: number): RGBAColor {
	const r = ((hex >> 16) & 0xFF) / 255.0
	const g = ((hex >> 8) & 0xFF) / 255.0
	const b = (hex & 0xFF) / 255.0
	return new RGBAColor(r, g, b, 1.0)
}

export {
	hexToRGBA,
}
