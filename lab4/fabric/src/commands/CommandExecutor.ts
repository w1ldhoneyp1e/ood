import {type IShapeFactory} from '../shapes/IShapeFactory'
import {type Shape} from '../shapes/Shape'

class CommandExecutor {
	constructor(private factory: IShapeFactory) {}

	execute(description: string): Shape {
		const parts = description.trim().split(/\s+/)

		if (parts.length < 2) {
			throw new Error('Invalid command description: too few parameters')
		}

		const type = parts[0].toLowerCase()
		const colorStr = parts[1]

		switch (type) {
			case 'rectangle': {
				if (parts.length !== 6) {
					throw new Error('Rectangle requires 4 coordinates: left top right bottom')
				}
				const [, , left, top, right, bottom] = parts
				return this.factory.createRectangle(
					colorStr,
					parseFloat(left),
					parseFloat(top),
					parseFloat(right),
					parseFloat(bottom),
				)
			}

			case 'triangle': {
				if (parts.length !== 8) {
					throw new Error('Triangle requires 3 vertices: x1 y1 x2 y2 x3 y3')
				}
				const [, , x1, y1, x2, y2, x3, y3] = parts
				return this.factory.createTriangle(
					colorStr,
					parseFloat(x1),
					parseFloat(y1),
					parseFloat(x2),
					parseFloat(y2),
					parseFloat(x3),
					parseFloat(y3),
				)
			}

			case 'ellipse': {
				if (parts.length !== 6) {
					throw new Error('Ellipse requires center and radii: cx cy rx ry')
				}
				const [, , cx, cy, rx, ry] = parts
				return this.factory.createEllipse(
					colorStr,
					parseFloat(cx),
					parseFloat(cy),
					parseFloat(rx),
					parseFloat(ry),
				)
			}

			case 'polygon': {
				if (parts.length !== 6) {
					throw new Error('Polygon requires center, radius and vertex count: cx cy radius vertexCount')
				}
				const [, , cx, cy, radius, vertexCount] = parts
				return this.factory.createPolygon(
					colorStr,
					parseFloat(cx),
					parseFloat(cy),
					parseFloat(radius),
					Math.floor(parseFloat(vertexCount)),
				)
			}

			case 'circle': {
				if (parts.length !== 5) {
					throw new Error('Circle requires center and radius: cx cy radius')
				}
				const [, , cx, cy, radius] = parts
				return this.factory.createCircle(colorStr, parseFloat(cx), parseFloat(cy), parseFloat(radius))
			}

			case 'line': {
				if (parts.length !== 6) {
					throw new Error('Line requires start and end points: x1 y1 x2 y2')
				}
				const [, , x1, y1, x2, y2] = parts
				return this.factory.createLine(colorStr, parseFloat(x1), parseFloat(y1), parseFloat(x2), parseFloat(y2))
			}

			case 'text': {
				if (parts.length < 6) {
					throw new Error('Text requires position, font size and text: left top fontSize text')
				}
				const [, , left, top, fontSize, ...textParts] = parts
				const text = textParts.join(' ')
				return this.factory.createText(colorStr, parseFloat(left), parseFloat(top), parseFloat(fontSize), text)
			}

			default:
				throw new Error(`Unknown shape type: ${type}`)
		}
	}
}

export {
	CommandExecutor,
}
