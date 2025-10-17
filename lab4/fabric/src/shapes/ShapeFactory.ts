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
	createShape(description: string): Shape {
		const parts = description.trim().split(/\s+/)

		if (parts.length < 2) {
			throw new Error('Invalid shape description: too few parameters')
		}

		const shapeType = parts[0].toLowerCase()
		const colorStr = parts[1]

		try {
			const color = new Color(colorStr)

			switch (shapeType) {
				case 'rectangle': {
					if (parts.length !== 6) {
						throw new Error('Rectangle requires 4 coordinates: left top right bottom')
					}
					const [, , left, top, right, bottom] = parts.map((p, i) => i < 2
						? p
						: parseFloat(p))
					return new Rectangle({
						color,
						left: left as number,
						top: top as number,
						right: right as number,
						bottom: bottom as number,
					})
				}

				case 'triangle': {
					if (parts.length !== 8) {
						throw new Error('Triangle requires 3 vertices: x1 y1 x2 y2 x3 y3')
					}
					const [, , x1, y1, x2, y2, x3, y3] = parts.map((p, i) => i < 2
						? p
						: parseFloat(p))
					return new Triangle({
						color,
						x1: x1 as number,
						y1: y1 as number,
						x2: x2 as number,
						y2: y2 as number,
						x3: x3 as number,
						y3: y3 as number,
					})
				}

				case 'ellipse': {
					if (parts.length !== 6) {
						throw new Error('Ellipse requires center and radii: cx cy rx ry')
					}
					const [, , cx, cy, rx, ry] = parts.map((p, i) => i < 2
						? p
						: parseFloat(p))
					return new Ellipse({
						color,
						cx: cx as number,
						cy: cy as number,
						rx: rx as number,
						ry: ry as number,
					})
				}

				case 'polygon': {
					if (parts.length !== 6) {
						throw new Error('Polygon requires center, radius and vertex count: cx cy radius vertexCount')
					}
					const [, , cx, cy, radius, vertexCount] = parts.map((p, i) => i < 2
						? p
						: parseFloat(p))
					return new RegularPolygon({
						color,
						cx: cx as number,
						cy: cy as number,
						radius: radius as number,
						vertexCount: Math.floor(vertexCount as number),
					})
				}

				case 'circle': {
					if (parts.length !== 5) {
						throw new Error('Circle requires center and radius: cx cy radius')
					}
					const [, , cx, cy, radius] = parts.map((p, i) => i < 2
						? p
						: parseFloat(p))
					return new Circle({
						color,
						cx: cx as number,
						cy: cy as number,
						radius: radius as number,
					})
				}

				case 'line': {
					if (parts.length !== 6) {
						throw new Error('Line requires start and end points: x1 y1 x2 y2')
					}
					const [, , x1, y1, x2, y2] = parts.map((p, i) => i < 2
						? p
						: parseFloat(p))
					return new Line({
						color,
						x1: x1 as number,
						y1: y1 as number,
						x2: x2 as number,
						y2: y2 as number,
					})
				}

				case 'text': {
					if (parts.length < 6) {
						throw new Error('Text requires position, font size and text: left top fontSize text')
					}
					const [, , left, top, fontSize, ...textParts] = parts
					const text = textParts.join(' ')
					return new Text({
						color,
						left: parseFloat(left),
						top: parseFloat(top),
						fontSize: parseFloat(fontSize),
						text,
					})
				}

				default:
					throw new Error(`Unknown shape type: ${shapeType}`)
			}
		}
		catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to create shape from description "${description}": ${error.message}`)
			}
			throw error
		}
	}
}

export {
	ShapeFactory,
}

