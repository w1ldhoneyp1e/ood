interface ParsedCommand {
	type: string,
	color: string,
	args: number[],
	text?: string,
}

const ANY_SPACES_REGEXP = /\s+/

class CommandParser {
	parse(description: string): ParsedCommand {
		const parts = description.trim().split(ANY_SPACES_REGEXP)

		if (parts.length < 2) {
			throw new Error('Invalid command description: too few parameters')
		}

		const type = parts[0].toLowerCase()
		const color = parts[1]

		switch (type) {
			case 'rectangle': {
				if (parts.length !== 6) {
					throw new Error('Rectangle requires 4 coordinates: left top right bottom')
				}
				const [, , left, top, right, bottom] = parts
				return {
					type,
					color,
					args: [Number(left), Number(top), Number(right), Number(bottom)],
				}
			}

			case 'triangle': {
				if (parts.length !== 8) {
					throw new Error('Triangle requires 3 vertices: x1 y1 x2 y2 x3 y3')
				}
				const [, , x1, y1, x2, y2, x3, y3] = parts
				return {
					type,
					color,
					args: [Number(x1), Number(y1), Number(x2), Number(y2), Number(x3), Number(y3)],
				}
			}

			case 'ellipse': {
				if (parts.length !== 6) {
					throw new Error('Ellipse requires center and radii: cx cy rx ry')
				}
				const [, , cx, cy, rx, ry] = parts
				return {
					type,
					color,
					args: [Number(cx), Number(cy), Number(rx), Number(ry)],
				}
			}

			case 'polygon': {
				if (parts.length !== 6) {
					throw new Error('Polygon requires center, radius and vertex count: cx cy radius vertexCount')
				}
				const [, , cx, cy, radius, vertexCount] = parts
				return {
					type,
					color,
					args: [Number(cx), Number(cy), Number(radius), Math.floor(Number(vertexCount))],
				}
			}

			case 'circle': {
				if (parts.length !== 5) {
					throw new Error('Circle requires center and radius: cx cy radius')
				}
				const [, , cx, cy, radius] = parts
				return {
					type,
					color,
					args: [Number(cx), Number(cy), Number(radius)],
				}
			}

			case 'line': {
				if (parts.length !== 6) {
					throw new Error('Line requires start and end points: x1 y1 x2 y2')
				}
				const [, , x1, y1, x2, y2] = parts
				return {
					type,
					color,
					args: [Number(x1), Number(y1), Number(x2), Number(y2)],
				}
			}

			case 'text': {
				if (parts.length < 6) {
					throw new Error('Text requires position, font size and text: left top fontSize text')
				}
				const [, , left, top, fontSize, ...textParts] = parts
				const text = textParts.join(' ')
				return {
					type,
					color,
					args: [Number(left), Number(top), Number(fontSize)],
					text,
				}
			}

			default:
				throw new Error(`Unknown shape type: ${type}`)
		}
	}
}

export {
	CommandParser,
	type ParsedCommand,
}
