import {Color} from '../Color'
import {Circle} from './Circle'
import {Line} from './Line'
import {Rectangle} from './Rectangle'
import {type Shape} from './Shape'
import {Text} from './Text'
import {Triangle} from './Triangle'

interface CreateShapeArgs {
	type: string,
	id: string,
	color: string,
	params: (number | string)[],
}

function createShape({
	type,
	id,
	color,
	params,
}: CreateShapeArgs): Shape {
	const colorObj = new Color(color)

	switch (type) {
		case 'circle':
			return new Circle({
				id,
				color: colorObj,
				x: params[0] as number,
				y: params[1] as number,
				radius: params[2] as number,
			})

		case 'rectangle':
			return new Rectangle({
				id,
				color: colorObj,
				left: params[0] as number,
				top: params[1] as number,
				width: params[2] as number,
				height: params[3] as number,
			})

		case 'triangle':
			return new Triangle({
				id,
				color: colorObj,
				x1: params[0] as number,
				y1: params[1] as number,
				x2: params[2] as number,
				y2: params[3] as number,
				x3: params[4] as number,
				y3: params[5] as number,
			})

		case 'line':
			return new Line({
				id,
				color: colorObj,
				x1: params[0] as number,
				y1: params[1] as number,
				x2: params[2] as number,
				y2: params[3] as number,
			})

		case 'text':
			return new Text({
				id,
				color: colorObj,
				left: params[0] as number,
				top: params[1] as number,
				fontSize: params[2] as number,
				text: params[3] as string,
			})

		default:
			throw new Error(`Unknown shape type: ${type}`)
	}
}

export {
	createShape,
}
