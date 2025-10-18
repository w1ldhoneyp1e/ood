import {type Circle} from './Circle'
import {type Ellipse} from './Ellipse'
import {type Line} from './Line'
import {type Rectangle} from './Rectangle'
import {type RegularPolygon} from './RegularPolygon'
import {type Shape} from './Shape'
import {type Text} from './Text'
import {type Triangle} from './Triangle'

interface IShapeFactory {
	createRectangle: (colorStr: string, left: number, top: number, right: number, bottom: number) => Rectangle,
	createTriangle: (colorStr: string, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => Triangle,
	createEllipse: (colorStr: string, cx: number, cy: number, rx: number, ry: number) => Ellipse,
	createPolygon: (colorStr: string, cx: number, cy: number, radius: number, vertexCount: number) => RegularPolygon,
	createCircle: (colorStr: string, cx: number, cy: number, radius: number) => Circle,
	createLine: (colorStr: string, x1: number, y1: number, x2: number, y2: number) => Line,
	createText: (colorStr: string, left: number, top: number, fontSize: number, text: string) => Text,
}

export {
	IShapeFactory,
}

