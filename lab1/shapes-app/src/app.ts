import {Picture} from './canvas/Picture'
import {CommandExecutor} from './commands/CommandExecutor'
import {parseCommand} from './commands/parseCommand'
import {Canvas2D} from './gfx/Canvas2D'

class ShapesApp {
	private picture = new Picture()
	private executor: CommandExecutor
	private canvas: Canvas2D | null = null

	constructor(private ctx?: CanvasRenderingContext2D) {
		if (ctx) {
			this.canvas = new Canvas2D(ctx)
			this.executor = new CommandExecutor(this.picture, this.canvas)
		}
		else {
			this.executor = new CommandExecutor(this.picture)
		}
	}

	processInput(input: string): string {
		const command = parseCommand(input)
		return this.executor.execute(command)
	}

	getPicture(): Picture {
		return this.picture
	}
}

export {
	ShapesApp,
}
