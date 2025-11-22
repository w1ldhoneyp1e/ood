import {type ICanvas} from '../canvas/ICanvas'
import {type FillStyle} from '../types/FillStyle'
import {type Frame} from '../types/Frame'
import {type LineStyle} from '../types/LineStyle'

interface IShape {
	getFrame: () => Frame,
	setFrame: (frame: Frame) => void,
	getFillStyle: () => FillStyle,
	setFillStyle: (style: FillStyle) => void,
	getLineStyle: () => LineStyle,
	setLineStyle: (style: LineStyle) => void,
	draw: (canvas: ICanvas) => void,
	clone: () => IShape,
}

export {
	IShape,
}

