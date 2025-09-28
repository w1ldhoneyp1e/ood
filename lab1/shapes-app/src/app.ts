import {Picture} from './canvas/Picture'
import {CommandExecutor} from './commands/CommandExecutor'
import {parseCommand} from './commands/parseCommand'
import {Canvas2D} from './gfx/Canvas2D'

class ShapesApp {
	private picture = new Picture()
	private executor = new CommandExecutor(this.picture)
	private canvas: Canvas2D | null = null
	private pendingDraw: {
		type: 'shape' | 'picture',
		id?: string,
	} | null = null

	constructor(private ctx?: CanvasRenderingContext2D) {
		if (ctx) {
			this.canvas = new Canvas2D(ctx)
		}
	}

	processInput(input: string): string {
		const command = parseCommand(input)

		if (command.type === 'DrawShape') {
			this.pendingDraw = {
				type: 'shape',
				id: command.args[0],
			}
		}
		else if (command.type === 'DrawPicture') {
			this.pendingDraw = {type: 'picture'}
		}

		return this.executor.execute(command)
	}

	render(): void {
		if (!this.canvas) {
			return
		}

		this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

		if (this.pendingDraw) {
			if (this.pendingDraw.type === 'shape' && this.pendingDraw.id) {
				const shape = this.picture.getShape(this.pendingDraw.id)
				if (shape) {
					shape.draw(this.canvas)
				}
			}
			else if (this.pendingDraw.type === 'picture') {
				this.picture.draw(this.canvas)
			}
			this.pendingDraw = null
		}
	}

	getPicture(): Picture {
		return this.picture
	}
}

export {
	ShapesApp,
}

