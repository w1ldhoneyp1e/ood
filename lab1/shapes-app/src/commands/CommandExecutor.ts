import {type Picture} from '../canvas/Picture'
import {createShape} from '../shapes/ShapeFactory'
import {type CommandType} from './parseCommand'

class CommandExecutor {
	constructor(private picture: Picture) {}

	execute(command: CommandType): string {
		try {
			switch (command.type) {
				case 'AddShape':
					return this.addShape(command.args)

				case 'MoveShape':
					return this.moveShape(command.args)

				case 'MovePicture':
					return this.movePicture(command.args)

				case 'DeleteShape':
					return this.deleteShape(command.args)

				case 'List':
					return this.listShapes()

				case 'ChangeColor':
					return this.changeColor(command.args)

				case 'ChangeShape':
					return this.changeShape(command.args)

				case 'DrawShape':
					return this.drawShape(command.args)

				case 'DrawPicture':
					return this.drawPicture()

				default:
					return `Unknown command: ${command}`
			}
		}
		catch (error) {
			return `Error: ${error}`
		}
	}

	private addShape(args: string[]): string {
		if (args.length < 4) {
			throw new Error('AddShape requires at least 4 arguments')
		}

		const id = args[0]
		const color = args[1]
		const type = args[2]
		const params = args.slice(3).map(param =>
			isNaN(Number(param))
				? param
				: Number(param),
		)

		const shape = createShape({
			type,
			id,
			color,
			params,
		})
		this.picture.addShape(shape)
		return `Shape '${id}' added`
	}

	private moveShape(args: string[]): string {
		if (args.length !== 3) {
			throw new Error('MoveShape requires 3 arguments')
		}

		const id = args[0]
		const dx = Number(args[1])
		const dy = Number(args[2])

		const shape = this.picture.getShape(id)
		if (!shape) {
			throw new Error(`Shape '${id}' not found`)
		}

		shape.move(dx, dy)
		return `Shape '${id}' moved by (${dx}, ${dy})`
	}

	private movePicture(args: string[]): string {
		if (args.length !== 2) {
			throw new Error('MovePicture requires 2 arguments')
		}

		const dx = Number(args[0])
		const dy = Number(args[1])

		this.picture.movePicture(dx, dy)
		return `Picture moved by (${dx}, ${dy})`
	}

	private deleteShape(args: string[]): string {
		if (args.length !== 1) {
			throw new Error('DeleteShape requires 1 argument')
		}

		const id = args[0]
		this.picture.deleteShape(id)
		return `Shape '${id}' deleted`
	}

	private listShapes(): string {
		const shapes = this.picture.listShapes()
		return shapes.length > 0
			? shapes.join('\n')
			: 'No shapes'
	}

	private changeColor(args: string[]): string {
		if (args.length !== 2) {
			throw new Error('ChangeColor requires 2 arguments')
		}

		const id = args[0]
		const color = args[1]

		this.picture.changeColor(id, color)
		return `Color of shape '${id}' changed to ${color}`
	}

	private changeShape(args: string[]): string {
		if (args.length < 2) {
			throw new Error('ChangeShape requires at least 2 arguments')
		}

		const id = args[0]
		const type = args[1]
		const params = args.slice(2).map(param =>
			isNaN(Number(param))
				? param
				: Number(param),
		)

		this.picture.changeShape(id, type, params)
		return `Shape '${id}' changed to ${type}`
	}

	private drawShape(args: string[]): string {
		if (args.length !== 1) {
			throw new Error('DrawShape requires 1 argument')
		}

		const id = args[0]
		const shape = this.picture.getShape(id)
		if (!shape) {
			throw new Error(`Shape '${id}' not found`)
		}

		return `Drawing shape '${id}'`
	}

	private drawPicture(): string {
		return 'Drawing all shapes'
	}
}

export {
	CommandExecutor,
}
