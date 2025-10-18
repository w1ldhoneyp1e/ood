/* eslint-disable max-params */
import {Color} from '../Color'
import {Circle} from './Circle'
import {Ellipse} from './Ellipse'
import {type IShapeFactory} from './IShapeFactory'
import {Line} from './Line'
import {Rectangle} from './Rectangle'
import {RegularPolygon} from './RegularPolygon'
import {type Shape} from './Shape'
import {Text} from './Text'
import {Triangle} from './Triangle'

class ShapeFactory implements IShapeFactory {
	createRectangle(colorStr: string, left: number, top: number, right: number, bottom: number): Rectangle {
		const color = new Color(colorStr)
		return new Rectangle({
			color,
			left,
			top,
			right,
			bottom,
		})
	}

	createTriangle(colorStr: string, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): Triangle {
		const color = new Color(colorStr)
		return new Triangle({
			color,
			x1,
			y1,
			x2,
			y2,
			x3,
			y3,
		})
	}

	createEllipse(colorStr: string, cx: number, cy: number, rx: number, ry: number): Ellipse {
		const color = new Color(colorStr)
		return new Ellipse({
			color,
			cx,
			cy,
			rx,
			ry,
		})
	}

	createPolygon(colorStr: string, cx: number, cy: number, radius: number, vertexCount: number): RegularPolygon {
		const color = new Color(colorStr)
		return new RegularPolygon({
			color,
			cx,
			cy,
			radius,
			vertexCount,
		})
	}

	createCircle(colorStr: string, cx: number, cy: number, radius: number): Circle {
		const color = new Color(colorStr)
		return new Circle({
			color,
			cx,
			cy,
			radius,
		})
	}

	createLine(colorStr: string, x1: number, y1: number, x2: number, y2: number): Line {
		const color = new Color(colorStr)
		return new Line({
			color,
			x1,
			y1,
			x2,
			y2,
		})
	}

	createText(colorStr: string, left: number, top: number, fontSize: number, text: string): Text {
		const color = new Color(colorStr)
		return new Text({
			color,
			left,
			top,
			fontSize,
			text,
		})
	}
}

export {
	ShapeFactory,
}
